/* ==========================================================
   OUTFLO — OWNTRACKS HTTP NORMALIZE
   File: app/api/ingest/location/owntracks/internal/owntracks-normalize.ts
   Scope: Own OwnTracks HTTP payload normalization helpers
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import type { OwnTracksPayload } from "./owntracks-payload";

export function resolveEventMs(payload: OwnTracksPayload): number | null {
    const unix = payload.created_at ?? payload.tst;
    if (!unix || !Number.isFinite(unix)) return null;
    return Math.round(unix * 1000);
}

export function finiteNumber(value: unknown): number | null {
    if (typeof value !== "number") return null;
    if (!Number.isFinite(value)) return null;
    return value;
}

export function finiteInteger(value: unknown): number | null {
    const num = finiteNumber(value);
    if (num === null) return null;
    return Math.round(num);
}

export function pressureKpaToHpa(value: unknown): number | null {
    const kpa = finiteNumber(value);
    if (kpa === null) return null;
    return kpa * 10;
}

export function captureModeFromTrigger(trigger: string | undefined): string {
    if (trigger === "u") return "manual";
    return trigger || "unknown";
}