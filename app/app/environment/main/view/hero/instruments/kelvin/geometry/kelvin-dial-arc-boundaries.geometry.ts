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
    start: 224,
    coolEnd: 337,
    warmStart: 30,
    end: 136,
} as const;