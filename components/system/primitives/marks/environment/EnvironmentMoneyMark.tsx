/* ==========================================================
   OUTFLO — ENVIRONMENT MONEY MARK
   File: components/system/primitives/marks/environment/EnvironmentMoneyMark.tsx
   Scope: Render Environment money signal geometry
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentMarkFrame from "./EnvironmentMarkFrame";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentMoneyMarkProps = {
    size: CSSProperties["width"];
    color?: CSSProperties["color"];
    style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentMoneyMark({
    size,
    color,
    style,
}: EnvironmentMoneyMarkProps) {
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
                    d="M12 3.75V20.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                <path
                    d="M16.25 7.25C15.35 6.35 13.95 5.8 12.25 5.8C9.9 5.8 8.25 6.95 8.25 8.7C8.25 10.35 9.55 11.15 12.2 11.8C14.95 12.5 16.25 13.3 16.25 15.1C16.25 17 14.5 18.2 12.05 18.2C10.15 18.2 8.55 17.55 7.5 16.45"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </EnvironmentMarkFrame>
    );
}