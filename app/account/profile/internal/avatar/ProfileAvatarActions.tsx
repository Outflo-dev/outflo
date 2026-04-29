"use client";

/* ==========================================================
   OUTFLO — PROFILE AVATAR ACTIONS
   File: app/account/profile/internal/avatar/ProfileAvatarActions.tsx
   Scope: Own profile avatar file picker actions
   Last Updated:
   - ms: 1777500224257
   - iso: 2026-04-29T22:03:44.257Z
   - note: add reusable media crop surface for avatar upload
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ChangeEvent } from "react";
import { useRef } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ProfileAvatarActionsProps = {
  onSelectFile: (file: File) => void;
  onRemove: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: "100%",
};

const BUTTON_STYLE: CSSProperties = {
  minHeight: 46,
  width: "100%",
  border: "1px solid var(--border-soft)",
  borderRadius: 999,
  background: "var(--surface-muted)",
  color: "var(--text-primary)",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
};

const DANGER_BUTTON_STYLE: CSSProperties = {
  ...BUTTON_STYLE,
  color: "var(--danger-text)",
  background: "var(--danger-surface)",
  borderColor: "var(--danger-border)",
};

const INPUT_STYLE: CSSProperties = {
  display: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileAvatarActions({
  onSelectFile,
  onRemove,
}: ProfileAvatarActionsProps) {
  const libraryInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  function handleLibraryOpen() {
    libraryInputRef.current?.click();
  }

  function handleCameraOpen() {
    cameraInputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    onSelectFile(file);
  }

  return (
    <div style={ROOT_STYLE}>
      <button type="button" style={BUTTON_STYLE} onClick={handleLibraryOpen}>
        Choose from library
      </button>

      <button type="button" style={BUTTON_STYLE} onClick={handleCameraOpen}>
        Take photo
      </button>

      <button type="button" style={DANGER_BUTTON_STYLE} onClick={onRemove}>
        Remove current picture
      </button>

      <input
        ref={libraryInputRef}
        type="file"
        accept="image/*"
        style={INPUT_STYLE}
        onChange={handleFileChange}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={INPUT_STYLE}
        onChange={handleFileChange}
      />
    </div>
  );
}