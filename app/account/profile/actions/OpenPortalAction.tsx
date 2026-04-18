"use client";

/* ==========================================================
   OUTFLO — OPEN PORTAL ACTION
   File: app/account/profile/actions/OpenPortalAction.tsx
   Scope: Trigger boundary for exiting profile to the public portal
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: wire portal trigger to controller-owned exit behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type OpenPortalActionProps = {
  textPrimary: string;
  iconSurface: string;
  onOpenPortal: () => void;
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
  fontSize: 18,
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
export default function OpenPortalAction({
  textPrimary,
  iconSurface,
  onOpenPortal,
}: OpenPortalActionProps) {
  return (
    <button
      type="button"
      aria-label="Go to portal"
      onClick={onOpenPortal}
      style={{
        ...BUTTON_STYLE,
        background: iconSurface,
        color: textPrimary,
      }}
    >
      ↗
    </button>
  );
}