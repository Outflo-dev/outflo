/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT METRIC
   File: app/app/environment/main/view/context/primitives/EnvironmentContextMetric.tsx
   Scope: Render one compact Context Card metric
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

import {
    VISUAL,
} from "../../../../../../../components/system/primitives/visuals";

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
    display: VISUAL.display[4],
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",

    minWidth: VISUAL.spacing[18],
    rowGap: VISUAL.spacing[2],

    textAlign: "center",
};

const MARK_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",

    width: VISUAL.spacing[12],
    height: VISUAL.spacing[12],

    borderRadius: VISUAL.radius[20],
    borderWidth: VISUAL.border.width[2],
    borderStyle: VISUAL.border.style[1],
    borderColor: VISUAL.border.color[4],
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,

    color: VISUAL.text[10],

    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[1],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: VISUAL.type.line[2],
    letterSpacing: "0.12em",
    textTransform: VISUAL.type.transform[2],

    whiteSpace: "nowrap",
};

const VALUE_STYLE: CSSProperties = {
    margin: 0,

    color: VISUAL.text[20],

    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[6],
    fontWeight: VISUAL.type.weight[6],
    lineHeight: VISUAL.type.line[2],

    whiteSpace: "nowrap",
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
            <span
                style={MARK_STYLE}
                aria-hidden="true"
            >
                {mark}
            </span>

            <p style={LABEL_STYLE}>
                {label}
            </p>

            <p style={VALUE_STYLE}>
                {value}
            </p>
        </div>
    );
}