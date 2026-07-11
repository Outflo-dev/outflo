/* ==========================================================
   OUTFLO — VISUAL POSITION PRIMITIVE
   File: components/system/primitives/visuals/position/visual-position.config.ts
   Scope: Canonical CSS position selections
   ========================================================== */

/* ----------------------------------------------------------
   Selection legend

   0 = static
   1 = relative
   2 = absolute
   3 = fixed
   4 = sticky
   5–20 = unassigned
   ---------------------------------------------------------- */

export const VISUAL_POSITION = Object.freeze({
    0: "static",
    1: "relative",
    2: "absolute",
    3: "fixed",
    4: "sticky",
} as const);