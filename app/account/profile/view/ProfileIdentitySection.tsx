"use client";

/* ==========================================================
   OUTFLO — PROFILE IDENTITY SECTION
   File: app/account/profile/view/ProfileIdentitySection.tsx
   Scope: Render the profile identity block with avatar, name, secret trigger, and secret actions
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: tighten identity spacing after removing card surface while preserving controller-owned photo sheet behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ProfileSecretTrigger from "../actions/ProfileSecretTrigger";
import ProfileSecretActions from "../internal/ProfileSecretActions";
import Avatar from "@/components/system/primitives/display/avatar/Avatar";

/* ------------------------------
   Types
-------------------------------- */
type ProfileIdentitySectionProps = {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  textPrimary: string;
  onOpenPhotoSheet: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileIdentitySection({
  fullName,
  username,
  avatarUrl,
  textPrimary,
  onOpenPhotoSheet,
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
  <Avatar
    value={fullName}
    src={avatarUrl}
    alt={fullName}
  />
</button>

        <ProfileSecretTrigger />

        <button
          type="button"
          aria-label="Add a profile photo"
          onClick={onOpenPhotoSheet}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 30,
            height: 30,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            color: textPrimary,
            background: "#111111",
            border: "1px solid #000",
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1,
            zIndex: 1,
            cursor: "pointer",
            padding: 0,
          }}
        >
          +
        </button>
      </div>

      <h1
        style={{
          margin: 0,
          color: textPrimary,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: -0.8,
          lineHeight: 0.96,
        }}
      >
        {fullName}
      </h1>

      <div style={{ marginTop: -1 }}>
        <ProfileSecretActions
          username={username}
          logoutHref="/logout"
          textPrimary={textPrimary}
        />
      </div>
    </div>
  );
}