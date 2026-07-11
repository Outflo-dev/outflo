/* ==========================================================
   OUTFLO — VISUAL TYPE TRANSFORM PRIMITIVE
   File: components/system/primitives/visuals/type/visual-type-transform.config.ts
   Scope: Canonical typography text-transform selections
   ========================================================== */

/* ----------------------------------------------------------
   Selection legend

   0 = none
   1 = lowercase
   2 = uppercase
   3 = capitalize
   4–20 = unassigned
   ---------------------------------------------------------- */

export const VISUAL_TYPE_TRANSFORM = Object.freeze({
    0: "none",
    1: "lowercase",
    2: "uppercase",
    3: "capitalize",
} as const);