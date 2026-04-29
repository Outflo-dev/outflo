"use client";

/* ==========================================================
   OUTFLO — PROFILE AVATAR PANEL
   File: app/account/profile/internal/ProfileAvatarPanel.tsx
   Scope: Orchestrate profile avatar preview and picker actions
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: lift crop surface out of avatar panel
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useState } from "react";
import ProfileAvatarActions from "./ProfileAvatarActions";
import ProfileAvatarPreview from "./ProfileAvatarPreview";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  fullName: string;
  avatarUrl: string | null;
  onSelectAvatarFile: (file: File) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 18,
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAvatarPanel({
  fullName,
  avatarUrl,
  onSelectAvatarFile,
}: Props) {
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const visibleAvatarUrl = avatarRemoved
    ? null
    : pendingAvatarUrl ?? avatarUrl;

  function handleSelectFile(file: File) {
    setAvatarRemoved(false);
    onSelectAvatarFile(file);
  }

  function handleRemove() {
    if (pendingAvatarUrl) {
      URL.revokeObjectURL(pendingAvatarUrl);
    }

    setPendingAvatarUrl(null);
    setAvatarRemoved(true);
  }

  return (
    <div style={ROOT_STYLE}>
      <ProfileAvatarPreview fullName={fullName} avatarUrl={visibleAvatarUrl} />

      <ProfileAvatarActions
        onSelectFile={handleSelectFile}
        onRemove={handleRemove}
      />
    </div>
  );
}