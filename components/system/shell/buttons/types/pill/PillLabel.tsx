"use client";

/* ==========================================================
   OUTFLO — PILL LABEL
   File: components/system/shell/buttons/types/pill/PillLabel.tsx
   Scope: Non-interactive pill label built from PillButtonFrame (display owner, no action or navigation ownership)
   Last Updated:
   - ms: 1776994812434
   - iso: 2026-04-24T01:40:12.434Z
   - note: add non-interactive pill label for display-only pill usage
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
  variant?: PillVariant;
  style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function PillLabel({
  children,
  variant = "muted",
  style,
}: Props) {
  return (
    <PillButtonFrame variant={variant} style={style}>
      {children}
    </PillButtonFrame>
  );
}