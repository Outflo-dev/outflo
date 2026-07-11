/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT METRIC
   File: app/app/environment/main/view/context/primitives/EnvironmentContextMetric.tsx
   Scope: Render one compact Context Card metric
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import { VISUAL } from "../../../../../../../components/system/primitives/visuals";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextMetricProps = {
    label: string;
    value: string;
    mark: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const METRIC_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto",
    columnGap: VISUAL.spacing[4],
    alignItems: "center",
};

const MARK_STYLE: CSSProperties = {
    gridColumn: 1,
    gridRow: "1 / span 2",
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,
    color: VISUAL.text[10],
    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[2],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: VISUAL.type.line[2],
    letterSpacing: "0.14em",
    textTransform: VISUAL.type.transform[2],
};

const VALUE_STYLE: CSSProperties = {
    margin: 0,
    color: VISUAL.text[20],
    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[8],
    fontWeight: VISUAL.type.weight[6],
    lineHeight: VISUAL.type.line[2],
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMetric({
    label,
    value,
    mark,
}: EnvironmentContextMetricProps) {
    return (
        <div style={METRIC_STYLE}>
            <span style={MARK_STYLE} aria-hidden="true">
                {mark}
            </span>

            <p style={LABEL_STYLE}>{label}</p>
            <p style={VALUE_STYLE}>{value}</p>
        </div>
    );
}