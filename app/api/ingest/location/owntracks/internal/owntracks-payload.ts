/* ==========================================================
   OUTFLO — OWNTRACKS HTTP PAYLOAD
   File: app/api/ingest/location/owntracks/internal/owntracks-payload.ts
   Scope: Own OwnTracks HTTP payload type and JSON parsing
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
    [key: string]: any;
};

export function safeJsonParse<T>(
    raw: string,
): { ok: true; value: T } | { ok: false; error: string } {
    try {
        return { ok: true, value: JSON.parse(raw) as T };
    } catch (error: any) {
        return { ok: false, error: error?.message || "invalid json" };
    }
}