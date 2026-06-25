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
    minHeight: 92,
    borderRadius: 16,
    padding: "14px 16px 14px",
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

const LIVE_DOT_STYLE: CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: "var(--environment-header-live)",
    boxShadow: "0 0 10px var(--environment-header-live-glow)",
};

const PRECISION_DOT_STYLE: CSSProperties = {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginRight: 8,
    background: "var(--environment-header-live)",
    boxShadow: "0 0 12px var(--environment-header-live-glow)",
};

const PLACE_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--text-primary)",
    fontFamily: "var(--font-kelvin), ui-sans-serif, system-ui, sans-serif",
    fontSize: "clamp(16px, 4.2vw, 20px)",
    fontWeight: 300,
    lineHeight: 0.96,
    letterSpacing: "-0.02em",
};

const META_STYLE: CSSProperties = {
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    color: "var(--environment-header-live)",
    fontFamily: "var(--font-kelvin), ui-sans-serif, system-ui, sans-serif",
    fontSize: 10,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextCard({
    model,
}: EnvironmentContextCardProps) {
    const placeLabel = model.hero.place;
    const precisionLabel = model.hasSnapshot ? "PRECISE" : "WAITING";

    return (
        <section style={CARD_STYLE} aria-label="Current environment context">
            <EnvironmentContextGlobe />

            <div style={CONTENT_STYLE}>
                <div style={EYEBROW_ROW_STYLE}>
                    <p style={EYEBROW_STYLE}>Current Context</p>

                    <span style={LIVE_STYLE}>
                        <span style={LIVE_DOT_STYLE} aria-hidden="true" />
                        Live
                    </span>
                </div>

                <div>
                    <h2 style={PLACE_STYLE}>{placeLabel}</h2>
                    <p style={META_STYLE}>
                        <span style={PRECISION_DOT_STYLE} aria-hidden="true" />
                        {precisionLabel}
                    </p>
                </div>
            </div>
        </section>
    );
}