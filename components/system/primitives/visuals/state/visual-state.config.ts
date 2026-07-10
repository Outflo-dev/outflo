/* ==========================================================
   OUTFLO — VISUAL STATE PRIMITIVE
   File: components/system/primitives/visuals/state/visual-state.config.ts
   Scope: Theme-resolved semantic state paint dials
   ========================================================== */

import { createVisualDial } from "../visual.dial";

export const VISUAL_STATE = {
    normal: createVisualDial("--visual-state-normal"),
    good: createVisualDial("--visual-state-good"),
    warning: createVisualDial("--visual-state-warning"),
    danger: createVisualDial("--visual-state-danger"),
    muted: createVisualDial("--visual-state-muted"),
} as const;