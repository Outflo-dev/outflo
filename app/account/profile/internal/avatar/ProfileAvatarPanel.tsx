"use client";

/* ==========================================================
   OUTFLO — PROFILE AVATAR PANEL
   File: app/account/profile/internal/ProfileAvatarPanel.tsx
   Scope: Orchestrate profile avatar preview, picker actions, and crop flow
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: add reusable media crop surface for avatar upload
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import MediaCropper from "@/components/system/surfaces/media-crop/MediaCropper";
import type { MediaCropResult } from "@/components/system/surfaces/media-crop/media-crop.types";
import ProfileAvatarActions from "./ProfileAvatarActions";
import ProfileAvatarPreview from "./ProfileAvatarPreview";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
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
  gap: 18,
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAvatarPanel({ fullName, avatarUrl }: Props) {
  const [cropSourceUrl, setCropSourceUrl] = useState<string | null>(null);
  const [pendingAvatarUrl, setPendingAvatarUrl] = useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const visibleAvatarUrl = avatarRemoved
    ? null
    : pendingAvatarUrl ?? avatarUrl;

  function handleSelectFile(file: File) {
    if (cropSourceUrl) {
      URL.revokeObjectURL(cropSourceUrl);
    }

    const nextSourceUrl = URL.createObjectURL(file);

    setAvatarRemoved(false);
    setCropSourceUrl(nextSourceUrl);
  }

  function handleCancelCrop() {
    if (cropSourceUrl) {
      URL.revokeObjectURL(cropSourceUrl);
    }

    setCropSourceUrl(null);
  }

  function handleSaveCrop(result: MediaCropResult) {
    if (cropSourceUrl) {
      URL.revokeObjectURL(cropSourceUrl);
    }

    if (pendingAvatarUrl) {
      URL.revokeObjectURL(pendingAvatarUrl);
    }

    setPendingAvatarUrl(result.objectUrl);
    setAvatarRemoved(false);
    setCropSourceUrl(null);
  }

  function handleRemove() {
    if (pendingAvatarUrl) {
      URL.revokeObjectURL(pendingAvatarUrl);
    }

    if (cropSourceUrl) {
      URL.revokeObjectURL(cropSourceUrl);
    }

    setPendingAvatarUrl(null);
    setCropSourceUrl(null);
    setAvatarRemoved(true);
  }

  useEffect(() => {
    return () => {
      if (cropSourceUrl) {
        URL.revokeObjectURL(cropSourceUrl);
      }

      if (pendingAvatarUrl) {
        URL.revokeObjectURL(pendingAvatarUrl);
      }
    };
  }, [cropSourceUrl, pendingAvatarUrl]);

  if (cropSourceUrl) {
    return (
      <MediaCropper
        title="Adjust photo"
        sourceUrl={cropSourceUrl}
        shape="round"
        onCancel={handleCancelCrop}
        onSave={handleSaveCrop}
      />
    );
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