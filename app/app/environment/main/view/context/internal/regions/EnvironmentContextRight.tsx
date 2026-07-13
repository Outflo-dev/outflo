/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT RIGHT REGION
   File: app/app/environment/main/view/context/internal/regions/EnvironmentContextRight.tsx
   Scope: Own Context Card right-side vertical distribution
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

import {
    VISUAL,
} from "../../../../../../../../components/system/primitives/visuals";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextRightProps = {
    top?: ReactNode;
    bottom: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const REGION_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    gridTemplateRows: "1fr auto",

    width: "100%",
    height: "100%",
    minWidth: 0,
};

const TOP_SLOT_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "flex-start",
    justifyContent: "flex-end",

    minWidth: 0,
};

const BOTTOM_SLOT_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "flex-end",

    alignSelf: "end",

    minWidth: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextRight({
    top,
    bottom,
}: EnvironmentContextRightProps) {
    return (
        <div style={REGION_STYLE}>
            <div style={TOP_SLOT_STYLE}>
                {top}
            </div>

            <div style={BOTTOM_SLOT_STYLE}>
                {bottom}
            </div>
        </div>
    );
}