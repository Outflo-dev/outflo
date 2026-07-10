/* ==========================================================
   OUTFLO — VISUAL INSET PRIMITIVE
   File: components/system/primitives/visuals/inset/visual-inset.config.ts
   Scope: Atomic inner-shadow construction dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";

export const VISUAL_INSET = {
    x: createVisualDial("--visual-inset-x"),
    y: createVisualDial("--visual-inset-y"),
    blur: createVisualDial("--visual-inset-blur"),
    spread: createVisualDial("--visual-inset-spread"),
    color: createVisualDial("--visual-inset-color"),
} as const;