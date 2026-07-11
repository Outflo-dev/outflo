/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH MARK
   File: components/system/primitives/marks/environment/EnvironmentRefreshMark.tsx
   Scope: Render Environment refresh action geometry
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentMarkFrame from "./EnvironmentMarkFrame";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRefreshMarkProps = {
    size: CSSProperties["width"];
    color?: CSSProperties["color"];
    style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRefreshMark({
    size,
    color,
    style,
}: EnvironmentRefreshMarkProps) {
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
                <path
                    d="M18.2 8.1A7.25 7.25 0 1 0 19.25 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M18.2 4.75V8.1H14.85"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </EnvironmentMarkFrame>
    );
}