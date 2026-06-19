// app/app/environment/main/view/header/internal/EnvironmentKelvinMark.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN MARK
   File: app/app/environment/main/view/header/internal/EnvironmentKelvinMark.tsx
   Scope: Render hardcoded Kelvin identity mark for Environment header
   Last Updated:
   - note: hardcode mock K circle before extraction
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinMark() {
    const BUTTON_STYLE: CSSProperties = {
        width: 46,
        height: 46,
        border: 0,
        borderRadius: 999,
        padding: 1,
        display: "grid",
        placeItems: "center",
        background:
            "linear-gradient(135deg, rgba(37, 182, 255, 0.95), rgba(158, 112, 255, 0.9))",
        boxShadow:
            "0 0 24px rgba(37, 182, 255, 0.22), inset 0 0 0 1px rgba(255,255,255,0.16)",
        cursor: "default",
    };

    const INNER_STYLE: CSSProperties = {
        width: "100%",
        height: "100%",
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        background:
            "radial-gradient(circle at 50% 20%, rgba(20, 38, 55, 0.98), rgba(2, 12, 20, 0.96))",
        color: "rgba(255, 255, 255, 0.92)",
        fontSize: 18,
        fontWeight: 300,
        letterSpacing: "0.04em",
        fontFamily: "var(--font-family-display)",
    };

    return (
        <button type="button" aria-label="Kelvin" style={BUTTON_STYLE}>
            <span style={INNER_STYLE}>K</span>
        </button>
    );
}