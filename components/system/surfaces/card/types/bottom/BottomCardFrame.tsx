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
  height: "65vh",
  maxHeight: "65vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderTopLeftRadius: "var(--card-radius)",
  borderTopRightRadius: "var(--card-radius)",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  border: "1px solid var(--card-border)",
  borderBottom: 0,
  background: "var(--card-bg)",
  padding: "14px 14px 18px",
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