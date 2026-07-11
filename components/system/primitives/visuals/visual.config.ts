/* ==========================================================
   OUTFLO — VISUAL PRIMITIVE CONFIG
   File: components/system/primitives/visuals/visual.config.ts
   Scope: Root composer for new VISUAL primitive system
   ========================================================== */

import { VISUAL_ACCENT } from "./accent/visual-accent.config";
import { VISUAL_BORDER } from "./border/visual-border.config";
import { VISUAL_COLOR } from "./color/visual-color.config";
import { VISUAL_DISPLAY } from "./display/visual-display.config";
import { VISUAL_FILL } from "./fill/visual-fill.config";
import { VISUAL_GLOW } from "./glow/visual-glow.config";
import { VISUAL_INSET } from "./inset/visual-inset.config";
import { VISUAL_OPACITY } from "./opacity/visual-opacity.config";
import { VISUAL_POSITION } from "./position/visual-position.config";
import { VISUAL_RADIUS } from "./radius/visual-radius.config";
import { VISUAL_SHADOW } from "./shadow/visual-shadow.config";
import { VISUAL_SPACING } from "./spacing/visual-spacing.config";
import { VISUAL_STATE } from "./state/visual-state.config";
import { VISUAL_STROKE } from "./stroke/visual-stroke.config";
import { VISUAL_TEXT } from "./text/visual-text.config";
import { VISUAL_TYPE } from "./type/visual-type.config";
import { VISUAL_WEIGHT } from "./weight/visual-weight.config";
import { VISUAL_Z_INDEX } from "./z-index/visual-z-index.config";

export const VISUAL = {
    accent: VISUAL_ACCENT,
    border: VISUAL_BORDER,
    color: VISUAL_COLOR,
    display: VISUAL_DISPLAY,
    fill: VISUAL_FILL,
    glow: VISUAL_GLOW,
    inset: VISUAL_INSET,
    opacity: VISUAL_OPACITY,
    position: VISUAL_POSITION,
    radius: VISUAL_RADIUS,
    shadow: VISUAL_SHADOW,
    spacing: VISUAL_SPACING,
    state: VISUAL_STATE,
    stroke: VISUAL_STROKE,
    text: VISUAL_TEXT,
    type: VISUAL_TYPE,
    weight: VISUAL_WEIGHT,
    zIndex: VISUAL_Z_INDEX,
} as const;