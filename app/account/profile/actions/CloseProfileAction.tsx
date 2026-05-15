"use client";

/* ==========================================================
   OUTFLO — CLOSE PROFILE ACTION
   File: app/account/profile/actions/CloseProfileAction.tsx
   Scope: Trigger boundary for dismissing the profile route
   Last Updated:
   - ms: 1778720709456
   - iso: 2026-05-14T01:05:09.456Z
   - note: replace close mark with quiet back chevron for profile surface navigation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";

/* ------------------------------
   Types
-------------------------------- */
type CloseProfileActionProps = {
  textPrimary: string;
  iconSurface: string;
  onDismiss: () => void;
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
    <IconButton
      ariaLabel="Back from profile"
      onClick={onDismiss}
      style={{
        background: iconSurface,
        color: textPrimary,
      }}
    >
      <Chevron direction="left" color="currentColor" strokeWidth={1.8} />
    </IconButton>
  );
}