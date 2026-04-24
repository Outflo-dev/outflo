"use client";

/* ==========================================================
   OUTFLO — PILL BUTTON FRAME
   File: components/system/shell/buttons/types/pill/PillButtonFrame.tsx
   Scope: Reusable pill-shaped visual container for all pill variants (no action or navigation ownership)
   Last Updated:
   - ms: 1776994490018
   - iso: 2026-04-24T01:34:50.018Z
   - note: replace domain-specific variants with system-level visual variants (soft, muted, danger)
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import ButtonBase from "../../base/ButtonBase";

/* ------------------------------
   Types
-------------------------------- */
type PillVariant = "soft" | "muted" | "danger";

type Props = {
  children: ReactNode;
  variant?: PillVariant;
  style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const BASE: CSSProperties = {
  minHeight: 40,
  padding: "0 16px",
  borderRadius: 999,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1,
};

const VARIANTS: Record<PillVariant, CSSProperties> = {
  soft: {
    background: "rgba(255,255,255,0.08)",
    color: "var(--text-primary)",
  },
  muted: {
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.72)",
  },
  danger: {
    background: "rgba(255, 80, 80, 0.10)",
    color: "rgba(255, 120, 120, 0.9)",
    border: "1px solid rgba(255, 80, 80, 0.25)",
  },
};

/* ------------------------------
   Component
-------------------------------- */
export default function PillButtonFrame({
  children,
  variant = "soft",
  style,
}: Props) {
  return (
    <ButtonBase
      style={{
        ...BASE,
        ...VARIANTS[variant],
        ...style,
      }}
    >
      {children}
    </ButtonBase>
  );
}