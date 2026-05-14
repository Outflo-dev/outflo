"use client";

/* ==========================================================
   OUTFLO — PROFILE VIEW
   File: app/account/profile/view/ProfileView.tsx
   Scope: Compose the full profile page surface and profile card panels
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: delegate avatar crop/save orchestration to profile avatar hook
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Motion from "@/components/system/primitives/motion/Motion";
import { COLOR } from "@/components/system/primitives/color/color.config";
import MediaCropper from "@/components/system/surfaces/media-crop/MediaCropper";

import ProfileHeader from "./ProfileHeader";
import ProfileIdentitySection from "./ProfileIdentitySection";
import ProfileAccountSection from "./ProfileAccountSection";
import ProfileEnvironmentSection from "./ProfileEnvironmentSection";
import ProfileSocialSection from "./ProfileSocialSection";
import ProfileEpochSection from "./ProfileEpochSection";
import ProfileFooter from "./ProfileFooter";

import ProfileCard from "../internal/card/ProfileCard";
import { useProfileAvatarCrop } from "../internal/avatar/useProfileAvatarCrop";
import { PROFILE_ACCOUNT_ITEMS } from "../internal/profile.sections";
import type {
  ProfileCardPanel,
  ProfileDirection,
} from "../internal/profile.types";

/* ------------------------------
   Constants
-------------------------------- */
const UI = {
  pageBottom: 40,
  sectionGap: 24,
} as const;

/* ------------------------------
   Types
-------------------------------- */
type ProfileViewProps = {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  epochMs: number;

  show: boolean;
  direction: ProfileDirection;

  cardPanel: ProfileCardPanel | null;
  cardOpen: boolean;

  onDismiss: () => void;
  onOpenPortal: () => void;
  onOpenAvatarPanel: () => void;
  onOpenControlsPanel: () => void;
  onChangeCardPanel: (panel: ProfileCardPanel) => void;
  onCloseCard: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileView({
  fullName,
  username,
  avatarUrl,
  epochMs,
  show,
  direction,
  cardPanel,
  cardOpen,
  onDismiss,
  onOpenPortal,
  onOpenAvatarPanel,
  onOpenControlsPanel,
  onChangeCardPanel,
  onCloseCard,
}: ProfileViewProps) {
  const {
    cropSourceUrl,
    handleSelectAvatarFile,
    handleCancelCrop,
    handleSaveCrop,
  } = useProfileAvatarCrop();

  return (
    <>
      <Motion show={show} direction={direction}>
        <main
          style={{
            minHeight: "100vh",
            paddingTop: 0,
            paddingBottom: UI.pageBottom,
            background: COLOR.surface.base,
          }}
        >
          <div style={{ width: "100%" }}>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <ProfileHeader
                onDismiss={onDismiss}
                onOpenPortal={onOpenPortal}
              />

              <ProfileIdentitySection
                fullName={fullName}
                username={username}
                avatarUrl={avatarUrl}
                onOpenAvatarPanel={onOpenAvatarPanel}
                onOpenControlsPanel={onOpenControlsPanel}
              />
            </section>

            <ProfileAccountSection
              items={PROFILE_ACCOUNT_ITEMS}
              sectionGap={UI.sectionGap}
            />

            <ProfileEnvironmentSection />

            <ProfileSocialSection sectionGap={UI.sectionGap} />

            <ProfileEpochSection
              epochMs={epochMs}
              sectionGap={UI.sectionGap}
            />

            <ProfileFooter />
          </div>
        </main>
      </Motion>

      <ProfileCard
        show={cardOpen}
        activePanel={cardPanel}
        fullName={fullName}
        avatarUrl={avatarUrl}
        onClose={onCloseCard}
        onChangePanel={onChangeCardPanel}
        onSelectAvatarFile={handleSelectAvatarFile}
      />

      {cropSourceUrl ? (
        <MediaCropper
          title="Adjust photo"
          sourceUrl={cropSourceUrl}
          shape="round"
          onCancel={handleCancelCrop}
          onSave={handleSaveCrop}
        />
      ) : null}
    </>
  );
}