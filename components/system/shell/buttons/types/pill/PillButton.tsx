"use client";

/* ==========================================================
   OUTFLO — PILL BUTTON
   File: components/system/shell/buttons/types/pill/PillButton.tsx
   Scope: Interactive pill button built from PillButtonFrame (action owner, no navigation ownership)
   Last Updated:
   - ms: 1776994676754
   - iso: 2026-04-24T01:37:56.754Z
   - note: align to system-level pill variants (soft, muted, danger) and remove domain leakage
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";
import PillButtonFrame from "./PillButtonFrame";

/* ------------------------------
   Types
-------------------------------- */
type PillVariant = "soft" | "muted" | "danger";

type Props = {
  children: ReactNode;
  onClick: () => void;
  variant?: PillVariant;
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const RESET: CSSProperties = {
  appearance: "none",
  border: "none",
  padding: 0,
  margin: 0,
  background: "transparent",
  cursor: "pointer",
};

/* ------------------------------
   Component
-------------------------------- */
export default function PillButton({
  children,
  onClick,
  variant = "soft",
  disabled = false,
  ariaLabel,
  title,
  type = "button",
  style,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      style={RESET}
    >
      <PillButtonFrame variant={variant} style={style}>
        {children}
      </PillButtonFrame>
    </button>
  );
}