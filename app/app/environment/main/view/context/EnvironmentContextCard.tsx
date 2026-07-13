"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CARD
   File: app/app/environment/main/view/context/EnvironmentContextCard.tsx
   Scope: Resolve Context Card display values and compose owned regions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { VISUAL } from "../../../../../../components/system/primitives/visuals";

import type { EnvironmentViewModel } from "../../internal/environment.types";
import EnvironmentContextCardFrame from "./internal/EnvironmentContextCardFrame";
import EnvironmentContextRight from "./internal/regions/EnvironmentContextRight";
import EnvironmentContextContent from "./EnvironmentContextContent";
import EnvironmentContextMetrics from "./EnvironmentContextMetrics";
import EnvironmentContextLeft from "./internal/regions/EnvironmentContextLeft";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextCardProps = {
    model: EnvironmentViewModel;
    pingCount?: string;
    moneyValue?: string;
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
        <EnvironmentContextCardFrame
            left={
                <EnvironmentContextLeft>
                    <EnvironmentContextContent
                        placeLabel={placeLabel}
                        precisionLabel={precisionLabel}
                        precisionToken={precisionToken}
                    />
                </EnvironmentContextLeft>
            }
            right={
                <EnvironmentContextRight
                    bottom={
                        <EnvironmentContextMetrics
                            pingCount={pingCount}
                            moneyValue={moneyValue}
                        />
                    }
                />
            }
        />
    );
}