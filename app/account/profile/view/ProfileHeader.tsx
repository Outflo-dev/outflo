"use client";

/* ==========================================================
   OUTFLO — PROFILE HEADER
   File: app/account/profile/view/ProfileHeader.tsx
   Scope: Sticky header band composing profile route actions
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: connect profile header actions to controller-owned route behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import CloseProfileAction from "../actions/CloseProfileAction";
import OpenInviteAction from "../actions/OpenInviteAction";
import OpenPortalAction from "../actions/OpenPortalAction";
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
  onOpenPortal,
}: ProfileHeaderProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: -1,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: COLOR.surface.base,
        paddingTop: 10,
        paddingBottom: 12,
        marginBottom: 6,
      }}
    >
      <CloseProfileAction
        textPrimary={COLOR.text.primary}
        iconSurface={COLOR.surface.icon}
        onDismiss={onDismiss}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <OpenInviteAction
        textPrimary={COLOR.text.primary}
        iconSurface={COLOR.surface.icon}
        />

        <OpenPortalAction
         textPrimary={COLOR.text.primary}
         iconSurface={COLOR.surface.icon}
          onOpenPortal={onOpenPortal}
        />
      </div>
    </div>
  );
}