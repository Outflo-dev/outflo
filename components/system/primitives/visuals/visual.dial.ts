/* ==========================================================
   OUTFLO — VISUAL DIAL CONSTRUCTOR
   File: components/system/primitives/visuals/visual.dial.ts
   Scope: Construct canonical numeric CSS-variable dials
   Updated: 2026-07-10 21:48
   ========================================================== */

import type { VisualDial } from "./visual.types";

export function createVisualDial(
    variableStem: `--${string}`,
): VisualDial {
    return Object.freeze({
        0: `var(${variableStem}-0)`,
        1: `var(${variableStem}-1)`,
        2: `var(${variableStem}-2)`,
        3: `var(${variableStem}-3)`,
        4: `var(${variableStem}-4)`,
        5: `var(${variableStem}-5)`,
        6: `var(${variableStem}-6)`,
        7: `var(${variableStem}-7)`,
        8: `var(${variableStem}-8)`,
        9: `var(${variableStem}-9)`,
        10: `var(${variableStem}-10)`,
        11: `var(${variableStem}-11)`,
        12: `var(${variableStem}-12)`,
        13: `var(${variableStem}-13)`,
        14: `var(${variableStem}-14)`,
        15: `var(${variableStem}-15)`,
        16: `var(${variableStem}-16)`,
        17: `var(${variableStem}-17)`,
        18: `var(${variableStem}-18)`,
        19: `var(${variableStem}-19)`,
        20: `var(${variableStem}-20)`,
    });
}