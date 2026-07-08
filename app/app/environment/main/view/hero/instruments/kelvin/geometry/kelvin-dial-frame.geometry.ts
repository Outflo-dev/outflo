/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL FRAME GEOMETRY
   File: app/app/environment/main/view/hero/instruments/kelvin/geometry/kelvin-dial-frame.geometry.ts
   Scope: Own Kelvin dial physical SVG frame geometry only
   ========================================================== */

/* ------------------------------
   Constants
-------------------------------- */
export const KELVIN_DIAL_FRAME_GEOMETRY = {
    viewBox: 420,
    center: 210,

    radii: {
        frameOuter: 205,
        frameInner: 198,

        thermalRail: 192,

        face: 178,
        faceGuide: 166,
    },

    strokes: {
        frameOuter: 1.25,
        frameInner: 2,
        face: 1,
        faceGuide: 1,

        thermalRail: 6,
    },
} as const;