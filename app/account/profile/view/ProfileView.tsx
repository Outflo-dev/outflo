"use client";

/* ==========================================================
   OUTFLO — PROFILE VIEW
   File: app/account/profile/view/ProfileView.tsx
   Scope: Compose the full profile page surface and profile card panels
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: lift avatar crop surface outside bottom card
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import Motion from "@/components/system/primitives/motion/Motion";
import ProfileHeader from "./ProfileHeader";
import ProfileIdentitySection from "./ProfileIdentitySection";
import ProfileAccountSection from "./ProfileAccountSection";
import ProfileEnvironmentSection from "./ProfileEnvironmentSection";
import ProfileOrbitSection from "./ProfileOrbitSection";
import ProfileSocialSection from "./ProfileSocialSection";
import ProfileEpochSection from "./ProfileEpochSection";
import ProfileFooter from "./ProfileFooter";
import ProfileAvatarPanel from "../internal/avatar/ProfileAvatarPanel";
import ProfileControlsPanel from "../internal/ProfileControlsPanel";
import ProfileThemePanel from "../internal/ProfileThemePanel";
import type { ProfileDirection } from "../internal/profile.types";
import { COLOR } from "@/components/system/primitives/color/color.config";
import ProfileCardTabs from "../internal/ProfileCardTabs";
import BottomCard from "@/components/system/surfaces/card/types/bottom/BottomCard";
import MediaCropper from "@/components/system/surfaces/media-crop/MediaCropper";
import type { MediaCropResult } from "@/components/system/surfaces/media-crop/media-crop.types";

/* ------------------------------
   Constants
-------------------------------- */
const HUB_ITEMS = [
  { label: "Account", href: "/account/profile/account" },
  { label: "Environment", href: "/account/profile/environment" },
  { label: "Money", href: "/account/profile/money" },
  { label: "Privacy", href: "/account/profile/privacy" },
  { label: "Notifications", href: "/account/profile/notifications" },
  { label: "Records", href: "/account/profile/records" },
  { label: "Support", href: "/account/profile/support" },
] as const;

const UI = {
  pageBottom: 40,
  sectionGap: 24,
} as const;

/* ------------------------------
   Types
-------------------------------- */
type ProfileCardPanel = "avatar" | "controls" | "theme";

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
  const router = useRouter();
  const [cropSourceUrl, setCropSourceUrl] = useState<string | null>(null);

  function handleSelectAvatarFile(file: File) {
    if (cropSourceUrl) {
      URL.revokeObjectURL(cropSourceUrl);
    }

    setCropSourceUrl(URL.createObjectURL(file));
  }

  function handleCancelCrop() {
    if (cropSourceUrl) {
      URL.revokeObjectURL(cropSourceUrl);
    }

    setCropSourceUrl(null);
  }

  async function handleSaveCrop(result: MediaCropResult) {
    const supabase = supabaseBrowser();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Unable to load authenticated user.", userError);
      return;
    }

    const filePath = `${user.id}/avatar-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, result.blob, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Unable to upload avatar.", uploadError);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar_url: data.publicUrl,
        avatar_mode: "image",
      }),
    });

    if (!response.ok) {
      console.error("Unable to save avatar.", await response.json());
      return;
    }

    if (cropSourceUrl) {
      URL.revokeObjectURL(cropSourceUrl);
    }

    URL.revokeObjectURL(result.objectUrl);

    setCropSourceUrl(null);
    router.refresh();
  }

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
              items={HUB_ITEMS}
              sectionGap={UI.sectionGap}
            />

            <ProfileEnvironmentSection />

            <ProfileOrbitSection sectionGap={UI.sectionGap} />

            <ProfileSocialSection sectionGap={UI.sectionGap} />

            <ProfileEpochSection
              epochMs={epochMs}
              sectionGap={UI.sectionGap}
            />

            <ProfileFooter />
          </div>
        </main>
      </Motion>

      <BottomCard
        show={cardOpen}
        onClose={onCloseCard}
        swipePanels={{
          active: cardPanel,
          order: ["avatar", "controls", "theme"] as const,
          onChange: onChangeCardPanel,
        }}
        panelPostures={{
          avatar: "compact",
          controls: "medium",
          theme: "medium",
        }}
      >
        <ProfileCardTabs
          activePanel={cardPanel}
          fullName={fullName}
          avatarUrl={avatarUrl}
          onChangePanel={onChangeCardPanel}
        />

        {cardPanel === "avatar" && (
          <ProfileAvatarPanel
            fullName={fullName}
            avatarUrl={avatarUrl}
            onSelectAvatarFile={handleSelectAvatarFile}
          />
        )}
        {cardPanel === "controls" && <ProfileControlsPanel />}
        {cardPanel === "theme" && <ProfileThemePanel />}
      </BottomCard>

      {cropSourceUrl && (
        <MediaCropper
          title="Adjust photo"
          sourceUrl={cropSourceUrl}
          shape="round"
          onCancel={handleCancelCrop}
          onSave={handleSaveCrop}
        />
      )}
    </>
  );
}