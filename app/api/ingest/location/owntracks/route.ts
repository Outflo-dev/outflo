/* ==========================================================
   OUTFLO — OWNTRACKS HTTP INGEST WEBHOOK
   File: app/api/ingest/location/owntracks/route.ts
   Scope: Legacy/fallback HTTP receiver for OwnTracks emitter payloads
   Status: Retained as fallback after MQTT ingest worker became primary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/* ------------------------------
   Types
-------------------------------- */
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
    [key: string]: any;
};

/* ------------------------------
   Constants
-------------------------------- */
export const runtime = "nodejs";

const PROVIDER = "owntracks";
const VERSION = "owntracks-ingest-v5-snapshot";

/* ------------------------------
   Helpers
-------------------------------- */
function safeJsonParse<T>(
    raw: string
): { ok: true; value: T } | { ok: false; error: string } {
    try {
        return { ok: true, value: JSON.parse(raw) as T };
    } catch (error: any) {
        return { ok: false, error: error?.message || "invalid json" };
    }
}

function resolveEventMs(payload: OwnTracksPayload): number | null {
    const unix = payload.created_at ?? payload.tst;
    if (!unix || !Number.isFinite(unix)) return null;
    return Math.round(unix * 1000);
}

function finiteNumber(value: unknown): number | null {
    if (typeof value !== "number") return null;
    if (!Number.isFinite(value)) return null;
    return value;
}

function finiteInteger(value: unknown): number | null {
    const num = finiteNumber(value);
    if (num === null) return null;
    return Math.round(num);
}

function pressureKpaToHpa(value: unknown): number | null {
    const kpa = finiteNumber(value);
    if (kpa === null) return null;
    return kpa * 10;
}

function captureModeFromTrigger(trigger: string | undefined): string {
    if (trigger === "u") return "manual";
    return trigger || "unknown";
}

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(req: Request) {
    const receivedMs = Date.now();
    const rawText = await req.text();

    const parsed = safeJsonParse<OwnTracksPayload>(rawText);

    if (!parsed.ok) {
        return NextResponse.json(
            { ok: false, where: "payload", message: parsed.error, version: VERSION },
            { status: 400 }
        );
    }

    const payload = parsed.value;
    const headers = Object.fromEntries(req.headers.entries());
    const deviceId = headers["x-limit-d"] ?? null;

    if (!deviceId) {
        return NextResponse.json(
            { ok: false, where: "headers", message: "Missing emitter device id", version: VERSION },
            { status: 400 }
        );
    }

    const supabase = createAdminClient();

    const { data: emitter, error: emitterErr } = await supabase
        .from("environment_emitters")
        .select("user_id")
        .eq("provider", PROVIDER)
        .eq("device_id", deviceId)
        .eq("is_active", true)
        .maybeSingle();

    if (emitterErr) {
        return NextResponse.json(
            { ok: false, where: "db", step: "lookup_emitter", message: emitterErr.message, version: VERSION },
            { status: 500 }
        );
    }

    if (!emitter?.user_id) {
        return NextResponse.json(
            { ok: false, where: "ownership", message: "Emitter not registered", device_id: deviceId, version: VERSION },
            { status: 403 }
        );
    }

    const eventMs = resolveEventMs(payload);

    const { data: eventRow, error: eventErr } = await supabase
        .from("environment_emitter_events")
        .insert({
            user_id: emitter.user_id,
            provider: PROVIDER,
            device_id: deviceId,
            event_type: payload._type ?? "unknown",
            event_ms: eventMs,
            received_ms: receivedMs,
            lat: finiteNumber(payload.lat),
            lon: finiteNumber(payload.lon),
            accuracy_m: finiteNumber(payload.acc),
            altitude_m: finiteNumber(payload.alt),
            vertical_accuracy_m: finiteNumber(payload.vac),
            pressure_kpa: finiteNumber(payload.p),
            battery_pct: finiteInteger(payload.batt),
            battery_status: finiteInteger(payload.bs),
            connection: typeof payload.conn === "string" ? payload.conn : null,
            trigger: typeof payload.t === "string" ? payload.t : null,
            tracker_id: typeof payload.tid === "string" ? payload.tid : null,
            raw: payload,
        })
        .select("id")
        .single();

    if (eventErr) {
        return NextResponse.json(
            { ok: false, where: "db", step: "insert_event", message: eventErr.message, version: VERSION },
            { status: 500 }
        );
    }

    if (payload._type === "location" && eventMs) {
        const { error: snapshotErr } = await supabase
            .from("environment_snapshots")
            .upsert(
                {
                    user_id: emitter.user_id,
                    moment_ms: eventMs,
                    location_precision: "device",
                    lat: finiteNumber(payload.lat),
                    lng: finiteNumber(payload.lon),
                    pressure_hpa: pressureKpaToHpa(payload.p),
                    elevation_m: finiteNumber(payload.alt),
                    source_payload_ref: eventRow?.id ?? null,
                    observation_type: "owntracks_location",
                    capture_mode: captureModeFromTrigger(payload.t),
                    source_mode: PROVIDER,
                },
                { onConflict: "user_id" }
            );

        if (snapshotErr) {
            return NextResponse.json(
                {
                    ok: false,
                    where: "db",
                    step: "upsert_snapshot",
                    message: snapshotErr.message,
                    event_id: eventRow?.id ?? null,
                    version: VERSION,
                },
                { status: 500 }
            );
        }
    }

    return NextResponse.json(
        {
            ok: true,
            owned: true,
            stored: true,
            normalized: true,
            snapshot: payload._type === "location",
            event_id: eventRow?.id ?? null,
            version: VERSION,
        },
        { status: 200 }
    );
}