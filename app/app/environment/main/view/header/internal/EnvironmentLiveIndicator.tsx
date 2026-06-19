// app/app/environment/main/view/header/internal/EnvironmentLiveIndicator.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT LIVE INDICATOR
   File: app/app/environment/main/view/header/internal/EnvironmentLiveIndicator.tsx
   Scope: Render hardcoded live status for Environment header
   Last Updated:
   - note: hardcode mock live indicator before extraction
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentLiveIndicator() {
    const ROOT_STYLE: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "rgba(255, 255, 255, 0.78)",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: "0.16em",
        lineHeight: 1,
        fontFamily: "var(--font-family-body)",
    };

    const DOT_STYLE: CSSProperties = {
        width: 7,
        height: 7,
        borderRadius: 999,
        background: "rgb(23, 255, 150)",
        boxShadow: "0 0 14px rgba(23, 255, 150, 0.72)",
    };

    return (
        <div style={ROOT_STYLE} aria-label="Live environment status">
            <span style={DOT_STYLE} aria-hidden="true" />
            <span>LIVE</span>
        </div>
    );
}