/* ==========================================================
   OUTFLO — VISUAL PRIMITIVE TYPES
   File: components/system/primitives/visuals/visual.types.ts
   Scope: Shared numeric visual dial types
   ========================================================== */

export type VisualDialNumber =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10;

export type VisualDial<TValue = string> = Record<VisualDialNumber, TValue>;