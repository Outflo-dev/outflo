// app/app/environment/main/view/context/primitives/EnvironmentContextMap.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT MAP
   File: app/app/environment/main/view/context/primitives/EnvironmentContextMap.tsx
   Scope: Render dotted world map geometry inside Context Map frame
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: map geometry only; vignette/frame own blending and crop
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextMapProps = {
    latitude?: number;
    longitude?: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const MAP_ASSET_URL = "/environment/map/world-map-dots.svg";

/* ------------------------------
   Styles
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    overflow: "hidden",
};

const MAP_PLATE_STYLE: CSSProperties = {
    position: "absolute",
    right: -65,
    top: 5,
    width: 250,
    height: 95,
    transform: "scaleX(1.4) scaleY(0.95) rotateZ(-0deg)",
    transformOrigin: "center",
    overflow: "hidden",
    borderRadius: 14,
};

const MAP_LAYER_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: "var(--environment-context-map-opacity)",
    background: "var(--environment-context-map-fill)",
    WebkitMaskImage: `url("${MAP_ASSET_URL}")`,
    maskImage: `url("${MAP_ASSET_URL}")`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMap({
    latitude,
    longitude,
}: EnvironmentContextMapProps) {
    void latitude;
    void longitude;

    return (
        <div style={ROOT_STYLE}>
            <div style={MAP_PLATE_STYLE}>
                <div style={MAP_LAYER_STYLE} />
            </div>
        </div>
    );
}