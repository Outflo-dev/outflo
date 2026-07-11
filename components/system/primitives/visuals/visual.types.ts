/* ==========================================================
   OUTFLO — VISUAL PRIMITIVE TYPES
   File: components/system/primitives/visuals/visual.types.ts
   Scope: Shared numbered visual primitive types
   Updated: 2026-07-10 21:48
   ========================================================== */

/* ------------------------------
   Canonical Number Domain
-------------------------------- */
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
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20;

/* ------------------------------
   Complete Calibrated Dial
-------------------------------- */
export type VisualDial<TValue = string> = Readonly<
    Record<VisualDialNumber, TValue>
>;

/* ------------------------------
   Sparse Selection Dial
-------------------------------- */
export type VisualSelectionDial<TValue = string> = Readonly<
    Partial<Record<VisualDialNumber, TValue>>
>;