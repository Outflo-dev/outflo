"use client";

/* ==========================================================
   OUTFLO — CARD SHEET (v1)
   File: components/system/surfaces/card/CardSheet.tsx
   Scope: Reusable bottom sheet surface composed from Motion + Card

   Last Updated:
   - ms: 1775966426660
   - iso: 2026-04-12T04:00:26.660Z
   - note: initial system card sheet with app-frame alignment, fixed 65vh height, and backdrop tap dismissal
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import Motion from "@/components/system/primitives/motion/Motion";
import Card from "@/components/system/surfaces/card/Card";

/* ------------------------------
   Types
-------------------------------- */
type CardSheetProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
const WRAP_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 120,
};

const BACKDROP_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(0, 0, 0, 0.38)",
  border: 0,
  padding: 0,
  margin: 0,
  cursor: "default",
};

const FRAME_STYLE: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  maxWidth: 640,
  margin: "0 auto",
  paddingLeft: 8,
  paddingRight: 8,
  boxSizing: "border-box",
  pointerEvents: "none",
};

const SHEET_STYLE: React.CSSProperties = {
  height: "65vh",
  maxHeight: "65vh",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  pointerEvents: "auto",
};

const HANDLE_WRAP_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  paddingTop: 2,
  paddingBottom: 10,
  flexShrink: 0,
};

const HANDLE_STYLE: React.CSSProperties = {
  width: 44,
  height: 4,
  borderRadius: 999,
  background: "rgba(255,255,255,0.18)",
};

const CONTENT_STYLE: React.CSSProperties = {
  minHeight: 0,
  flex: 1,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
};

/* ------------------------------
   Component
-------------------------------- */
export default function CardSheet({
  show,
  onClose,
  children,
}: CardSheetProps) {
  if (!show) return null;

  return (
    <div style={WRAP_STYLE} aria-hidden={!show}>
      <button
        type="button"
        aria-label="Close sheet"
        onClick={onClose}
        style={BACKDROP_STYLE}
      />

      <div style={FRAME_STYLE}>
        <Motion show={show} direction="up">
          <Card
            role="dialog"
            aria-modal="true"
            style={SHEET_STYLE}
          >
            <div style={HANDLE_WRAP_STYLE}>
              <div style={HANDLE_STYLE} />
            </div>

            <div style={CONTENT_STYLE}>{children}</div>
          </Card>
        </Motion>
      </div>
    </div>
  );
}