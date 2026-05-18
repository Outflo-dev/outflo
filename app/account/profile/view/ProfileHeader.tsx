"use client";

/* ==========================================================
   OUTFLO — PROFILE HEADER
   File: app/account/profile/view/ProfileHeader.tsx
   Scope: Sticky header band composing profile route back navigation
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: align profile header action to account back action pattern
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import CloseProfileAction from "../actions/CloseProfileAction";
import { COLOR } from "@/components/system/primitives/color/color.config";

/* ------------------------------
   Types
-------------------------------- */
type ProfileHeaderProps = {
  onDismiss: () => void;
  onOpenPortal: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileHeader({
  onDismiss,
}: ProfileHeaderProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: -1,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: COLOR.surface.base,
        paddingTop: 10,
        paddingBottom: 12,
        marginBottom: 6,
      }}
    >
      <CloseProfileAction
        textPrimary={COLOR.text.primary}
        onDismiss={onDismiss}
      />
    </div>
  );
}