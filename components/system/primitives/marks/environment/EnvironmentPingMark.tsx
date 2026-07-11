/* ==========================================================
   OUTFLO — ENVIRONMENT PING MARK
   File: components/system/primitives/marks/environment/EnvironmentPingMark.tsx
   Scope: Render Environment ping signal geometry
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentMarkFrame from "./EnvironmentMarkFrame";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentPingMarkProps = {
    size: CSSProperties["width"];
    color?: CSSProperties["color"];
    style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentPingMark({
    size,
    color,
    style,
}: EnvironmentPingMarkProps) {
    return (
        <EnvironmentMarkFrame
            size={size}
            color={color}
            style={style}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="2"
                    fill="currentColor"
                />

                <path
                    d="M8.75 8.75C6.95 10.55 6.95 13.45 8.75 15.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                <path
                    d="M15.25 8.75C17.05 10.55 17.05 13.45 15.25 15.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                <path
                    d="M5.9 5.9C2.53 9.27 2.53 14.73 5.9 18.1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                <path
                    d="M18.1 5.9C21.47 9.27 21.47 14.73 18.1 18.1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </EnvironmentMarkFrame>
    );
}