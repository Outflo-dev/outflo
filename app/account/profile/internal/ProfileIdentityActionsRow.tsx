"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY ACTIONS ROW
   File: app/account/profile/internal/ProfileIdentityActionsRow.tsx
   Scope: Layout owner for profile identity pills
   Last Updated:
   - ms: 1776994863515
   - iso: 2026-04-24T01:41:03.515Z
   - note: route controls pill through controller-owned sheet state
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useProfileSecretState } from "./profile.secret";
import ProfileUsernamePill from "./ProfileUsernamePill";
import ProfileControlsPill from "./ProfileControlsPill";
import ProfileLogoutReveal from "./ProfileLogoutReveal";

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
export default function ProfileIdentityActionsRow({
  username,
  logoutHref,
  onOpenControlsSheet,
}: Props) {
  const {
    showSecret,
    revealed,
    resetHideTimer,
  } = useProfileSecretState();

  return (
    <div
      onMouseEnter={showSecret ? resetHideTimer : undefined}
      onPointerDown={showSecret ? resetHideTimer : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <ProfileUsernamePill username={username} />

      <ProfileControlsPill onClick={onOpenControlsSheet} />

      <ProfileLogoutReveal
        show={showSecret}
        revealed={revealed}
        href={logoutHref}
      />
    </div>
  );
}