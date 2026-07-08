/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL ARC BOUNDARIES
   File: app/app/environment/main/view/hero/instruments/kelvin/geometry/kelvin-dial-arc-boundaries.geometry.ts
   Scope: Own editable Kelvin dial thermal arc boundary knobs only
   Last Updated:
   - ms: 1783474331193
   - iso: 2026-07-08T01:32:11.193Z
   - note: isolate Kelvin dial arc placement knobs from derived segment math
   ========================================================== */

/* ------------------------------
   Constants
-------------------------------- */
export const KELVIN_DIAL_ARC_BOUNDARIES = {
    start: 220,
    coolEnd: 324,
    warmStart: 34,
    end: 137,
} as const;