/* ==========================================================
   OUTFLO — VISUAL SHADOW PRIMITIVE
   File: components/system/primitives/visuals/shadow/visual-shadow.config.ts
   Scope: Atomic outer-shadow construction dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";

export const VISUAL_SHADOW = {
    x: createVisualDial("--visual-shadow-x"),
    y: createVisualDial("--visual-shadow-y"),
    blur: createVisualDial("--visual-shadow-blur"),
    spread: createVisualDial("--visual-shadow-spread"),
    color: createVisualDial("--visual-shadow-color"),
} as const;