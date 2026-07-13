/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PINGS TILE
   File: app/app/environment/main/view/context/tiles/EnvironmentContextPingsTile.tsx
   Scope: Own Environment Pings tile identity and local mark geometry
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import {
    VISUAL,
} from "../../../../../../../components/system/primitives/visuals";

import EnvironmentContextMetric from "../primitives/EnvironmentContextMetric";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextPingsTileProps = {
    value: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const MARK_STYLE: CSSProperties = {
    display: VISUAL.display[1],
    width: 22,
    height: 22,
    overflow: "visible",
};

/* ------------------------------
   Mark
-------------------------------- */
function EnvironmentContextPingsMark() {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            style={MARK_STYLE}
        >
            <path
                d="M6.2 6.4L11.8 11.8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.58"
            />

            <path
                d="M17.8 6.4L12.2 11.8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.58"
            />

            <path
                d="M7.2 17.4L11.8 12.2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.58"
            />

            <circle
                cx="5"
                cy="5.2"
                r="1.7"
                fill="currentColor"
                opacity="0.72"
            />

            <circle
                cx="19"
                cy="5.2"
                r="1.7"
                fill="currentColor"
                opacity="0.72"
            />

            <circle
                cx="6"
                cy="18.6"
                r="1.7"
                fill="currentColor"
                opacity="0.72"
            />

            <circle
                cx="12"
                cy="12"
                r="3.1"
                fill="currentColor"
            />

            <circle
                cx="12"
                cy="12"
                r="5.2"
                stroke="currentColor"
                strokeWidth="1.1"
                opacity="0.3"
            />
        </svg>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextPingsTile({
    value,
}: EnvironmentContextPingsTileProps) {
    return (
        <EnvironmentContextMetric
            label="Pings"
            value={value}
            mark={<EnvironmentContextPingsMark />}
            accent={VISUAL.accent[18]}
            ariaLabel={`${value} Environment pings`}
        />
    );
}