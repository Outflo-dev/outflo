"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CARD FRAME
   File: app/app/environment/main/view/context/internal/EnvironmentContextCardFrame.tsx
   Scope: Own Context Card shell and two-region geometry
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

import { VISUAL } from "../../../../../../../components/system/primitives/visuals";

import EnvironmentCard from "../../primitives/EnvironmentCard";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextCardFrameProps = {
    left: ReactNode;
    right: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const CARD_STYLE: CSSProperties = {
    padding: `${VISUAL.spacing[10]} ${VISUAL.spacing[10]}`,
};

const LAYOUT_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gridTemplateRows: "minmax(72px, 1fr)",

    columnGap: VISUAL.spacing[8],

    alignItems: "stretch",

    width: "100%",
    minWidth: 0,

    boxSizing: "border-box",
};

const LEFT_SLOT_STYLE: CSSProperties = {
    minWidth: 0,
};

const RIGHT_SLOT_STYLE: CSSProperties = {
    minWidth: 0,
    height: "100%",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextCardFrame({
    left,
    right,
}: EnvironmentContextCardFrameProps) {
    return (
        <EnvironmentCard
            variant="raised"
            style={CARD_STYLE}
            ariaLabel="Current environment context"
        >
            <div style={LAYOUT_STYLE}>
                <div style={LEFT_SLOT_STYLE}>
                    {left}
                </div>

                <div style={RIGHT_SLOT_STYLE}>
                    {right}
                </div>
            </div>
        </EnvironmentCard>
    );
}