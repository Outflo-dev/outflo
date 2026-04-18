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

/* ------------------------------
   Types
-------------------------------- */
type ProfileHeaderProps = {
  textPrimary: string;
  iconSurface: string;
  onDismiss: () => void;
  onOpenPortal: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileHeader({
  textPrimary,
  iconSurface,
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
        background: "black",
        marginLeft: -8,
        marginRight: -8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 12,
        marginBottom: 6,
      }}
    >
      <CloseProfileAction
        textPrimary={textPrimary}
        iconSurface={iconSurface}
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
          textPrimary={textPrimary}
          iconSurface={iconSurface}
        />

        <OpenPortalAction
          textPrimary={textPrimary}
          iconSurface={iconSurface}
          onOpenPortal={onOpenPortal}
        />
      </div>
    </div>
  );
}