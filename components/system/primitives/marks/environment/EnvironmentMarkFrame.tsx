/* ==========================================================
   OUTFLO — ENVIRONMENT MARK FRAME
   File: components/system/primitives/marks/environment/EnvironmentMarkFrame.tsx
   Scope: Provide Environment-owned mark sizing, centering, and inherited color
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import { VISUAL } from "../../visuals";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentMarkFrameProps = {
    children: ReactNode;
    size: CSSProperties["width"];
    color?: CSSProperties["color"];
    style?: CSSProperties;
};

/* ------------------------------
   Styles
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    lineHeight: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentMarkFrame({
    children,
    size,
    color = "currentColor",
    style,
}: EnvironmentMarkFrameProps) {
    return (
        <span
            aria-hidden="true"
            style={{
                ...FRAME_STYLE,
                width: size,
                height: size,
                color,
                ...style,
            }}
        >
            {children}
        </span>
    );
}