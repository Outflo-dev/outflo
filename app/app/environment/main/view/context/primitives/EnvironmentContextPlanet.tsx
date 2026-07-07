// app/app/environment/main/view/context/primitives/EnvironmentContextPlanet.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PLANET
   File: app/app/environment/main/view/context/primitives/EnvironmentContextPlanet.tsx
   Scope: Render clipped planet surface inside Environment context card
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: collapse planet visual into one shared clipped circular shell
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentContextMap from "./EnvironmentContextMap";
import EnvironmentContextMapStatusDot from "./EnvironmentContextMapStatusDot";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextPlanetProps = {
    latitude?: number;
    longitude?: number;
};

/* ------------------------------
   Styles
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
    position: "absolute",
    right: -92,
    top: -92,
    width: "clamp(330px, 76vw, 520px)",
    height: "clamp(260px, 60vw, 410px)",
    zIndex: 1,
    pointerEvents: "none",
};

const SHELL_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: 999,
    overflow: "hidden",
    background: `
        radial-gradient(
            circle at 62% 44%,
            var(--environment-context-planet-core) 0%,
            var(--environment-context-planet-glow) 42%,
            var(--environment-context-planet-falloff) 64%,
            transparent 78%
        )
    `,
    boxShadow: `
        inset -18px 10px 28px var(--environment-context-planet-rim-soft),
        inset -2px 0 0 var(--environment-context-planet-rim)
    `,
};

const SHADOW_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    background: `
        linear-gradient(
            112deg,
            var(--environment-context-planet-shadow-strong) 0%,
            var(--environment-context-planet-shadow) 38%,
            transparent 56%
        )
    `,
};
const TERMINATOR_STYLE: CSSProperties = {
    position: "absolute",
    left: "-26%",
    top: "-20%",
    width: 28,
    height: "150%",
    zIndex: 4,
    pointerEvents: "none",
    transform: "rotate(-11deg)",
    transformOrigin: "center",
    background: `
        linear-gradient(
            90deg,
            transparent 0%,
            transparent 22%,
            var(--environment-context-planet-terminator-soft) 38%,
            var(--environment-context-planet-terminator) 50%,
            var(--environment-context-planet-terminator-soft) 62%,
            transparent 78%,
            transparent 100%
        )
    `,
    filter: "blur(0.35px)",
    opacity: "var(--environment-context-planet-terminator-opacity)",
};

const STATUS_DOT_WRAP_STYLE: CSSProperties = {
    position: "absolute",
    right: 28,
    top: 92,
    zIndex: 5,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextPlanet({
    latitude,
    longitude,
}: EnvironmentContextPlanetProps) {
    return (
        <div style={ROOT_STYLE} aria-hidden="true">
            <div style={SHELL_STYLE}>
                <EnvironmentContextMap
                    latitude={latitude}
                    longitude={longitude}
                />

                <div style={SHADOW_STYLE} />
                <div style={TERMINATOR_STYLE} />
            </div>

            <div style={STATUS_DOT_WRAP_STYLE}>
                <EnvironmentContextMapStatusDot />
            </div>
        </div>
    );
}