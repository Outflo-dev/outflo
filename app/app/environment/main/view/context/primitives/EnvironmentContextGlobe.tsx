// app/app/environment/main/view/context/primitives/EnvironmentContextGlobe.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT GLOBE
   File: app/app/environment/main/view/context/primitives/EnvironmentContextGlobe.tsx
   Scope: Local abstract context globe visual for Environment context card
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const GLOBE_STYLE: CSSProperties = {
    position: "absolute",
    right: -18,
    top: -26,
    width: 156,
    height: 156,
    borderRadius: 999,
    opacity: 0.76,
    background:
        "radial-gradient(circle at 34% 30%, rgba(100, 200, 255, 0.24), rgba(95, 141, 255, 0.13) 34%, rgba(141, 120, 255, 0.10) 58%, rgba(5, 8, 18, 0.02) 72%)",
    boxShadow:
        "0 0 34px rgba(100, 200, 255, 0.12), 0 0 48px rgba(141, 120, 255, 0.10)",
};

const GRID_STYLE: CSSProperties = {
    position: "absolute",
    inset: 18,
    borderRadius: 999,
    border: "1px solid rgba(120, 190, 255, 0.16)",
    backgroundImage: `
        linear-gradient(rgba(120,190,255,0.10) 1px, transparent 1px),
        linear-gradient(90deg, rgba(120,190,255,0.10) 1px, transparent 1px)
    `,
    backgroundSize: "22px 22px",
    maskImage: "radial-gradient(circle, black 58%, transparent 72%)",
};

const PIN_STYLE: CSSProperties = {
    position: "absolute",
    left: "48%",
    top: "43%",
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "#67f0a2",
    boxShadow:
        "0 0 0 5px rgba(103, 240, 162, 0.10), 0 0 18px rgba(103, 240, 162, 0.42)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextGlobe() {
    return (
        <div style={GLOBE_STYLE} aria-hidden="true">
            <div style={GRID_STYLE} />
            <span style={PIN_STYLE} />
        </div>
    );
}