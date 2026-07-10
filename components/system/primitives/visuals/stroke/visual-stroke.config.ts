/* ==========================================================
   OUTFLO — VISUAL STROKE PRIMITIVE
   File: components/system/primitives/visuals/stroke/visual-stroke.config.ts
   Scope: Atomic SVG and line stroke construction dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";

export const VISUAL_STROKE = {
    color: createVisualDial("--visual-stroke-color"),
    width: createVisualDial("--visual-stroke-width"),
    cap: createVisualDial("--visual-stroke-cap"),
    join: createVisualDial("--visual-stroke-join"),
    dash: createVisualDial("--visual-stroke-dash"),
    opacity: createVisualDial("--visual-stroke-opacity"),
} as const;