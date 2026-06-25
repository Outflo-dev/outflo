// app/app/environment/main/view/header/primitives/EnvironmentHeaderWordmark.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER WORDMARK
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderWordmark.tsx
   Scope: Local Environment header wordmark primitive
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
    minWidth: 0,
    maxWidth: "100%",
    display: "grid",
    justifyItems: "center",
    alignContent: "center",
    rowGap: "clamp(4px, 0.65vw, 7px)",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "visible",
};

const TITLE_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--environment-header-text)",
    fontFamily: KELVIN_FONT_FAMILY,
    fontSize: "clamp(22px, 6.4vw, 30px)",
    fontWeight: 200,
    lineHeight: 0.78,
    letterSpacing: "clamp(0.32em, 1.17vw, 0.42em)",
    textTransform: "uppercase",
    transform: "translateX(clamp(0.17em, 0.9vw, 0.28em))",
};

const SUBTITLE_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--environment-header-subtitle)",
    fontFamily: KELVIN_FONT_FAMILY,
    fontSize: "clamp(8px, 1.9vw, 10px)",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "clamp(0.16em, 0.66vw, 0.22em)",
    textTransform: "uppercase",
    transform: "translateX(clamp(0.06em, 0.28vw, 0.09em))",
    whiteSpace: "nowrap",
};

const DEGREE_STYLE: CSSProperties = {
    display: "inline-block",
    marginLeft: "-0.1em",
    color: "var(--environment-header-degree)",
    fontSize: "0.9em",
    fontWeight: 200,
    lineHeight: 1,
    verticalAlign: "top",
    transform: "translateY(-0.34em)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderWordmark() {
    return (
        <div style={WRAP_STYLE} aria-label="Kelvin. Environment. Precisely.">
            <h1 style={TITLE_STYLE}>
                KELVIN<span style={DEGREE_STYLE}>°</span>
            </h1>
            <p style={SUBTITLE_STYLE}>ENVIRONMENT. PRECISELY.</p>
        </div>
    );
}