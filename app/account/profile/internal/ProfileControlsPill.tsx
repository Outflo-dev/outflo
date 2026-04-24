"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLS PILL
   File: app/account/profile/internal/ProfileControlsPill.tsx
   Scope: Interactive pill that opens profile controls sheet
   Last Updated:
   - ms: 1776997202468
   - iso: 2026-04-24T02:20:02.468Z
   - note: extract Controls action from legacy ProfileSecretActions into PillButton-based component
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import PillButton from "@/components/system/shell/buttons/types/pill/PillButton";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  textPrimary: string;
  onClick: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileControlsPill({
  textPrimary,
  onClick,
}: Props) {
  return (
    <PillButton
      variant="soft"
      onClick={onClick}
      ariaLabel="Open profile controls"
    >
      <span
        style={{
          color: textPrimary,
        }}
      >
        Controls
      </span>
    </PillButton>
  );
}