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
const KELVIN_FONT_FAMILY =
    "var(--font-kelvin), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

const WRAP_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "clamp(6px, 1.7vw, 9px)",
    minHeight: 20,
    transform: "translate(-6px, 2px)",
};

const DOT_STYLE: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "var(--environment-header-live)",
    boxShadow: "0 0 18px var(--environment-header-live-glow)",
};

const TEXT_STYLE: CSSProperties = {
    color: "var(--environment-header-action)",
    fontFamily: KELVIN_FONT_FAMILY,
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