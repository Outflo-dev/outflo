"use client";

/* ==========================================================
   OUTFLO — MEDIA CROP FRAME
   File: components/system/surfaces/media-crop/MediaCropFrame.tsx
   Scope: Own reusable media crop surface frame and actions
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: refine crop frame into full-width square crop surface
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
  gap: 14,
  width: "100%",
};

const HEADER_STYLE: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "72px 1fr 72px",
  alignItems: "center",
  gap: 8,
};

const TITLE_STYLE: CSSProperties = {
  margin: 0,
  color: "var(--text-primary)",
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  textAlign: "center",
};

const BAR_ACTION_STYLE: CSSProperties = {
  minHeight: 38,
  border: 0,
  background: "transparent",
  color: "var(--text-primary)",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
};

const LEFT_ACTION_STYLE: CSSProperties = {
  ...BAR_ACTION_STYLE,
  textAlign: "left",
  color: "var(--text-secondary)",
};

const RIGHT_ACTION_STYLE: CSSProperties = {
  ...BAR_ACTION_STYLE,
  textAlign: "right",
};

const CROP_AREA_STYLE: CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  minHeight: 320,
  maxHeight: "min(62vh, 520px)",
  overflow: "hidden",
  borderRadius: "var(--card-radius)",
  background: "var(--surface-muted)",
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
        <button type="button" style={LEFT_ACTION_STYLE} onClick={onCancel}>
          Cancel
        </button>

        <h2 style={TITLE_STYLE}>{title}</h2>

        <button type="button" style={RIGHT_ACTION_STYLE} onClick={onSave}>
          Done
        </button>
      </div>

      <div style={CROP_AREA_STYLE}>{children}</div>
    </div>
  );
}