/* ==========================================================
   OUTFLO — VISUAL GLOW PRIMITIVE
   File: components/system/primitives/visuals/glow/visual-glow.config.ts
   Scope: Atomic glow construction dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";

export const VISUAL_GLOW = {
    x: createVisualDial("--visual-glow-x"),
    y: createVisualDial("--visual-glow-y"),
    blur: createVisualDial("--visual-glow-blur"),
    spread: createVisualDial("--visual-glow-spread"),
    color: createVisualDial("--visual-glow-color"),
} as const;