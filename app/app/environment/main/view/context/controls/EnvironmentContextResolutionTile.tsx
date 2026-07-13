/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT RESOLUTION TILE
   File: app/app/environment/main/view/context/controls/EnvironmentContextResolutionTile.tsx
   Scope: Render the current Environment resolution state
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
} from "../../../../../../../components/system/primitives/visuals";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextResolutionTileProps = {
    label: string;
    token: string;
    mark: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const TILE_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    width: "fit-content",
    minWidth: 0,

    padding: `${VISUAL.spacing[3]} ${VISUAL.spacing[5]}`,

    borderWidth: VISUAL.border.width[1],
    borderStyle: VISUAL.border.style[1],
    borderColor: "var(--environment-context-resolution)",

    borderRadius: VISUAL.radius[5],
    background: VISUAL.fill[2],

    boxShadow: `
        ${VISUAL.inset.x[0]}
        ${VISUAL.inset.y[0]}
        ${VISUAL.inset.blur[3]}
        ${VISUAL.inset.spread[0]}
        var(--environment-context-resolution)
    `,
};

const MARK_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",

    width: VISUAL.spacing[8],
    height: VISUAL.spacing[8],
    flex: "0 0 auto",

    marginRight: VISUAL.spacing[4],

    color: "var(--environment-context-resolution)",
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,

    color: "var(--environment-context-resolution)",

    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[4],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: 1,
    letterSpacing: "0.14em",
    textTransform: VISUAL.type.transform[2],

    whiteSpace: "nowrap",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextResolutionTile({
    label,
    token,
    mark,
}: EnvironmentContextResolutionTileProps) {
    return (
        <div
            style={
                {
                    ...TILE_STYLE,
                    "--environment-context-resolution": token,
                } as CSSProperties
            }
        >
            <span
                style={MARK_STYLE}
                aria-hidden="true"
            >
                {mark}
            </span>

            <p style={LABEL_STYLE}>
                {label}
            </p>
        </div>
    );
}