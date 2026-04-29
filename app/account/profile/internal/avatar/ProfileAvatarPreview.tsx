"use client";

/* ==========================================================
   OUTFLO — PROFILE AVATAR PREVIEW
   File: app/account/profile/internal/avatar/ProfileAvatarPreview.tsx
   Scope: Render profile avatar preview inside avatar panel
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: add reusable media crop surface for avatar upload
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Avatar from "@/components/system/primitives/display/avatar/Avatar";

/* ------------------------------
   Types
-------------------------------- */
type ProfileAvatarPreviewProps = {
  fullName: string;
  avatarUrl: string | null;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
};

const LABEL_STYLE: CSSProperties = {
  margin: 0,
  color: "var(--text-tertiary)",
  fontSize: 13,
  lineHeight: 1.35,
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAvatarPreview({
  fullName,
  avatarUrl,
}: ProfileAvatarPreviewProps) {
  return (
    <div style={ROOT_STYLE}>
      <Avatar size="lg" value={fullName} src={avatarUrl} alt={fullName} />

      <p style={LABEL_STYLE}>Profile picture</p>
    </div>
  );
}