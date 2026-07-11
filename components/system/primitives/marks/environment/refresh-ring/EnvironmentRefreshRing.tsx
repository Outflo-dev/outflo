"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH RING
   File: components/system/primitives/marks/environment/refresh-ring/EnvironmentRefreshRing.tsx
   Scope: Compose Environment refresh ring structure and states
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { VISUAL } from "../../../visuals";

import {
    ENVIRONMENT_REFRESH_RING_DIAMETER_PERCENT,
    ENVIRONMENT_REFRESH_RING_GEOMETRY,
} from "./environment-refresh-ring.geometry";

import type {
    EnvironmentRefreshRingProps,
} from "./environment-refresh-ring.types";

import { EnvironmentRefreshRingIdle } from "./internal/EnvironmentRefreshRingIdle";
import { EnvironmentRefreshRingSuccess } from "./internal/EnvironmentRefreshRingSuccess";
import { EnvironmentRefreshRingWind } from "./internal/EnvironmentRefreshRingWind";

import styles from "./environment-refresh-ring.module.css";

/* ------------------------------
   Geometry
-------------------------------- */
const {
    viewBoxSize: VIEW_BOX_SIZE,
    center: CENTER,
    radius: RADIUS,
} = ENVIRONMENT_REFRESH_RING_GEOMETRY;

/* ------------------------------
   Styles
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    display: VISUAL.display[1],
    width: "100%",
    height: "100%",
    pointerEvents: "none",
};

const GLOW_STYLE: CSSProperties = {
    position: VISUAL.position[2],
    top: "50%",
    left: "50%",

    width: ENVIRONMENT_REFRESH_RING_DIAMETER_PERCENT,
    height: ENVIRONMENT_REFRESH_RING_DIAMETER_PERCENT,

    borderRadius: 999,
    transform: "translate(-50%, -50%)",

    boxShadow: `
        0 0 0 1px var(--orb-shadow-1),
        0 0 18px var(--orb-shadow-2),
        0 0 30px var(--orb-shadow-3),
        0 0 18px var(--orb-shadow-4)
    `,

    pointerEvents: "none",
};

const SVG_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    display: VISUAL.display[1],
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
};

const STRUCTURAL_RAIL_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-border)",
    strokeWidth: 4.5,
};

const OUTFLO_RING_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-text-primary)",
    strokeWidth: 4,
};

/* ------------------------------
   Component
-------------------------------- */
export function EnvironmentRefreshRing({
    state,
}: EnvironmentRefreshRingProps) {
    const className = [
        styles.ring,
        state === "refreshing" ? styles.refreshing : "",
        state === "success" ? styles.succeeded : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span
            className={className}
            style={FRAME_STYLE}
        >
            <span
                aria-hidden="true"
                className={styles.glow}
                style={GLOW_STYLE}
            />

            <svg
                aria-hidden="true"
                focusable="false"
                viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
                style={SVG_STYLE}
            >
                <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    style={STRUCTURAL_RAIL_STYLE}
                />

                <circle
                    className={styles.outfloRing}
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    style={OUTFLO_RING_STYLE}
                />

                <EnvironmentRefreshRingIdle />
                <EnvironmentRefreshRingWind />
                <EnvironmentRefreshRingSuccess />
            </svg>
        </span>
    );
}