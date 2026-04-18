"use client";

/* ==========================================================
   OUTFLO — PROFILE PHOTO SHEET
   File: app/account/profile/view/ProfilePhotoSheet.tsx
   Scope: Render the profile photo controls sheet
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: align photo sheet view to controller-owned open and close orchestration
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
type ProfilePhotoSheetProps = {
  onClose: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfilePhotoSheet({
  onClose,
}: ProfilePhotoSheetProps) {
  return (
    <div
      role="dialog"
      aria-label="Profile photo options"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "rgba(0, 0, 0, 0.48)",
      }}
      onClick={onClose}
    />
  );
}