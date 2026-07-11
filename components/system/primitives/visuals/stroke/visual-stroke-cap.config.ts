/* ==========================================================
   OUTFLO — VISUAL STROKE CAP PRIMITIVE
   File: components/system/primitives/visuals/stroke/visual-stroke-cap.config.ts
   Scope: Canonical numbered stroke-linecap selections
   Updated: 2026-07-10 21:48
   ========================================================== */

/* ------------------------------
   Legend

   0 = butt
   1 = round
   2 = square

   3–20 = unassigned
-------------------------------- */

export const VISUAL_STROKE_CAP = Object.freeze({
    0: "butt",
    1: "round",
    2: "square",
} as const);