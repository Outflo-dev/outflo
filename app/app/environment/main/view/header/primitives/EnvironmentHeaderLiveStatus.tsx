// app/app/environment/main/view/header/primitives/EnvironmentHeaderLiveStatus.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER LIVE STATUS
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderLiveStatus.tsx
   Scope: Local Environment header live status primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const WRAP_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 32,
};

const DOT_STYLE: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "#25f0a0",
    boxShadow: "0 0 18px rgba(37, 240, 160, 0.42)",
};

const TEXT_STYLE: CSSProperties = {
    color: "color-mix(in srgb, var(--text-primary) 78%, transparent)",
    fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 9,
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderLiveStatus() {
    return (
        <div style={WRAP_STYLE} aria-label="Live">
            <span style={DOT_STYLE} aria-hidden="true" />
            <span style={TEXT_STYLE}>LIVE</span>
        </div>
    );
}