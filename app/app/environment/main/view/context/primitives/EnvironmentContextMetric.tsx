/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT METRIC
   File: app/app/environment/main/view/context/primitives/EnvironmentContextMetric.tsx
   Scope: Render one shared Context Card metric tile frame
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
    accent: CSSProperties["color"];
    ariaLabel?: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const TILE_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    display: VISUAL.display[3],
    placeItems: "center",

    boxSizing: "border-box",

    width: "clamp(48px, 12.5vw, 56px)",
    height: "clamp(48px, 6.8vh, 56px)",

    padding: `${VISUAL.spacing[2]} ${VISUAL.spacing[2]}`,

    overflow: "hidden",
    isolation: "isolate",

    borderRadius: VISUAL.radius[10],
    borderWidth: VISUAL.border.width[3],
    borderStyle: VISUAL.border.style[1],
    borderColor: "var(--environment-context-metric-accent)",

    background: VISUAL.fill[2],

    boxShadow: `
        ${VISUAL.glow.x[2]}
        ${VISUAL.glow.y[2]}
        ${VISUAL.glow.blur[8]}
        ${VISUAL.glow.spread[0]}
        color-mix(
            in srgb,
            var(--environment-context-metric-accent) 18%,
            transparent
        ),
        inset
        ${VISUAL.inset.x[0]}
        ${VISUAL.inset.y[0]}
        ${VISUAL.inset.blur[8]}
        ${VISUAL.inset.spread[0]}
        ${VISUAL.inset.color[4]}
    `,

    textAlign: "center",
};

const CONTENT_STYLE: CSSProperties = {
    display: VISUAL.display[4],
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    width: "fit-content",

    rowGap: VISUAL.spacing[2],
};

const VALUE_ROW_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",

    width: "fit-content",

    columnGap: VISUAL.spacing[1],
};

const MARK_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",

    width: 18,
    height: 18,
    flex: "0 0 18px",

    color: "var(--environment-context-metric-accent)",
};

const VALUE_STYLE: CSSProperties = {
    margin: 0,

    color: VISUAL.text[20],

    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[8],
    fontWeight: VISUAL.type.weight[7],
    lineHeight: 1,

    whiteSpace: "nowrap",
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,

    color: "var(--environment-context-metric-accent)",

    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[1],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: 1,
    letterSpacing: "0.11em",
    textTransform: VISUAL.type.transform[2],

    whiteSpace: "nowrap",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMetric({
    label,
    value,
    mark,
    accent,
    ariaLabel,
}: EnvironmentContextMetricProps) {
    return (
        <div
            aria-label={ariaLabel ?? `${label}: ${value}`}
            style={
                {
                    ...TILE_STYLE,
                    "--environment-context-metric-accent": accent,
                } as CSSProperties
            }
        >
            <div style={CONTENT_STYLE}>
                <div style={VALUE_ROW_STYLE}>
                    <span
                        aria-hidden="true"
                        style={MARK_STYLE}
                    >
                        {mark}
                    </span>

                    <p style={VALUE_STYLE}>
                        {value}
                    </p>
                </div>

                <p style={LABEL_STYLE}>
                    {label}
                </p>
            </div>
        </div>
    );
}