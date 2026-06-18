/* ==========================================================
   OUTFLO — OWNTRACKS HTTP INGEST WEBHOOK
   File: app/api/ingest/location/owntracks/route.ts
   Scope: Legacy/fallback HTTP receiver for OwnTracks emitter payloads
   Status: Retained as fallback after MQTT ingest worker became primary
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

import { resolveEventMs } from "./internal/owntracks-normalize";
import {
    type OwnTracksPayload,
    safeJsonParse,
} from "./internal/owntracks-payload";
import {
    buildOwnTracksEmitterEventInsert,
    buildOwnTracksSnapshotUpsert,
} from "./internal/owntracks-rows";

/* ------------------------------
   Constants
-------------------------------- */
export const runtime = "nodejs";

const PROVIDER = "owntracks";
const VERSION = "owntracks-ingest-v5-snapshot";

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(req: Request) {
    const receivedMs = Date.now();
    const rawText = await req.text();

    const parsed = safeJsonParse<OwnTracksPayload>(rawText);

    if (!parsed.ok) {
        return NextResponse.json(
            {
                ok: false,
                where: "payload",
                message: parsed.error,
                version: VERSION,
            },
            { status: 400 },
        );
    }

    const payload = parsed.value;
    const headers = Object.fromEntries(req.headers.entries());
    const deviceId = headers["x-limit-d"] ?? null;

    if (!deviceId) {
        return NextResponse.json(
            {
                ok: false,
                where: "headers",
                message: "Missing emitter device id",
                version: VERSION,
            },
            { status: 400 },
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
            {
                ok: false,
                where: "db",
                step: "lookup_emitter",
                message: emitterErr.message,
                version: VERSION,
            },
            { status: 500 },
        );
    }

    if (!emitter?.user_id) {
        return NextResponse.json(
            {
                ok: false,
                where: "ownership",
                message: "Emitter not registered",
                device_id: deviceId,
                version: VERSION,
            },
            { status: 403 },
        );
    }

    const eventMs = resolveEventMs(payload);

    const { data: eventRow, error: eventErr } = await supabase
        .from("environment_emitter_events")
        .insert(
            buildOwnTracksEmitterEventInsert({
                userId: emitter.user_id,
                provider: PROVIDER,
                deviceId,
                payload,
                eventMs,
                receivedMs,
            }),
        )
        .select("id")
        .single();

    if (eventErr) {
        return NextResponse.json(
            {
                ok: false,
                where: "db",
                step: "insert_event",
                message: eventErr.message,
                version: VERSION,
            },
            { status: 500 },
        );
    }

    if (payload._type === "location" && eventMs) {
        const { error: snapshotErr } = await supabase
            .from("environment_snapshots")
            .upsert(
                buildOwnTracksSnapshotUpsert({
                    userId: emitter.user_id,
                    provider: PROVIDER,
                    payload,
                    eventMs,
                    eventId: eventRow?.id ?? null,
                }),
                { onConflict: "user_id" },
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
                { status: 500 },
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
        { status: 200 },
    );
}