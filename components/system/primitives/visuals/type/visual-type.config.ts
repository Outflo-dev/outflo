/* ==========================================================
   OUTFLO — VISUAL TYPE PRIMITIVE
   File: components/system/primitives/visuals/type/visual-type.config.ts
   Scope: Atomic typography construction dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";
import { VISUAL_TYPE_TRANSFORM } from "./visual-type-transform.config";

export const VISUAL_TYPE = {
    family: createVisualDial("--visual-type-family"),
    size: createVisualDial("--visual-type-size"),
    weight: createVisualDial("--visual-type-weight"),
    line: createVisualDial("--visual-type-line"),
    tracking: createVisualDial("--visual-type-tracking"),
    transform: VISUAL_TYPE_TRANSFORM,
} as const;