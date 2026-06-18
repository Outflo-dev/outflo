/* ==========================================================
   OUTFLO — OWNTRACKS HTTP ROWS
   File: app/api/ingest/location/owntracks/internal/owntracks-rows.ts
   Scope: Build OwnTracks HTTP emitter event and snapshot rows
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import {
    captureModeFromTrigger,
    finiteInteger,
    finiteNumber,
    pressureKpaToHpa,
} from "./owntracks-normalize";
import type { OwnTracksPayload } from "./owntracks-payload";

export function buildOwnTracksEmitterEventInsert(args: {
    userId: string;
    provider: string;
    deviceId: string;
    payload: OwnTracksPayload;
    eventMs: number | null;
    receivedMs: number;
}) {
    const { userId, provider, deviceId, payload, eventMs, receivedMs } = args;

    return {
        user_id: userId,
        provider,
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
    };
}

export function buildOwnTracksSnapshotUpsert(args: {
    userId: string;
    provider: string;
    payload: OwnTracksPayload;
    eventMs: number;
    eventId: string | null;
}) {
    const { userId, provider, payload, eventMs, eventId } = args;

    return {
        user_id: userId,
        moment_ms: eventMs,
        location_precision: "device",
        lat: finiteNumber(payload.lat),
        lng: finiteNumber(payload.lon),
        pressure_hpa: pressureKpaToHpa(payload.p),
        elevation_m: finiteNumber(payload.alt),
        source_payload_ref: eventId,
        observation_type: "owntracks_location",
        capture_mode: captureModeFromTrigger(payload.t),
        source_mode: provider,
    };
}