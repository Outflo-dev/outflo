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
  height?: string;
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
  borderTop: "var(--bottom-card-border-top)",
  borderLeft: "var(--bottom-card-border-left)",
  borderRight: "var(--bottom-card-border-right)",
  borderBottom: "var(--bottom-card-border-bottom)",
  background: "var(--bottom-card-bg)",
  boxShadow: "var(--bottom-card-shadow), var(--bottom-card-ring)",
  padding: "var(--bottom-card-padding)",
  boxSizing: "border-box",
};

/* ------------------------------
   Component
-------------------------------- */
export default function BottomCardFrame({ children, height }: Props) {
  return (
    <CardBase
      role="dialog"
      aria-modal="true"
      style={{
        ...FRAME_STYLE,
        height: height ?? FRAME_STYLE.height,
        maxHeight: height ?? FRAME_STYLE.maxHeight,
      }}
    >
      {children}
    </CardBase>
  );
}