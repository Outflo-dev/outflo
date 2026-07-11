/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH RING SUCCESS
   File: components/system/primitives/marks/environment/refresh-ring/internal/EnvironmentRefreshRingSuccess.tsx
   Scope: Render successful Environment refresh confirmation
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
} = ENVIRONMENT_REFRESH_RING_GEOMETRY;

/* ------------------------------
   Styles
-------------------------------- */
const SUCCESS_RING_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-semantic-good)",
    strokeWidth: 4,
    strokeLinecap: "round",

    filter: `
        drop-shadow(
            0 0 4px
            color-mix(
                in srgb,
                var(--theme-semantic-good) 62%,
                transparent
            )
        )
    `,
};

const SUCCESS_CHECK_STYLE: CSSProperties = {
    fill: "none",
    stroke: "var(--theme-semantic-good)",
    strokeWidth: 3.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",

    filter: `
        drop-shadow(
            0 0 3px
            color-mix(
                in srgb,
                var(--theme-semantic-good) 58%,
                transparent
            )
        )
    `,
};

/* ------------------------------
   Component
-------------------------------- */
export function EnvironmentRefreshRingSuccess() {
    return (
        <g className={styles.success}>
            <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                style={SUCCESS_RING_STYLE}
            />

            <path
                d="M15.8 22.4L20.3 26.8L28.7 17.8"
                style={SUCCESS_CHECK_STYLE}
            />
        </g>
    );
}