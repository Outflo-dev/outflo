"use client";

/* ==========================================================
   OUTFLO — CLOSE PROFILE ACTION
   File: app/account/profile/actions/CloseProfileAction.tsx
   Scope: Trigger boundary for dismissing the profile route
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: align profile back action to account TextButton chevron pattern
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import TextButton from "@/components/system/shell/buttons/types/text/TextButton";

/* ------------------------------
   Types
-------------------------------- */
type CloseProfileActionProps = {
  textPrimary: string;
  onDismiss: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const ACTION_STYLE: CSSProperties = {
  width: 44,
  height: 44,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

/* ------------------------------
   Component
-------------------------------- */
export default function CloseProfileAction({
  textPrimary,
  onDismiss,
}: CloseProfileActionProps) {
  return (
    <TextButton
      ariaLabel="Back from profile"
      onClick={onDismiss}
      style={ACTION_STYLE}
    >
      <Chevron
        direction="left"
        role="nav"
        color={textPrimary}
      />
    </TextButton>
  );
}