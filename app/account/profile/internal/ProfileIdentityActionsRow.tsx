"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY ACTIONS ROW
   File: app/account/profile/internal/ProfileIdentityActionsRow.tsx
   Scope: Layout owner for profile identity pills (username, controls, logout reveal)
   Last Updated:
   - ms: 1776994863515
   - iso: 2026-04-24T01:41:03.515Z
   - note: extract layout and secret runtime from legacy ProfileSecretActions
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
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentityActionsRow({
  username,
  logoutHref,
}: Props) {
  const {
    showSecret,
    revealed,
    openControls,
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

      <ProfileControlsPill
        onClick={openControls}
      />

      <ProfileLogoutReveal
        show={showSecret}
        revealed={revealed}
        href={logoutHref}
      />
    </div>
  );
}