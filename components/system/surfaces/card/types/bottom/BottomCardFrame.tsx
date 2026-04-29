"use client";

/* ==========================================================
   OUTFLO — BOTTOM CARD FRAME
   File: components/system/surfaces/card/types/bottom/BottomCardFrame.tsx
   Scope: Bottom-anchored card-family visual frame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import CardBase from "../../base/CardBase";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  children: ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
const FRAME_STYLE: React.CSSProperties = {
  height: "var(--bottom-card-height)",
  maxHeight: "var(--bottom-card-height)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderTopLeftRadius: "var(--bottom-card-radius)",
  borderTopRightRadius: "var(--bottom-card-radius)",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  border: "1px solid var(--bottom-card-border)",
  borderBottom: 0,
  background: "var(--bottom-card-bg)",
  padding: "var(--bottom-card-padding)",
  boxSizing: "border-box",
};

/* ------------------------------
   Component
-------------------------------- */
export default function BottomCardFrame({ children }: Props) {
  return (
    <CardBase
      role="dialog"
      aria-modal="true"
      style={FRAME_STYLE}
    >
      {children}
    </CardBase>
  );
}