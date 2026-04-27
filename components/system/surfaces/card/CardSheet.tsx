"use client";

/* ==========================================================
   OUTFLO — CARD SHEET
   File: components/system/surfaces/card/CardSheet.tsx
   Scope: Bottom-anchored card-family overlay surface
   Last Updated:
   - ms: 1777251655
   - iso: 2026-04-26T21:00:55.000Z
   - note: restore readable bottom sheet behavior with direct card-family surface ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import { APP_SHELL } from "@/components/system/shell/app/app-shell.constants";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
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
  border: 0,
  margin: 0,
  padding: 0,
  background: "var(--card-sheet-backdrop)",
};

const FRAME_STYLE: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  maxWidth: APP_SHELL.maxWidth,
  margin: "0 auto",
  paddingLeft: `calc(${APP_SHELL.gutterX}px + env(safe-area-inset-left))`,
  paddingRight: `calc(${APP_SHELL.gutterX}px + env(safe-area-inset-right))`,
  boxSizing: "border-box",
};

const SHEET_STYLE: React.CSSProperties = {
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
  animation: "outfloCardSheetIn 340ms cubic-bezier(0.22, 1, 0.36, 1)",
};

const HANDLE_WRAP_STYLE: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  paddingTop: 2,
  paddingBottom: 12,
  flexShrink: 0,
};

const HANDLE_STYLE: React.CSSProperties = {
  width: 44,
  height: 4,
  borderRadius: 999,
  background: "var(--card-sheet-handle-bg)",
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
}: Props) {
  if (!show) return null;

  return (
    <div style={WRAP_STYLE}>
      <style>
        {`
          @keyframes outfloCardSheetIn {
            from {
              transform: translateY(100%);
              opacity: 0;
            }

            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <button
        type="button"
        aria-label="Close sheet"
        onClick={onClose}
        style={BACKDROP_STYLE}
      />

      <div style={FRAME_STYLE}>
        <div role="dialog" aria-modal="true" style={SHEET_STYLE}>
          <div style={HANDLE_WRAP_STYLE}>
            <div style={HANDLE_STYLE} />
          </div>

          <div style={CONTENT_STYLE}>{children}</div>
        </div>
      </div>
    </div>
  );
}