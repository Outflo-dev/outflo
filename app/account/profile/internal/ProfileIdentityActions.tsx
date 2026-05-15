"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY ACTIONS
   File: app/account/profile/internal/ProfileIdentityActions.tsx
   Scope: Pass profile identity action handlers into the identity action row
   Last Updated:
   - ms: 1778720709456
   - iso: 2026-05-14T01:05:09.456Z
   - note: support compact avatar controls and display card entry actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ProfileIdentityActionsRow from "./ProfileIdentityActionsRow";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  logoutHref: string;
  onOpenAvatarPanel: () => void;
  onOpenControlsPanel: () => void;
  onOpenDisplayPanel: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentityActions({
  logoutHref,
  onOpenAvatarPanel,
  onOpenControlsPanel,
  onOpenDisplayPanel,
}: Props) {
  return (
    <ProfileIdentityActionsRow
      logoutHref={logoutHref}
      onOpenAvatarPanel={onOpenAvatarPanel}
      onOpenControlsPanel={onOpenControlsPanel}
      onOpenDisplayPanel={onOpenDisplayPanel}
    />
  );
}