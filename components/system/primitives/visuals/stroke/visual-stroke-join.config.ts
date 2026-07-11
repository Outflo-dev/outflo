/* ==========================================================
   OUTFLO — VISUAL STROKE JOIN PRIMITIVE
   File: components/system/primitives/visuals/stroke/visual-stroke-join.config.ts
   Scope: Canonical numbered stroke-linejoin selections
   Updated: 2026-07-10 21:48
   ========================================================== */

/* ------------------------------
   Legend

   0 = miter
   1 = round
   2 = bevel

   3–20 = unassigned
-------------------------------- */

export const VISUAL_STROKE_JOIN = Object.freeze({
    0: "miter",
    1: "round",
    2: "bevel",
} as const);