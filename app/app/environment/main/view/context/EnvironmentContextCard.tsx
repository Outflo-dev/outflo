// app/app/environment/main/view/context/EnvironmentContextCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CARD
   File: app/app/environment/main/view/context/EnvironmentContextCard.tsx
   Scope: Render Environment current context card above launch surface
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: move card surface ownership to EnvironmentCard primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentViewModel } from "../../internal/environment.types";
import EnvironmentCard from "../primitives/EnvironmentCard";
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
const CONTEXT_CARD_STYLE: CSSProperties = {
    minHeight: 92,
    padding: "14px 16px 14px",
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
    gap: 12,
};

const EYEBROW_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--theme-text-muted)",
    fontFamily: "var(--font-kelvin), ui-sans-serif, system-ui, sans-serif",
    fontSize: 10,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
};

const PLACE_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--theme-text-primary)",
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
    color: "var(--theme-semantic-good)",
    fontFamily: "var(--font-kelvin), ui-sans-serif, system-ui, sans-serif",
    fontSize: 10,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
};

const PRECISION_DOT_STYLE: CSSProperties = {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginRight: 8,
    background: "var(--theme-semantic-good)",
    boxShadow: "0 0 12px var(--theme-glow)",
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
        <EnvironmentCard
            variant="raised"
            style={CONTEXT_CARD_STYLE}
            ariaLabel="Current environment context"
        >
            <EnvironmentContextGlobe />

            <div style={CONTENT_STYLE}>
                <div style={EYEBROW_ROW_STYLE}>
                    <p style={EYEBROW_STYLE}>Current Context</p>
                </div>

                <div>
                    <h2 style={PLACE_STYLE}>{placeLabel}</h2>

                    <p style={META_STYLE}>
                        <span style={PRECISION_DOT_STYLE} aria-hidden="true" />
                        {precisionLabel}
                    </p>
                </div>
            </div>
        </EnvironmentCard>
    );
}