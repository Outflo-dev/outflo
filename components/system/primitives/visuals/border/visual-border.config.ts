/* ==========================================================
   OUTFLO — VISUAL BORDER PRIMITIVE
   File: components/system/primitives/visuals/border/visual-border.config.ts
   Scope: Atomic border construction primitives
   Updated: 2026-07-10 21:48
   ========================================================== */

import { createVisualDial } from "../visual.dial";
import { VISUAL_BORDER_STYLE } from "./visual-border-style.config";

export const VISUAL_BORDER = {
    width: createVisualDial("--visual-border-width"),
    style: VISUAL_BORDER_STYLE,
    color: createVisualDial("--visual-border-color"),
} as const;