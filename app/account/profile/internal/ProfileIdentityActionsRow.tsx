"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY ACTIONS ROW
   File: app/account/profile/internal/ProfileIdentityActionsRow.tsx
   Scope: Layout owner for profile identity pills
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: remove stale sheet naming → controls panel
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
  onOpenControlsPanel: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentityActionsRow({
  username,
  logoutHref,
  onOpenControlsPanel,
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

      <ProfileControlsPill onClick={onOpenControlsPanel} />

      <ProfileLogoutReveal
        show={showSecret}
        revealed={revealed}
        href={logoutHref}
      />
    </div>
  );
}