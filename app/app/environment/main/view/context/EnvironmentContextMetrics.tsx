/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT METRICS
   File: app/app/environment/main/view/context/EnvironmentContextMetrics.tsx
   Scope: Arrange Context Card metrics side by side
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import {
    EnvironmentMoneyMark,
    EnvironmentPingMark,
} from "../../../../../../components/system/primitives/marks/environment";
import { VISUAL } from "../../../../../../components/system/primitives/visuals";

import EnvironmentContextMetric from "./primitives/EnvironmentContextMetric";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextMetricsProps = {
    pingCount: string;
    moneyValue: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const METRICS_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    gridTemplateColumns: "repeat(2, auto)",
    alignItems: "center",
    columnGap: VISUAL.spacing[12],
};

const MARK_SIZE = VISUAL.spacing[10];

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMetrics({
    pingCount,
    moneyValue,
}: EnvironmentContextMetricsProps) {
    return (
        <div style={METRICS_STYLE}>
            <EnvironmentContextMetric
                label="Pings"
                value={pingCount}
                mark={
                    <EnvironmentPingMark
                        size={MARK_SIZE}
                        color={VISUAL.text[10]}
                    />
                }
            />

            <EnvironmentContextMetric
                label="Money"
                value={moneyValue}
                mark={
                    <EnvironmentMoneyMark
                        size={MARK_SIZE}
                        color={VISUAL.text[10]}
                    />
                }
            />
        </div>
    );
}