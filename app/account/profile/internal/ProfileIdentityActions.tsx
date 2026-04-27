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
  onOpenControlsSheet: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentityActions({
  username,
  logoutHref,
  onOpenControlsSheet,
}: Props) {
  return (
    <ProfileIdentityActionsRow
      username={username}
      logoutHref={logoutHref}
      onOpenControlsSheet={onOpenControlsSheet}
    />
  );
}