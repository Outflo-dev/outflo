/* ==========================================================
   OUTFLO — OWNTRACKS MQTT ROWS
   File: lib/environment/mqtt/owntracks-rows.ts
   Scope: Build OwnTracks MQTT emitter event and snapshot rows
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import {
    getMotionActivities,
    isNumber,
    type OwnTracksPayload,
} from "./owntracks-payload";

export function buildOwnTracksMqttEmitterEventInsert(args: {
    userId: string;
    provider: string;
    deviceId: string;
    payload: OwnTracksPayload;
    rawPayload: Record<string, unknown>;
    eventMs: number | null;
    receivedMs: number;
}) {
    const {
        userId,
        provider,
        deviceId,
        payload,
        rawPayload,
        eventMs,
        receivedMs,
    } = args;

    return {
        user_id: userId,
        provider,
        device_id: deviceId,
        event_type: payload._type,

        received_ms: receivedMs,
        event_ms: eventMs,

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

        raw: rawPayload,
    };
}

export function buildOwnTracksMqttSnapshotUpsert(args: {
    userId: string;
    payload: OwnTracksPayload;
    rawPayload: Record<string, unknown>;
    eventMs: number;
    eventId: string;
    deviceId: string;
}) {
    const { userId, payload, rawPayload, eventMs, eventId, deviceId } = args;

    return {
        user_id: userId,
        moment_ms: eventMs,

        location_precision: "device",
        lat: payload.lat,
        lng: payload.lon,

        pressure_hpa: isNumber(payload.p) ? payload.p * 10 : null,
        elevation_m: isNumber(payload.alt) ? payload.alt : null,

        source_payload_ref: eventId,
        observation_type: "owntracks_location",
        capture_mode: typeof payload.t === "string" ? payload.t : "mqtt",
        source_mode: "owntracks_mqtt",

        accuracy_m: isNumber(payload.acc) ? payload.acc : null,
        vertical_accuracy_m: isNumber(payload.vac) ? payload.vac : null,

        emitter_pressure_kpa: isNumber(payload.p) ? payload.p : null,
        emitter_battery_pct: isNumber(payload.batt) ? payload.batt : null,
        emitter_battery_status: isNumber(payload.bs) ? payload.bs : null,
        emitter_connection: typeof payload.conn === "string" ? payload.conn : null,
        emitter_trigger: typeof payload.t === "string" ? payload.t : null,
        emitter_tracker_id: typeof payload.tid === "string" ? payload.tid : null,
        emitter_device_id: deviceId,
        emitter_motion: getMotionActivities(payload),

        latest_emitter_raw: rawPayload,
    };
}