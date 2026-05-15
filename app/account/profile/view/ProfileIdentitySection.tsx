"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY SECTION
   File: app/account/profile/view/ProfileIdentitySection.tsx
   Scope: Render the profile identity lockup with avatar, secret trigger, and compact card actions
   Last Updated:
   - ms: 1778720709456
   - iso: 2026-05-14T01:05:09.456Z
   - note: place identity text beside avatar and compact card actions below avatar row
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ProfileSecretTrigger from "../actions/ProfileSecretTrigger";
import ProfileIdentityActions from "../internal/ProfileIdentityActions";
import Avatar from "@/components/system/primitives/display/avatar/Avatar";
import Text from "@/components/system/primitives/display/type/Text";
import { COLOR } from "@/components/system/primitives/color/color.config";

/* ------------------------------
   Types
-------------------------------- */
type ProfileIdentitySectionProps = {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  onOpenAvatarPanel: () => void;
  onOpenControlsPanel: () => void;
  onOpenDisplayPanel: () => void;
};

/* ------------------------------
   Helpers
-------------------------------- */
function formatUsername(username: string | null) {
  if (!username) return null;

  return username.startsWith("@") ? username : `@${username}`;
}

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentitySection({
  fullName,
  username,
  avatarUrl,
  onOpenAvatarPanel,
  onOpenControlsPanel,
  onOpenDisplayPanel,
}: ProfileIdentitySectionProps) {
  const formattedUsername = formatUsername(username);
  const primaryIdentity = formattedUsername ?? fullName;
  const secondaryIdentity = formattedUsername ? fullName : null;

  return (
    <div
      style={{
        display: "grid",
        rowGap: 18,
        paddingTop: 4,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "104px 1fr",
          alignItems: "center",
          columnGap: 18,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 104,
            height: 104,
          }}
        >
          <button
            type="button"
            aria-label="Edit profile avatar"
            onClick={onOpenAvatarPanel}
            style={{
              width: 99,
              height: 99,
              borderRadius: "50%",
              border: "none",
              padding: 0,
              background: "transparent",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Avatar size="lg" value={fullName} src={avatarUrl} alt={fullName} />
          </button>

          <ProfileSecretTrigger />
        </div>

        <div
          style={{
            minWidth: 0,
            display: "grid",
            rowGap: 3,
          }}
        >
          <Text as="h1" type="display" style={{ color: COLOR.text.primary }}>
            {primaryIdentity}
          </Text>

          {secondaryIdentity ? (
            <Text as="p" type="meta" style={{ color: COLOR.text.secondary }}>
              {secondaryIdentity}
            </Text>
          ) : null}
        </div>
      </div>

      <ProfileIdentityActions
        logoutHref="/logout"
        onOpenAvatarPanel={onOpenAvatarPanel}
        onOpenControlsPanel={onOpenControlsPanel}
        onOpenDisplayPanel={onOpenDisplayPanel}
      />
    </div>
  );
}