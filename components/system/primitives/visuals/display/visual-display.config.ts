/* ==========================================================
   OUTFLO — VISUAL DISPLAY PRIMITIVE
   File: components/system/primitives/visuals/display/visual-display.config.ts
   Scope: Canonical CSS display selections
   ========================================================== */

/* ----------------------------------------------------------
   Selection legend

   0  = none
   1  = block
   2  = flex
   3  = grid
   4  = inline
   5  = inline-block
   6  = inline-flex
   7  = inline-grid
   8  = contents
   9  = table
   10 = list-item
   11–20 = unassigned
   ---------------------------------------------------------- */

export const VISUAL_DISPLAY = Object.freeze({
    0: "none",
    1: "block",
    2: "flex",
    3: "grid",
    4: "inline",
    5: "inline-block",
    6: "inline-flex",
    7: "inline-grid",
    8: "contents",
    9: "table",
    10: "list-item",
} as const);