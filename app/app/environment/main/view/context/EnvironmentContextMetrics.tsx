/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT METRICS
   File: app/app/environment/main/view/context/EnvironmentContextMetrics.tsx
   Scope: Compose interchangeable Context Card metric slots
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import {
    VISUAL,
} from "../../../../../../components/system/primitives/visuals";

import EnvironmentContextPingsTile from "./tiles/EnvironmentContextPingsTile";
import EnvironmentContextUsdTile from "./tiles/EnvironmentContextUsdTile";

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
    gridTemplateColumns: "repeat(2, minmax(0, auto))",
    alignItems: "stretch",
    columnGap: VISUAL.spacing[5],
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMetrics({
    pingCount,
    moneyValue,
}: EnvironmentContextMetricsProps) {
    return (
        <div style={METRICS_STYLE}>
            <EnvironmentContextPingsTile
                value={pingCount}
            />

            <EnvironmentContextUsdTile
                value={moneyValue}
            />
        </div>
    );
}