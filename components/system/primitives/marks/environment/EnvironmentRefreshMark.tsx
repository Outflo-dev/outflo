/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH MARK
   File: components/system/primitives/marks/environment/EnvironmentRefreshMark.tsx
   Scope: Render conventional two-arrow Environment refresh geometry
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
                    d="
                        M21 12
                        A9 9 0 0 0 5.78 5.78
                        L3 8
                    "
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M3 3V8H8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="
                        M3 12
                        A9 9 0 0 0 18.22 18.22
                        L21 16
                    "
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    d="M21 21V16H16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </EnvironmentMarkFrame>
    );
}