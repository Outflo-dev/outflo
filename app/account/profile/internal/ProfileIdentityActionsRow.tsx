"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY ACTIONS ROW
   File: app/account/profile/internal/ProfileIdentityActionsRow.tsx
   Scope: Layout owner for compact profile identity card entry actions
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: replace local display sun with shared SunMark
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import SunMark from "@/components/system/primitives/marks/icons/SunMark";
import { COLOR } from "@/components/system/primitives/color/color.config";
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import PillButton from "@/components/system/shell/buttons/types/pill/PillButton";

import { useProfileSecretState } from "./profile.secret";
import ProfileLogoutReveal from "./ProfileLogoutReveal";

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
   Constants
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  paddingTop: 2,
};

const EDIT_PILL_STYLE: CSSProperties = {
  minHeight: 34,
  padding: "0 15px",
};

const ICON_BUTTON_STYLE: CSSProperties = {
  width: 34,
  height: 34,
  background: "transparent",
  color: COLOR.text.primary,
};

/* ------------------------------
   Icons
-------------------------------- */
function MoreIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="4.5" cy="9" r="1" />
      <circle cx="9" cy="9" r="1" />
      <circle cx="13.5" cy="9" r="1" />
    </svg>
  );
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentityActionsRow({
  logoutHref,
  onOpenAvatarPanel,
  onOpenControlsPanel,
  onOpenDisplayPanel,
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
      style={ROOT_STYLE}
    >
      <PillButton
        variant="soft"
        onClick={onOpenAvatarPanel}
        ariaLabel="Edit profile avatar"
        style={EDIT_PILL_STYLE}
      >
        <Text type="pill" style={{ color: COLOR.text.primary }}>
          Edit
        </Text>
      </PillButton>

      <IconButton
        ariaLabel="Open profile controls"
        onClick={onOpenControlsPanel}
        style={ICON_BUTTON_STYLE}
      >
        <MoreIcon />
      </IconButton>

      <IconButton
        ariaLabel="Open display settings"
        onClick={onOpenDisplayPanel}
        style={ICON_BUTTON_STYLE}
      >
        <SunMark />
      </IconButton>

      <ProfileLogoutReveal
        show={showSecret}
        revealed={revealed}
        href={logoutHref}
      />
    </div>
  );
}