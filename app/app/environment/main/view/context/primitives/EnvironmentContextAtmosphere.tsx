// app/app/environment/main/view/context/primitives/EnvironmentContextAtmosphere.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT ATMOSPHERE
   File: app/app/environment/main/view/context/primitives/EnvironmentContextAtmosphere.tsx
   Scope: Render Context Planet soft atmospheric field
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: bind atmosphere to shared Context Planet coordinate frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const ATMOSPHERE_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    background: `
        radial-gradient(
            circle at 70% 42%,
            var(--environment-context-map-glow) 0%,
            var(--environment-context-map-glow-soft) 42%,
            transparent 72%
        )
    `,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextAtmosphere() {
    return <div style={ATMOSPHERE_STYLE} />;
}