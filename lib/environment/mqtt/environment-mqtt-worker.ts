import mqtt from "mqtt";
import { loadEnvConfig } from "@next/env";
import { createAdminClient } from "@/lib/supabase/admin";

/* ==========================================================
   OUTFLO — ENVIRONMENT MQTT WORKER
   File: scripts/environment-mqtt-worker.ts
   Scope: Consume OwnTracks MQTT location events into Environment DB
   ========================================================== */

loadEnvConfig(process.cwd());

const PROVIDER = "owntracks";
const MQTT_URL = process.env.OUTFLO_MQTT_URL ?? "mqtt://localhost:1883";
const MQTT_TOPIC = process.env.OUTFLO_MQTT_TOPIC ?? "owntracks/+/+";

type OwnTracksPayload = {
    _type?: string;
    tst?: number;
    created_at?: number;
    lat?: number;
    lon?: number;
    acc?: number;
    vac?: number;
    alt?: number;
    p?: number;
    batt?: number;
    bs?: number;
    conn?: string;
    t?: string;
    tid?: string;
    topic?: string;
    [key: string]: unknown;
};

function resolveEventMs(payload: OwnTracksPayload) {
    const unixSeconds = payload.created_at ?? payload.tst;

    if (typeof unixSeconds !== "number") {
        return null;
    }

    return Math.round(unixSeconds * 1000);
}

function parseOwnTracksTopic(topic: string) {
    const parts = topic.split("/");

    if (parts.length !== 3) {
        return null;
    }

    const [root, providerUserId, deviceId] = parts;

    if (root !== "owntracks") {
        return null;
    }

    if (!providerUserId || !deviceId) {
        return null;
    }

    return {
        providerUserId,
        deviceId,
    };
}

function isNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

async function handleMessage(topic: string, message: Buffer) {
    const topicParts = parseOwnTracksTopic(topic);

    if (!topicParts) {
        console.log("[environment-mqtt] ignored topic", topic);
        return;
    }

    let payload: OwnTracksPayload;

    try {
        payload = JSON.parse(message.toString("utf8")) as OwnTracksPayload;
    } catch (error) {
        console.error("[environment-mqtt] invalid json", topic, error);
        return;
    }

    if (payload._type !== "location") {
        console.log("[environment-mqtt] ignored payload type", payload._type);
        return;
    }

    const eventMs = resolveEventMs(payload);
    const receivedMs = Date.now();

    const supabase = createAdminClient();

    const { data: emitter, error: emitterError } = await supabase
        .from("environment_emitters")
        .select("id,user_id,provider,device_id,is_active")
        .eq("provider", PROVIDER)
        .eq("device_id", topicParts.deviceId)
        .eq("is_active", true)
        .maybeSingle();

    if (emitterError) {
        console.error("[environment-mqtt] emitter lookup failed", emitterError);
        return;
    }

    if (!emitter) {
        console.warn("[environment-mqtt] no active emitter", {
            provider: PROVIDER,
            device_id: topicParts.deviceId,
            provider_user_id: topicParts.providerUserId,
        });
        return;
    }

    const eventInsert = {
        user_id: emitter.user_id,
        provider: PROVIDER,
        device_id: topicParts.deviceId,
        event_type: payload._type,
        raw: {
            ...payload,
            topic,
            provider_user_id: topicParts.providerUserId,
        },
        event_ms: eventMs,
        received_ms: receivedMs,
        lat: isNumber(payload.lat) ? payload.lat : null,
        lon: isNumber(payload.lon) ? payload.lon : null,
        accuracy_m: isNumber(payload.acc) ? payload.acc : null,
        altitude_m: isNumber(payload.alt) ? payload.alt : null,
        vertical_accuracy_m: isNumber(payload.vac) ? payload.vac : null,
        pressure_kpa: isNumber(payload.p) ? payload.p : null,
        battery_pct: isNumber(payload.batt) ? payload.batt : null,
        battery_status: isNumber(payload.bs) ? payload.bs : null,
        connection: typeof payload.conn === "string" ? payload.conn : null,
        trigger: typeof payload.t === "string" ? payload.t : null,
        tracker_id: typeof payload.tid === "string" ? payload.tid : null,
    };

    const { data: insertedEvent, error: eventError } = await supabase
        .from("environment_emitter_events")
        .insert(eventInsert)
        .select("id")
        .single();

    if (eventError) {
        console.error("[environment-mqtt] event insert failed", eventError);
        return;
    }

    if (!eventMs || !isNumber(payload.lat) || !isNumber(payload.lon)) {
        console.log("[environment-mqtt] event stored without snapshot", insertedEvent.id);
        return;
    }

    const snapshotUpsert = {
        user_id: emitter.user_id,
        moment_ms: eventMs,
        location_precision: "device",
        lat: payload.lat,
        lng: payload.lon,
        pressure_hpa: isNumber(payload.p) ? payload.p * 10 : null,
        elevation_m: isNumber(payload.alt) ? payload.alt : null,
        source_payload_ref: insertedEvent.id,
        observation_type: "owntracks_location",
        capture_mode: typeof payload.t === "string" ? payload.t : "mqtt",
        source_mode: "owntracks_mqtt",
    };

    const { error: snapshotError } = await supabase
        .from("environment_snapshots")
        .upsert(snapshotUpsert, {
            onConflict: "user_id",
        });

    if (snapshotError) {
        console.error("[environment-mqtt] snapshot upsert failed", snapshotError);
        return;
    }

    console.log("[environment-mqtt] stored location", {
        topic,
        event_id: insertedEvent.id,
        event_ms: eventMs,
        device_id: topicParts.deviceId,
    });
}

function main() {
    console.log("[environment-mqtt] connecting", {
        url: MQTT_URL,
        topic: MQTT_TOPIC,
    });

    const client = mqtt.connect(MQTT_URL);

    client.on("connect", () => {
        console.log("[environment-mqtt] connected");

        client.subscribe(MQTT_TOPIC, { qos: 1 }, (error) => {
            if (error) {
                console.error("[environment-mqtt] subscribe failed", error);
                return;
            }

            console.log("[environment-mqtt] subscribed", MQTT_TOPIC);
        });
    });

    client.on("message", (topic, message) => {
        void handleMessage(topic, message);
    });

    client.on("error", (error) => {
        console.error("[environment-mqtt] client error", error);
    });

    client.on("close", () => {
        console.warn("[environment-mqtt] connection closed");
    });
}

main();