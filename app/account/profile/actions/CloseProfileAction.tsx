"use client";

/* ==========================================================
   OUTFLO — CLOSE PROFILE ACTION
   File: app/account/profile/actions/CloseProfileAction.tsx
   Scope: Trigger boundary for dismissing the profile route
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: wire close trigger to controller-owned dismiss behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type CloseProfileActionProps = {
  textPrimary: string;
  iconSurface: string;
  onDismiss: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  textDecoration: "none",
  fontSize: 22,
  lineHeight: 1,
  flexShrink: 0,
  transition: "opacity 120ms ease",
  border: "none",
  cursor: "pointer",
  font: "inherit",
};

/* ------------------------------
   Component
-------------------------------- */
export default function CloseProfileAction({
  textPrimary,
  iconSurface,
  onDismiss,
}: CloseProfileActionProps) {
  return (
    <button
      type="button"
      aria-label="Close profile"
      onClick={onDismiss}
      style={{
        ...BUTTON_STYLE,
        color: textPrimary,
        background: iconSurface,
      }}
    >
      ×
    </button>
  );
}