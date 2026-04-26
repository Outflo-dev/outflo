"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY ACTIONS
   File: app/account/profile/internal/ProfileIdentityActions.tsx
   Scope: Own profile identity action runtime and compose identity pills plus controls sheet
   Last Updated:
   - ms: 1776998105308
   - iso: 2026-04-24T02:35:05.308Z
   - note: add orchestration owner for split identity action row and controls sheet
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useProfileSecretState } from "./profile.secret";
import ProfileIdentityActionsRow from "./ProfileIdentityActionsRow";
import ProfileControlsSheet from "./ProfileControlsSheet";

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
export default function ProfileIdentityActions({
  username,
  logoutHref,
}: Props) {
  const {
    showControls,
    closingControls,
    closeControls,
    updateAvatarMode,
  } = useProfileSecretState();

  return (
    <>
      <ProfileIdentityActionsRow
        username={username}
        logoutHref={logoutHref}
      />

      {showControls ? (
        <ProfileControlsSheet
          closing={closingControls}
          onClose={closeControls}
          onUseImage={() => updateAvatarMode("image")}
          onUseInitial={() => updateAvatarMode("initial")}
        />
      ) : null}
    </>
  );
}