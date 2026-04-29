"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY ACTIONS
   ========================================================== */

import ProfileIdentityActionsRow from "./ProfileIdentityActionsRow";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
  username: string | null;
  logoutHref: string;
  onOpenControlsPanel: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentityActions({
  username,
  logoutHref,
  onOpenControlsPanel,
}: Props) {
  return (
    <ProfileIdentityActionsRow
      username={username}
      logoutHref={logoutHref}
      onOpenControlsPanel={onOpenControlsPanel}
    />
  );
}