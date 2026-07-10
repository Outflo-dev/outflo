"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT AIR TILE
   File: app/app/environment/main/view/tiles/air/EnvironmentAirTile.tsx
   Scope: Render Air Quality tile from compiled Environment tile model
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { VISUAL } from "../../../../../../../components/system/primitives/visuals";

import type {
    EnvironmentAirQualityStatus,
    EnvironmentAirTileModel,
} from "../../../internal/environment.types";
import EnvironmentTileFrame from "../primitives/EnvironmentTileFrame";
import EnvironmentTileHeader from "../primitives/EnvironmentTileHeader";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentAirTileProps = {
    model: EnvironmentAirTileModel;
};

/* ------------------------------
   Constants
-------------------------------- */
const GAUGE_SIZE = 104;
const GAUGE_RADIUS = 43;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

/* ------------------------------
   Styles
-------------------------------- */
const BODY_STYLE: CSSProperties = {
    minHeight: 166,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const MARK_STYLE: CSSProperties = {
    width: VISUAL.spacing[4],
    height: VISUAL.spacing[4],
    borderRadius: VISUAL.radius[10],
    background: "var(--environment-air-status)",
    boxShadow: `
        ${VISUAL.glow.x[1]}
        ${VISUAL.glow.y[1]}
        ${VISUAL.glow.blur[3]}
        ${VISUAL.glow.spread[0]}
        var(--environment-air-status)
    `,
};

const GAUGE_WRAP_STYLE: CSSProperties = {
    width: GAUGE_SIZE,
    height: GAUGE_SIZE,
    display: "grid",
    placeItems: "center",
    marginInline: "auto",
};

const GAUGE_SVG_STYLE: CSSProperties = {
    gridArea: "1 / 1",
    width: GAUGE_SIZE,
    height: GAUGE_SIZE,
    overflow: "visible",
};

const VALUE_WRAP_STYLE: CSSProperties = {
    gridArea: "1 / 1",
    zIndex: 1,
    display: "grid",
    placeItems: "center",
    gap: VISUAL.spacing[1],
};

const VALUE_STYLE: CSSProperties = {
    margin: 0,
    color: VISUAL.text[10],
    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[9],
    fontWeight: VISUAL.type.weight[5],
    letterSpacing: VISUAL.type.tracking[1],
    lineHeight: VISUAL.type.line[1],
};

const STATUS_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--environment-air-status)",
    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[1],
    fontWeight: VISUAL.type.weight[5],
    letterSpacing: VISUAL.type.tracking[10],
    lineHeight: VISUAL.type.line[1],
    textTransform: VISUAL.type.transform[2],
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentAirTile({ model }: EnvironmentAirTileProps) {
    const statusToken = getAirStatusToken(model.status);
    const gaugeValue = getAirGaugeValue(model.aqi);
    const gaugeLength = GAUGE_CIRCUMFERENCE * gaugeValue;

    return (
        <EnvironmentTileFrame
            ariaLabel={`${model.title}: ${model.statusLabel}`}
            style={
                {
                    "--environment-air-status": statusToken,
                } as CSSProperties
            }
        >
            <EnvironmentTileHeader
                label={model.title}
                mark={<span style={MARK_STYLE} aria-hidden="true" />}
            />

            <div style={BODY_STYLE}>
                <div style={GAUGE_WRAP_STYLE}>
                    <svg
                        width={GAUGE_SIZE}
                        height={GAUGE_SIZE}
                        viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}
                        style={GAUGE_SVG_STYLE}
                        aria-hidden="true"
                    >
                        <circle
                            cx={GAUGE_SIZE / 2}
                            cy={GAUGE_SIZE / 2}
                            r={GAUGE_RADIUS}
                            fill="none"
                            stroke={VISUAL.stroke.color[3]}
                            strokeWidth={VISUAL.stroke.width[6]}
                        />

                        <circle
                            cx={GAUGE_SIZE / 2}
                            cy={GAUGE_SIZE / 2}
                            r={GAUGE_RADIUS}
                            fill="none"
                            stroke="var(--environment-air-status)"
                            strokeWidth={VISUAL.stroke.width[6]}
                            strokeLinecap="butt"
                            strokeDasharray={`${gaugeLength} ${GAUGE_CIRCUMFERENCE}`}
                            transform={`rotate(-90 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}
                        />
                    </svg>

                    <div style={VALUE_WRAP_STYLE}>
                        <p style={VALUE_STYLE}>{model.aqi}</p>
                        <p style={STATUS_STYLE}>{model.statusLabel}</p>
                    </div>
                </div>
            </div>
        </EnvironmentTileFrame>
    );
}

/* ------------------------------
   Helpers
-------------------------------- */
function getAirGaugeValue(aqi: string): number {
    const value = Number(aqi);

    if (!Number.isFinite(value)) {
        return 0;
    }

    return Math.max(0, Math.min(value, 100)) / 100;
}

function getAirStatusToken(status: EnvironmentAirQualityStatus): string {
    if (status === "good") {
        return VISUAL.state.good[9];
    }

    if (status === "moderate") {
        return VISUAL.state.warning[9];
    }

    if (status === "elevated") {
        return VISUAL.state.danger[9];
    }

    return VISUAL.state.muted[6];
}