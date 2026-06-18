/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT ROW TYPES
   File: app/api/environment/context/pull/internal/environment-context-rows.types.ts
   Scope: Own shared Environment context row-builder types
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

export type EnvironmentSnapshotRow = {
    id: string;
    moment_ms: number | null;
    lat: number | string | null;
    lng: number | string | null;
};