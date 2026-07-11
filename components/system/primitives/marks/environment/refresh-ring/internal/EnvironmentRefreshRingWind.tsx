/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH RING WIND
   File: components/system/primitives/marks/environment/refresh-ring/internal/EnvironmentRefreshRingWind.tsx
   Scope: Render compact updating Environment refresh ring wind
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { ENVIRONMENT_REFRESH_RING_GEOMETRY } from "../environment-refresh-ring.geometry";

import styles from "../environment-refresh-ring.module.css";

/* ------------------------------
   Geometry
-------------------------------- */
const {
    center: CENTER,
    radius: RADIUS,
    pathLength: PATH_LENGTH,
} = ENVIRONMENT_REFRESH_RING_GEOMETRY;

const WIND_HEAD_LENGTH = 18;
const WIND_HEAD_GAP =
    PATH_LENGTH - WIND_HEAD_LENGTH;

const WIND_TRAIL_LENGTH = 24;
const WIND_TRAIL_GAP =
    PATH_LENGTH - WIND_TRAIL_LENGTH;

const WIND_OFFSET = 2;

/* ------------------------------
   Styles
-------------------------------- */
const WIND_TRAIL_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-accent)",
    strokeWidth: 3.4,
    strokeLinecap: "round",
    opacity: 0.22,

    filter: `
        blur(0.7px)
        drop-shadow(
            0 0 3px
            color-mix(
                in srgb,
                var(--theme-accent) 44%,
                transparent
            )
        )
    `,
};

const WIND_HEAD_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-accent)",
    strokeWidth: 3.4,
    strokeLinecap: "round",

    filter: `
        drop-shadow(
            0 0 3px
            color-mix(
                in srgb,
                var(--theme-accent) 58%,
                transparent
            )
        )
    `,
};

/* ------------------------------
   Component
-------------------------------- */
export function EnvironmentRefreshRingWind() {
    return (
        <g className={styles.wind}>
            <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                pathLength={PATH_LENGTH}
                strokeDasharray={
                    `${WIND_TRAIL_LENGTH} ${WIND_TRAIL_GAP}`
                }
                strokeDashoffset={WIND_OFFSET}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                style={WIND_TRAIL_STYLE}
            />

            <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                pathLength={PATH_LENGTH}
                strokeDasharray={
                    `${WIND_HEAD_LENGTH} ${WIND_HEAD_GAP}`
                }
                strokeDashoffset={WIND_OFFSET}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                style={WIND_HEAD_STYLE}
            />
        </g>
    );
}