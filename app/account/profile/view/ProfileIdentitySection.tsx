"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY SECTION
   File: app/account/profile/view/ProfileIdentitySection.tsx
   Scope: Render the profile identity block with avatar, name, secret trigger, and identity actions
   Last Updated:
   - ms: 1776998190769
   - iso: 2026-04-24T02:36:30.769Z
   - note: replace ProfileSecretActions with ProfileIdentityActions (no runtime leakage)
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ProfileSecretTrigger from "../actions/ProfileSecretTrigger";
import ProfileIdentityActions from "../internal/ProfileIdentityActions";
import Avatar from "@/components/system/primitives/display/avatar/Avatar";
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import Plus from "@/components/system/primitives/marks/Plus";
import Text from "@/components/system/primitives/display/type/Text";
import { COLOR } from "@/components/system/primitives/color/color.config";

/* ------------------------------
   Types
-------------------------------- */
type ProfileIdentitySectionProps = {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  onOpenPhotoSheet: () => void;
  onOpenControlsSheet: () => void; 
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentitySection({
  fullName,
  username,
  avatarUrl,
  onOpenPhotoSheet,
  onOpenControlsSheet,
}: ProfileIdentitySectionProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingTop: 2,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 92,
          height: 92,
          marginBottom: 2,
        }}
      >
        <button
          type="button"
          aria-label="Edit profile photo"
          onClick={onOpenPhotoSheet}
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: "none",
            padding: 0,
            background: "transparent",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Avatar value={fullName} src={avatarUrl} alt={fullName} />
        </button>

        <ProfileSecretTrigger />

        <IconButton
          onClick={onOpenPhotoSheet}
          ariaLabel="Add a profile photo"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <Plus size={12} />
        </IconButton>
      </div>

      <Text as="h1" type="display" style={{ color: COLOR.text.primary }}>
        {fullName}
      </Text>

      <div style={{ marginTop: -1 }}>
        <ProfileIdentityActions
          username={username}
          logoutHref="/logout"
          onOpenControlsSheet={onOpenControlsSheet}
        />
      </div>
    </div>
  );
}