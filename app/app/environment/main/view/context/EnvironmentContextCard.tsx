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
import EnvironmentContextRefreshAction from "./EnvironmentContextRefreshAction";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextCardProps = {
    model: EnvironmentViewModel;
    pingCount?: string;
    moneyValue?: string;
    isRefreshing?: boolean;
    onRefresh?: () => void;
};

/* ------------------------------
   Styles
-------------------------------- */
const CONTEXT_CARD_STYLE: CSSProperties = {
    minHeight: 86,
    padding: `${VISUAL.spacing[10]} ${VISUAL.spacing[12]}`,
};

const CARD_LAYOUT_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gridTemplateRows: "auto 1fr",
    columnGap: VISUAL.spacing[12],
    height: "100%",
};

const CONTENT_SLOT_STYLE: CSSProperties = {
    gridColumn: 1,
    gridRow: "1 / span 2",
    minWidth: 0,
};

const REFRESH_SLOT_STYLE: CSSProperties = {
    gridColumn: 2,
    gridRow: 1,
    display: VISUAL.display[6],
    justifyContent: "flex-end",
    alignItems: "flex-start",
};

const METRICS_SLOT_STYLE: CSSProperties = {
    gridColumn: 2,
    gridRow: 2,
    display: VISUAL.display[6],
    justifyContent: "flex-end",
    alignItems: "flex-end",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextCard({
    model,
    pingCount = "—",
    moneyValue = "—",
    isRefreshing = false,
    onRefresh,
}: EnvironmentContextCardProps) {
    const placeLabel = model.hero.place;
    const precisionLabel = model.hasSnapshot ? "PRECISE" : "WAITING";

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

                {onRefresh ? (
                    <div style={REFRESH_SLOT_STYLE}>
                        <EnvironmentContextRefreshAction
                            onRefresh={onRefresh}
                            isRefreshing={isRefreshing}
                        />
                    </div>
                ) : null}

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