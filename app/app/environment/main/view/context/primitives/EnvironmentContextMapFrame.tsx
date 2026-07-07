// app/app/environment/main/view/context/primitives/EnvironmentContextMapFrame.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT MAP FRAME
   File: app/app/environment/main/view/context/primitives/EnvironmentContextMapFrame.tsx
   Scope: Own Context Card map viewport and vignette composition
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: replace planet/orb attempt with vignetted map frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentContextMap from "./EnvironmentContextMap";
import EnvironmentContextMapStatusDot from "./EnvironmentContextMapStatusDot";
import EnvironmentContextMapVignette from "./EnvironmentContextMapVignette";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextMapFrameProps = {
    latitude?: number;
    longitude?: number;
};

/* ------------------------------
   Styles
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    position: "absolute",
    right: 0,
    top: 0,
    width: "72%",
    height: "100%",
    zIndex: 1,
    pointerEvents: "none",
    overflow: "hidden",
};

const DOT_WRAP_STYLE: CSSProperties = {
    position: "absolute",
    right: 24,
    top: 20,
    zIndex: 4,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMapFrame({
    latitude,
    longitude,
}: EnvironmentContextMapFrameProps) {
    return (
        <div style={FRAME_STYLE} aria-hidden="true">
            <EnvironmentContextMap
                latitude={latitude}
                longitude={longitude}
            />

            <EnvironmentContextMapVignette />

            <div style={DOT_WRAP_STYLE}>
                <EnvironmentContextMapStatusDot />
            </div>
        </div>
    );
}