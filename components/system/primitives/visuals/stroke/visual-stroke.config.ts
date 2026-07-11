/* ==========================================================
   OUTFLO — VISUAL STROKE PRIMITIVE
   File: components/system/primitives/visuals/stroke/visual-stroke.config.ts
   Scope: Atomic SVG and line stroke construction primitives
   Updated: 2026-07-10 21:48
   ========================================================== */

import { createVisualDial } from "../visual.dial";
import { VISUAL_STROKE_CAP } from "./visual-stroke-cap.config";
import { VISUAL_STROKE_DASH } from "./visual-stroke-dash.config";
import { VISUAL_STROKE_JOIN } from "./visual-stroke-join.config";

export const VISUAL_STROKE = {
    color: createVisualDial("--visual-stroke-color"),
    width: createVisualDial("--visual-stroke-width"),
    cap: VISUAL_STROKE_CAP,
    join: VISUAL_STROKE_JOIN,
    dash: VISUAL_STROKE_DASH,
    opacity: createVisualDial("--visual-stroke-opacity"),
} as const;