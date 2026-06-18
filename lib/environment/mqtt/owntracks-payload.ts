/* ==========================================================
   OUTFLO — OWNTRACKS MQTT PAYLOAD
   File: lib/environment/mqtt/owntracks-payload.ts
   Scope: Own OwnTracks MQTT payload type and payload helpers
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

export type OwnTracksPayload = {
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

    motionactivities?: unknown;

    [key: string]: unknown;
};

export function isNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

export function resolveEventMs(payload: OwnTracksPayload): number | null {
    const unixSeconds = payload.created_at ?? payload.tst;

    if (!isNumber(unixSeconds)) {
        return null;
    }

    return Math.round(unixSeconds * 1000);
}

export function getMotionActivities(payload: OwnTracksPayload): unknown[] {
    return Array.isArray(payload.motionactivities)
        ? payload.motionactivities
        : [];
}

export function buildRawPayload(args: {
    payload: OwnTracksPayload;
    topic: string;
    providerUserId: string;
}) {
    return {
        ...args.payload,
        topic: args.topic,
        provider_user_id: args.providerUserId,
    };
}