"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CARD
   File: app/app/environment/main/view/context/EnvironmentContextCard.tsx
   Scope: Compose current Environment context card owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { VISUAL } from "../../../../../../components/system/primitives/visuals";

import type { EnvironmentViewModel } from "../../internal/environment.types";
import EnvironmentCard from "../primitives/EnvironmentCard";
import EnvironmentContextContent from "./EnvironmentContextContent";
import EnvironmentContextMetrics from "./EnvironmentContextMetrics";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextCardProps = {
    model: EnvironmentViewModel;
    pingCount?: string;
    moneyValue?: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const CONTEXT_CARD_STYLE: CSSProperties = {
    minHeight: 74,
    padding: `${VISUAL.spacing[8]} ${VISUAL.spacing[10]}`,
};

const CARD_LAYOUT_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: VISUAL.spacing[8],
    alignItems: "center",
    height: "100%",
};

const CONTENT_SLOT_STYLE: CSSProperties = {
    minWidth: 0,
};

const METRICS_SLOT_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    justifyContent: "flex-end",
    alignItems: "center",
    minWidth: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextCard({
    model,
    pingCount = "—",
    moneyValue = "—",
}: EnvironmentContextCardProps) {
    const placeLabel = model.hero.place;

    const precisionLabel = model.hasSnapshot
        ? "PRECISE"
        : "WAITING";

    const precisionToken = model.hasSnapshot
        ? VISUAL.state.good[18]
        : VISUAL.state.muted[12];

    return (
        <EnvironmentCard
            variant="raised"
            style={CONTEXT_CARD_STYLE}
            ariaLabel="Current environment context"
        >
            <div style={CARD_LAYOUT_STYLE}>
                <div style={CONTENT_SLOT_STYLE}>
                    <EnvironmentContextContent
                        placeLabel={placeLabel}
                        precisionLabel={precisionLabel}
                        precisionToken={precisionToken}
                    />
                </div>

                <div style={METRICS_SLOT_STYLE}>
                    <EnvironmentContextMetrics
                        pingCount={pingCount}
                        moneyValue={moneyValue}
                    />
                </div>
            </div>
        </EnvironmentCard>
    );
}