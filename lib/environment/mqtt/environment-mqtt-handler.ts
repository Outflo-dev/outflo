/* ==========================================================
   OUTFLO — ENVIRONMENT MQTT HANDLER
   File: lib/environment/mqtt/environment-mqtt-handler.ts
   Scope: Handle OwnTracks MQTT messages into Environment DB writes
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import { createAdminClient } from "@/lib/supabase/admin";

import {
    buildRawPayload,
    isNumber,
    resolveEventMs,
    type OwnTracksPayload,
} from "./owntracks-payload";
import {
    buildOwnTracksMqttEmitterEventInsert,
    buildOwnTracksMqttSnapshotUpsert,
} from "./owntracks-rows";
import { parseOwnTracksTopic } from "./owntracks-topic";

const PROVIDER = "owntracks";

export async function handleEnvironmentMqttMessage(
    topic: string,
    message: Buffer,
) {
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
    const rawPayload = buildRawPayload({
        payload,
        topic,
        providerUserId: topicParts.providerUserId,
    });

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

    const { data: insertedEvent, error: eventError } = await supabase
        .from("environment_emitter_events")
        .insert(
            buildOwnTracksMqttEmitterEventInsert({
                userId: emitter.user_id,
                provider: PROVIDER,
                deviceId: topicParts.deviceId,
                payload,
                rawPayload,
                eventMs,
                receivedMs,
            }),
        )
        .select("id")
        .single();

    if (eventError) {
        console.error("[environment-mqtt] event insert failed", eventError);
        return;
    }

    if (!eventMs || !isNumber(payload.lat) || !isNumber(payload.lon)) {
        console.log("[environment-mqtt] event stored without snapshot", {
            event_id: insertedEvent.id,
            event_ms: eventMs,
            has_lat: isNumber(payload.lat),
            has_lon: isNumber(payload.lon),
        });
        return;
    }

    const snapshotUpsert = buildOwnTracksMqttSnapshotUpsert({
        userId: emitter.user_id,
        payload,
        rawPayload,
        eventMs,
        eventId: insertedEvent.id,
        deviceId: topicParts.deviceId,
    });

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
        trigger: snapshotUpsert.emitter_trigger,
        battery_pct: snapshotUpsert.emitter_battery_pct,
        connection: snapshotUpsert.emitter_connection,
        accuracy_m: snapshotUpsert.accuracy_m,
        motion: snapshotUpsert.emitter_motion,
    });
}