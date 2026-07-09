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
    display: "grid",
    placeItems: "center",
    minHeight: 158,
    paddingTop: 10,
};

const MARK_STYLE: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "var(--environment-air-status)",
    boxShadow: "0 0 14px var(--environment-air-status)",
};

const GAUGE_WRAP_STYLE: CSSProperties = {
    position: "relative",
    width: GAUGE_SIZE,
    height: GAUGE_SIZE,
    display: "grid",
    placeItems: "center",
};

const GAUGE_SVG_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    overflow: "visible",
};

const VALUE_WRAP_STYLE: CSSProperties = {
    position: "relative",
    zIndex: 1,
    display: "grid",
    placeItems: "center",
    gap: 3,
};

const VALUE_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--theme-text-primary)",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: "-0.045em",
    lineHeight: 1,
};

const STATUS_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--environment-air-status)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
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
                            stroke="var(--theme-border)"
                            strokeWidth={5}
                            opacity={0.62}
                        />

                        <circle
                            cx={GAUGE_SIZE / 2}
                            cy={GAUGE_SIZE / 2}
                            r={GAUGE_RADIUS}
                            fill="none"
                            stroke="var(--environment-air-status)"
                            strokeWidth={5}
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
        return "var(--theme-semantic-good, var(--theme-accent))";
    }

    if (status === "moderate") {
        return "var(--theme-semantic-warning, var(--theme-accent))";
    }

    if (status === "elevated") {
        return "var(--theme-semantic-danger, var(--theme-accent))";
    }

    return "var(--theme-text-tertiary, var(--theme-text-secondary))";
}