/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT LEFT REGION
   File: app/app/environment/main/view/context/internal/regions/EnvironmentContextLeft.tsx
   Scope: Own Context Card left-side placement
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
type EnvironmentContextLeftProps = {
    children: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const REGION_STYLE: CSSProperties = {
    display: VISUAL.display[4],
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",

    width: "100%",
    height: "100%",
    minWidth: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextLeft({
    children,
}: EnvironmentContextLeftProps) {
    return (
        <div style={REGION_STYLE}>
            {children}
        </div>
    );
}