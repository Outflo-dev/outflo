/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CONTENT
   File: app/app/environment/main/view/context/EnvironmentContextContent.tsx
   Scope: Compose Context Card place and Engagement control
   Last Updated:
   - iso: 2026-07-14
   - note: resolve canonical Engagement through the Environment word tile
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
} from "react";

import type {
    EnvironmentEngagementSelectableMode,
} from "@/lib/app-state/environment/environment-engagement";

import {
    VISUAL,
} from "../../../../../../components/system/primitives/visuals";

import type {
    EnvironmentEngagementModel,
} from "../../internal/environment.types";
import EnvironmentContextResolutionTile from "./controls/EnvironmentContextResolutionTile";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextContentProps = {
    placeLabel: string;
    engagement: EnvironmentEngagementModel;
    engagementSaving: boolean;
    onEngagementModeChange: (
        mode: EnvironmentEngagementSelectableMode,
    ) => void;
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
   Engagement Resolution
-------------------------------- */
function getEngagementLabel(
    engagement: EnvironmentEngagementModel,
): string {
    if (!engagement.enabled) {
        return "OFF";
    }

    if (engagement.selectedMode === "precise") {
        return "PRECISE";
    }

    if (engagement.selectedMode === "capture") {
        return "CAPTURE";
    }

    return "SYSTEM";
}

function getNextEngagementMode(
    engagement: EnvironmentEngagementModel,
): EnvironmentEngagementSelectableMode {
    return engagement.selectedMode === "precise"
        ? "capture"
        : "precise";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextContent({
    placeLabel,
    engagement,
    engagementSaving,
    onEngagementModeChange,
}: EnvironmentContextContentProps) {
    const engagementLabel =
        getEngagementLabel(engagement);

    const nextMode =
        getNextEngagementMode(engagement);

    const engagementToken =
        engagement.enabled
            ? VISUAL.state.good[18]
            : VISUAL.state.muted[12];

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
                    label={engagementLabel}
                    token={engagementToken}
                    disabled={
                        !engagement.enabled ||
                        engagementSaving
                    }
                    ariaLabel={
                        engagement.enabled
                            ? `Change Environment engagement from ${engagementLabel.toLowerCase()}`
                            : "Environment engagement is off"
                    }
                    onClick={() => {
                        onEngagementModeChange(
                            nextMode,
                        );
                    }}
                />
            </div>
        </div>
    );
}