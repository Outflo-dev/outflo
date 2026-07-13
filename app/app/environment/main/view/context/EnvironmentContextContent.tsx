/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CONTENT
   File: app/app/environment/main/view/context/EnvironmentContextContent.tsx
   Scope: Compose Context Card place and resolution content
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
} from "react";

import {
    VISUAL,
} from "../../../../../../components/system/primitives/visuals";

import EnvironmentContextResolutionTile from "./controls/EnvironmentContextResolutionTile";
import EnvironmentContextResolutionMark from "./primitives/marks/EnvironmentContextResolutionMark";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextContentProps = {
    placeLabel: string;
    precisionLabel: string;
    precisionToken: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const CONTENT_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    rowGap: VISUAL.spacing[6],

    minWidth: 0,
};

const EYEBROW_STYLE: CSSProperties = {
    margin: 0,

    color: VISUAL.text[10],

    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[1],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: VISUAL.type.line[2],
    letterSpacing: "0.18em",
    textTransform: VISUAL.type.transform[2],
};

const CONTEXT_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    rowGap: VISUAL.spacing[4],

    minWidth: 0,
};

const PLACE_STYLE: CSSProperties = {
    margin: 0,

    overflow: "hidden",

    color: VISUAL.text[20],

    fontFamily: VISUAL.type.family[2],
    fontSize: "clamp(16px, 4vw, 19px)",
    fontWeight: VISUAL.type.weight[3],
    lineHeight: 1,
    letterSpacing: VISUAL.type.tracking[4],

    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextContent({
    placeLabel,
    precisionLabel,
    precisionToken,
}: EnvironmentContextContentProps) {
    return (
        <div style={CONTENT_STYLE}>
            <p style={EYEBROW_STYLE}>
                Current Context
            </p>

            <div style={CONTEXT_STYLE}>
                <h2 style={PLACE_STYLE}>
                    {placeLabel}
                </h2>

                <EnvironmentContextResolutionTile
                    label={precisionLabel}
                    token={precisionToken}
                    mark={
                        <EnvironmentContextResolutionMark />
                    }
                />
            </div>
        </div>
    );
}