"use client";

/* ==========================================================
   OUTFLO — CLOSE PROFILE ACTION
   File: app/account/profile/actions/CloseProfileAction.tsx
   Scope: Trigger boundary for dismissing the profile route
   Last Updated:
   - ms: 1778290038937
   - iso: 2026-05-09T01:27:18.937Z
   - note: remove nested icon motion from close trigger
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import X from "@/components/system/primitives/marks/X";

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
      ariaLabel="Close profile"
      onClick={onDismiss}
      style={{
        background: iconSurface,
        color: textPrimary,
      }}
    >
      <X />
    </IconButton>
  );
}