// app/app/environment/main/view/header/primitives/EnvironmentHeaderLiveStatus.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER LIVE STATUS
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderLiveStatus.tsx
   Scope: Render Environment header live status primitive
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: replace Environment header-private live status tokens with global theme roles
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
    background: "var(--theme-semantic-good)",
    boxShadow: "none",
};

const TEXT_STYLE: CSSProperties = {
    color: "var(--theme-text-secondary)",
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