/* ==========================================================
   OUTFLO — UI HERO
   File: components/ui/Hero.tsx
   Purpose: Render one canonical Outflō hero block
   ========================================================== */

"use client";

import type { ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
export type HeroProps = {
  eyebrow?: string;
  title: string;
  value?: string;
  meta?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  ariaLabel?: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const HERO_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const CENTERED_HERO_STYLE: React.CSSProperties = {
  ...HERO_STYLE,
  alignItems: "center",
  textAlign: "center",
};

const STACK_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const CENTERED_STACK_STYLE: React.CSSProperties = {
  ...STACK_STYLE,
  alignItems: "center",
};

const EYEBROW_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#B3B3B3",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 13,
  lineHeight: 1.3,
  fontWeight: 400,
};

const TITLE_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#FFFEFA",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 24,
  lineHeight: 1.15,
  fontWeight: 600,
  letterSpacing: "-0.02em",
};

const VALUE_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#FFFEFA",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 32,
  lineHeight: 1.1,
  fontWeight: 600,
  letterSpacing: "-0.02em",
};

const META_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#7A7A7A",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 13,
  lineHeight: 1.3,
  fontWeight: 400,
};

const ACTIONS_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 12,
  flexWrap: "wrap",
};

const CENTERED_ACTIONS_STYLE: React.CSSProperties = {
  ...ACTIONS_STYLE,
  justifyContent: "center",
};

/* ------------------------------
   Component
-------------------------------- */
export default function Hero({
  eyebrow,
  title,
  value,
  meta,
  actions,
  align = "left",
  ariaLabel,
}: HeroProps) {
  const heroStyle = align === "center" ? CENTERED_HERO_STYLE : HERO_STYLE;
  const stackStyle = align === "center" ? CENTERED_STACK_STYLE : STACK_STYLE;
  const actionsStyle = align === "center" ? CENTERED_ACTIONS_STYLE : ACTIONS_STYLE;

  return (
    <section style={heroStyle} aria-label={ariaLabel ?? title}>
      <div style={stackStyle}>
        {eyebrow ? <p style={EYEBROW_STYLE}>{eyebrow}</p> : null}
        <h1 style={TITLE_STYLE}>{title}</h1>
        {value ? <p style={VALUE_STYLE}>{value}</p> : null}
        {meta ? <p style={META_STYLE}>{meta}</p> : null}
      </div>

      {actions ? <div style={actionsStyle}>{actions}</div> : null}
    </section>
  );
}