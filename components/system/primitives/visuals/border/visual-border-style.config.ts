/* ==========================================================
   OUTFLO — VISUAL BORDER STYLE PRIMITIVE
   File: components/system/primitives/visuals/border/visual-border-style.config.ts
   Scope: Canonical numbered border-style selections
   Updated: 2026-07-10 21:48
   ========================================================== */

/* ------------------------------
   Legend

   0 = none
   1 = solid
   2 = dashed
   3 = dotted
   4 = double
   5 = groove
   6 = ridge
   7 = inset
   8 = outset

   9–20 = unassigned
-------------------------------- */

export const VISUAL_BORDER_STYLE = Object.freeze({
    0: "none",
    1: "solid",
    2: "dashed",
    3: "dotted",
    4: "double",
    5: "groove",
    6: "ridge",
    7: "inset",
    8: "outset",
} as const);