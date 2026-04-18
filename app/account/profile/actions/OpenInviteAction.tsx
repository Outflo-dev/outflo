"use client";

/* ==========================================================
   OUTFLO — OPEN INVITE ACTION
   File: app/account/profile/actions/OpenInviteAction.tsx
   Scope: Trigger boundary for opening the profile invite route
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: preserve invite route trigger in route-owned header action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type OpenInviteActionProps = {
  textPrimary: string;
  iconSurface: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const LINK_STYLE: CSSProperties = {
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
};

/* ------------------------------
   Component
-------------------------------- */
export default function OpenInviteAction({
  textPrimary,
  iconSurface,
}: OpenInviteActionProps) {
  return (
    <Link
      href="/account/profile/invite"
      aria-label="Open invite"
      style={{
        ...LINK_STYLE,
        background: iconSurface,
        color: textPrimary,
      }}
    >
      ⌁
    </Link>
  );
}