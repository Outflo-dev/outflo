/* ==========================================================
   OUTFLO — VISUAL TYPE PRIMITIVE
   File: components/system/primitives/visuals/type/visual-type.config.ts
   Scope: Atomic typography construction dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";

export const VISUAL_TYPE = {
    family: createVisualDial("--visual-type-family"),
    size: createVisualDial("--visual-type-size"),
    weight: createVisualDial("--visual-type-weight"),
    line: createVisualDial("--visual-type-line"),
    tracking: createVisualDial("--visual-type-tracking"),
    transform: createVisualDial("--visual-type-transform"),
} as const;