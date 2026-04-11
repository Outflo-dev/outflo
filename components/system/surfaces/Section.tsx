/* ==========================================================
   OUTFLO — UI SECTION
   File: components/ui/Section.tsx
   Purpose: Render one canonical Outflō section block
   ========================================================== */

"use client";

import type { ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
export type SectionProps = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  withDivider?: boolean;
  ariaLabel?: string;
};

export type SectionRowProps = {
  label: string;
  value?: string;
  muted?: boolean;
};

export type SectionActionProps = {
  children: ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
const SECTION_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const TITLE_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#FFFEFA",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 18,
  lineHeight: 1.25,
  fontWeight: 500,
};

const CONTENT_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const FOOTER_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  paddingTop: 8,
};

const DIVIDER_STYLE: React.CSSProperties = {
  width: "100%",
  height: 1,
  border: "none",
  background: "rgba(255,255,255,0.08)",
  margin: 0,
};

const ROW_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
};

const LABEL_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#B3B3B3",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 16,
  lineHeight: 1.4,
  fontWeight: 400,
};

const VALUE_STYLE: React.CSSProperties = {
  margin: 0,
  color: "#FFFEFA",
  fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif",
  fontSize: 16,
  lineHeight: 1.4,
  fontWeight: 400,
  textAlign: "right",
};

const MUTED_VALUE_STYLE: React.CSSProperties = {
  ...VALUE_STYLE,
  color: "#7A7A7A",
};

const ACTION_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 12,
};

/* ------------------------------
   Component
-------------------------------- */
export default function Section({
  title,
  children,
  footer,
  withDivider = false,
  ariaLabel,
}: SectionProps) {
  return (
    <section style={SECTION_STYLE} aria-label={ariaLabel ?? title}>
      {title ? <h2 style={TITLE_STYLE}>{title}</h2> : null}

      <div style={CONTENT_STYLE}>{children}</div>

      {footer ? <div style={FOOTER_STYLE}>{footer}</div> : null}

      {withDivider ? <hr style={DIVIDER_STYLE} /> : null}
    </section>
  );
}

/* ------------------------------
   UI Surface
-------------------------------- */
export function SectionRow({
  label,
  value,
  muted = false,
}: SectionRowProps) {
  return (
    <div style={ROW_STYLE}>
      <p style={LABEL_STYLE}>{label}</p>
      {value ? (
        <p style={muted ? MUTED_VALUE_STYLE : VALUE_STYLE}>{value}</p>
      ) : null}
    </div>
  );
}

export function SectionAction({ children }: SectionActionProps) {
  return <div style={ACTION_STYLE}>{children}</div>;
}