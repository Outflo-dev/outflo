"use client";

/* ==========================================================
   OUTFLO — MEDIA CROP FRAME
   File: components/system/surfaces/media-crop/MediaCropFrame.tsx
   Scope: Own reusable media crop surface frame and actions
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: add reusable media crop surface for avatar upload
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type MediaCropFrameProps = {
  title: string;
  children: ReactNode;
  onCancel: () => void;
  onSave: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
};

const HEADER_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const TITLE_STYLE: CSSProperties = {
  margin: 0,
  color: "var(--text-primary)",
  fontSize: 17,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const CROP_AREA_STYLE: CSSProperties = {
  position: "relative",
  width: "100%",
  height: 320,
  overflow: "hidden",
  borderRadius: "var(--card-radius)",
  background: "var(--surface-muted)",
};

const ACTIONS_STYLE: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const BUTTON_STYLE: CSSProperties = {
  minHeight: 44,
  border: "1px solid var(--border-soft)",
  borderRadius: 999,
  background: "var(--surface-muted)",
  color: "var(--text-primary)",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
};

const PRIMARY_BUTTON_STYLE: CSSProperties = {
  ...BUTTON_STYLE,
  background: "var(--surface-soft)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function MediaCropFrame({
  title,
  children,
  onCancel,
  onSave,
}: MediaCropFrameProps) {
  return (
    <div style={ROOT_STYLE}>
      <div style={HEADER_STYLE}>
        <h2 style={TITLE_STYLE}>{title}</h2>
      </div>

      <div style={CROP_AREA_STYLE}>{children}</div>

      <div style={ACTIONS_STYLE}>
        <button type="button" style={BUTTON_STYLE} onClick={onCancel}>
          Cancel
        </button>

        <button type="button" style={PRIMARY_BUTTON_STYLE} onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
}