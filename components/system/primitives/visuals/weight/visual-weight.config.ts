/* ==========================================================
   OUTFLO — VISUAL WEIGHT PRIMITIVE
   File: components/system/primitives/visuals/weight/visual-weight.config.ts
   Scope: General visual weight selection
   ========================================================== */

/* ----------------------------------------------------------
   Selection legend

   0  = inherit
   1  = 100
   2  = 200
   3  = 300
   4  = 400
   5  = 500
   6  = 600
   7  = 700
   8  = 800
   9  = 900
   10 = 1000
   11–20 = unassigned
   ---------------------------------------------------------- */

export const VISUAL_WEIGHT = Object.freeze({
   0: "var(--visual-weight-0)",
   1: "var(--visual-weight-1)",
   2: "var(--visual-weight-2)",
   3: "var(--visual-weight-3)",
   4: "var(--visual-weight-4)",
   5: "var(--visual-weight-5)",
   6: "var(--visual-weight-6)",
   7: "var(--visual-weight-7)",
   8: "var(--visual-weight-8)",
   9: "var(--visual-weight-9)",
   10: "var(--visual-weight-10)",
} as const);