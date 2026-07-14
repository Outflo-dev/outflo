"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT RESOLUTION TILE
   File: app/app/environment/main/view/context/controls/EnvironmentContextResolutionTile.tsx
   Scope: Render the current Environment Engagement posture control
   Last Updated:
   - iso: 2026-07-14
   - note: wire the Context Card word tile as an interactive Engagement control
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
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
    disabled: boolean;
    ariaLabel: string;
    onClick: () => void;
};

/* ------------------------------
   Styles
-------------------------------- */
const TILE_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",

    width: "fit-content",
    minWidth: 0,

    padding:
        `${VISUAL.spacing[3]} ${VISUAL.spacing[6]}`,

    borderWidth: VISUAL.border.width[1],
    borderStyle: VISUAL.border.style[1],
    borderColor:
        "var(--environment-context-resolution)",

    borderRadius: VISUAL.radius[5],

    background: VISUAL.fill[2],

    boxShadow: `
        ${VISUAL.inset.x[0]}
        ${VISUAL.inset.y[0]}
        ${VISUAL.inset.blur[3]}
        ${VISUAL.inset.spread[0]}
        var(--environment-context-resolution)
    `,

    appearance: "none",
    cursor: "pointer",
};

const DISABLED_STYLE: CSSProperties = {
    cursor: "default",
    opacity: VISUAL.opacity[12],
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,

    color:
        "var(--environment-context-resolution)",

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
    disabled,
    ariaLabel,
    onClick,
}: EnvironmentContextResolutionTileProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            aria-label={ariaLabel}
            onClick={onClick}
            style={
                {
                    ...TILE_STYLE,
                    ...(disabled
                        ? DISABLED_STYLE
                        : null),
                    "--environment-context-resolution":
                        token,
                } as CSSProperties
            }
        >
            <span style={LABEL_STYLE}>
                {label}
            </span>
        </button>
    );
}