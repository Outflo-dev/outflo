// app/app/environment/main/view/header/internal/EnvironmentHeaderBrand.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER BRAND
   File: app/app/environment/main/view/header/internal/EnvironmentHeaderBrand.tsx
   Scope: Render hardcoded Kelvin brand title for Environment header
   Last Updated:
   - note: hardcode mock brand lockup before extraction
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderBrand() {
    const ROOT_STYLE: CSSProperties = {
        minWidth: 0,
        display: "grid",
        justifyItems: "center",
        rowGap: 8,
        textAlign: "center",
    };

    const TITLE_STYLE: CSSProperties = {
        margin: 0,
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: 30,
        lineHeight: 1,
        fontWeight: 300,
        letterSpacing: "0.48em",
        textIndent: "0.48em",
        fontFamily: "var(--font-family-display)",
    };

    const SUBTITLE_STYLE: CSSProperties = {
        margin: 0,
        color: "rgba(34, 157, 255, 0.92)",
        fontSize: 11,
        lineHeight: 1,
        fontWeight: 700,
        letterSpacing: "0.38em",
        textIndent: "0.38em",
        fontFamily: "var(--font-family-body)",
    };

    return (
        <div style={ROOT_STYLE} aria-label="Kelvin Environment">
            <h1 style={TITLE_STYLE}>KELVIN</h1>
            <p style={SUBTITLE_STYLE}>ENVIRONMENT. PRECISELY.</p>
        </div>
    );
}