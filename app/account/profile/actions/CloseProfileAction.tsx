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
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import Motion from "@/components/system/primitives/motion/Motion";
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
        transition: "opacity 120ms ease",
      }}
    >
      <Motion show direction="down">
        <X />
      </Motion>
    </IconButton>
  );
}