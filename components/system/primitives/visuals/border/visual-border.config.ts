/* ==========================================================
   OUTFLO — VISUAL BORDER PRIMITIVE
   File: components/system/primitives/visuals/border/visual-border.config.ts
   Scope: Atomic border construction dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";

export const VISUAL_BORDER = {
    width: createVisualDial("--visual-border-width"),
    style: createVisualDial("--visual-border-style"),
    color: createVisualDial("--visual-border-color"),
} as const;