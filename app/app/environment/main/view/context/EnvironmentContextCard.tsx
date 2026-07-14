"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CARD
   File: app/app/environment/main/view/context/EnvironmentContextCard.tsx
   Scope: Resolve Context Card display values and compose owned regions
   Last Updated:
   - iso: 2026-07-14
   - note: bind Context Card posture control to compiled Engagement state
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentEngagementSelectableMode,
} from "@/lib/app-state/environment/environment-engagement";

import type {
    EnvironmentViewModel,
} from "../../internal/environment.types";
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
    engagementSaving: boolean;
    onEngagementModeChange: (
        mode: EnvironmentEngagementSelectableMode,
    ) => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextCard({
    model,
    pingCount = "—",
    moneyValue = "—",
    engagementSaving,
    onEngagementModeChange,
}: EnvironmentContextCardProps) {
    return (
        <EnvironmentContextCardFrame
            left={
                <EnvironmentContextLeft>
                    <EnvironmentContextContent
                        placeLabel={model.hero.place}
                        engagement={model.engagement}
                        engagementSaving={
                            engagementSaving
                        }
                        onEngagementModeChange={
                            onEngagementModeChange
                        }
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