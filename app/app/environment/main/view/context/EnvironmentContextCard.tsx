// app/app/environment/main/view/context/EnvironmentContextCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CARD
   File: app/app/environment/main/view/context/EnvironmentContextCard.tsx
   Scope: Render Environment current context card above launch surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentViewModel } from "../../internal/environment.types";
import EnvironmentContextGlobe from "./primitives/EnvironmentContextGlobe";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextCardProps = {
    model: EnvironmentViewModel;
};

/* ------------------------------
   Styles
-------------------------------- */
const CARD_STYLE: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    minHeight: 118,
    borderRadius: 28,
    padding: "18px 18px 16px",
    border: "1px solid color-mix(in srgb, var(--text-primary) 10%, transparent)",
    background:
        "linear-gradient(135deg, rgba(18, 27, 46, 0.72), rgba(8, 12, 24, 0.86))",
    boxShadow:
        "0 20px 54px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const CONTENT_STYLE: CSSProperties = {
    position: "relative",
    zIndex: 2,
    display: "grid",
    rowGap: 10,
};

const EYEBROW_ROW_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
};

const EYEBROW_STYLE: CSSProperties = {
    margin: 0,
    color: "color-mix(in srgb, var(--text-primary) 54%, transparent)",
    fontFamily: "var(--font-kelvin), ui-sans-serif, system-ui, sans-serif",
    fontSize: 10,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
};

const LIVE_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "color-mix(in srgb, var(--text-primary) 62%, transparent)",
    fontFamily: "var(--font-kelvin), ui-sans-serif, system-ui, sans-serif",
    fontSize: 9,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
};

const DOT_STYLE: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "#67f0a2",
    boxShadow: "0 0 10px rgba(103, 240, 162, 0.36)",
};

const PLACE_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--text-primary)",
    fontFamily: "var(--font-kelvin), ui-sans-serif, system-ui, sans-serif",
    fontSize: "clamp(22px, 6vw, 30px)",
    fontWeight: 300,
    lineHeight: 0.96,
    letterSpacing: "-0.02em",
};

const META_STYLE: CSSProperties = {
    margin: 0,
    maxWidth: 210,
    color: "color-mix(in srgb, var(--text-primary) 58%, transparent)",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.35,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextCard({
    model,
}: EnvironmentContextCardProps) {
    const placeLabel = "Current Context";
    const precisionLabel = model.hasSnapshot
        ? "Live environment signal active"
        : "Waiting for environment signal";

    return (
        <section style={CARD_STYLE} aria-label="Current environment context">
            <EnvironmentContextGlobe />

            <div style={CONTENT_STYLE}>
                <div style={EYEBROW_ROW_STYLE}>
                    <p style={EYEBROW_STYLE}>Current Context</p>

                    <span style={LIVE_STYLE}>
                        <span style={DOT_STYLE} aria-hidden="true" />
                        Live
                    </span>
                </div>

                <div>
                    <h2 style={PLACE_STYLE}>{placeLabel}</h2>
                    <p style={META_STYLE}>{precisionLabel}</p>
                </div>
            </div>
        </section>
    );
}