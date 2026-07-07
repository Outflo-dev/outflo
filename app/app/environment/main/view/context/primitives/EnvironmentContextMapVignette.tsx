// app/app/environment/main/view/context/primitives/EnvironmentContextMapVignette.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT MAP VIGNETTE
   File: app/app/environment/main/view/context/primitives/EnvironmentContextMapVignette.tsx
   Scope: Blend Context Map into card surface with isolated map-centered vignette
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: isolate vignette over visible map plate instead of full map frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */

const VIGNETTE_PLATE_STYLE: CSSProperties = {
    position: "absolute",
    right: -65,
    top: 5,
    width: 250,
    height: 95,
    zIndex: 3,
    pointerEvents: "none",
    overflow: "hidden",
    borderRadius: 14,
    transform: "scaleX(1.3) scaleY(0.95) rotateZ(-1deg)",
    transformOrigin: "center",
};

const VIGNETTE_STYLE: CSSProperties = {
    position: "absolute",
    inset: -24,
    pointerEvents: "none",
    background: `
        radial-gradient(
            ellipse at 50% -16%,
            var(--environment-context-map-vignette-strong) 0%,
            var(--environment-context-map-vignette) 32%,
            var(--environment-context-map-vignette-soft) 52%,
            transparent 74%
        ),
        radial-gradient(
            ellipse at 52% 50%,
            transparent 0%,
            transparent 12%,
            var(--environment-context-map-vignette-soft) 30%,
            var(--environment-context-map-vignette) 58%,
            var(--environment-context-map-vignette-strong) 88%,
            var(--environment-context-map-vignette-strong) 100%
        ),
        radial-gradient(
            ellipse at 88% 52%,
            transparent 0%,
            transparent 34%,
            var(--environment-context-map-vignette-soft) 62%,
            var(--environment-context-map-vignette) 100%
        )
    `,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextMapVignette() {
    return (
        <div style={VIGNETTE_PLATE_STYLE} aria-hidden="true">
            <div style={VIGNETTE_STYLE} />
        </div>
    );
}