/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH RING IDLE
   File: components/system/primitives/marks/environment/refresh-ring/internal/EnvironmentRefreshRingIdle.tsx
   Scope: Render idle Environment refresh ring segments
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

const SEGMENT_LENGTH = 14;
const SEGMENT_GAP =
    PATH_LENGTH - SEGMENT_LENGTH;

const DARK_SEGMENT_ONE_OFFSET = 1;
const LIGHT_SEGMENT_ONE_OFFSET = -13;
const DARK_SEGMENT_TWO_OFFSET = -27;
const LIGHT_SEGMENT_TWO_OFFSET = -51;

/* ------------------------------
   Styles
-------------------------------- */
const DARK_SEGMENT_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-accent)",
    strokeWidth: 4,
    strokeLinecap: "butt",

    filter: `
        drop-shadow(
            0 0 3px
            color-mix(
                in srgb,
                var(--theme-accent) 56%,
                transparent
            )
        )
    `,
};

const LIGHT_SEGMENT_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-semantic-proof)",
    strokeWidth: 4,
    strokeLinecap: "butt",

    filter: `
        drop-shadow(
            0 0 3px
            color-mix(
                in srgb,
                var(--theme-semantic-proof) 52%,
                transparent
            )
        )
    `,
};

/* ------------------------------
   Component
-------------------------------- */
export function EnvironmentRefreshRingIdle() {
    return (
        <g className={styles.idle}>
            <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                pathLength={PATH_LENGTH}
                strokeDasharray={
                    `${SEGMENT_LENGTH} ${SEGMENT_GAP}`
                }
                strokeDashoffset={DARK_SEGMENT_ONE_OFFSET}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                style={DARK_SEGMENT_STYLE}
            />

            <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                pathLength={PATH_LENGTH}
                strokeDasharray={
                    `${SEGMENT_LENGTH} ${SEGMENT_GAP}`
                }
                strokeDashoffset={LIGHT_SEGMENT_ONE_OFFSET}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                style={LIGHT_SEGMENT_STYLE}
            />

            <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                pathLength={PATH_LENGTH}
                strokeDasharray={
                    `${SEGMENT_LENGTH} ${SEGMENT_GAP}`
                }
                strokeDashoffset={DARK_SEGMENT_TWO_OFFSET}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                style={DARK_SEGMENT_STYLE}
            />

            <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                pathLength={PATH_LENGTH}
                strokeDasharray={
                    `${SEGMENT_LENGTH} ${SEGMENT_GAP}`
                }
                strokeDashoffset={LIGHT_SEGMENT_TWO_OFFSET}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
                style={LIGHT_SEGMENT_STYLE}
            />
        </g>
    );
}