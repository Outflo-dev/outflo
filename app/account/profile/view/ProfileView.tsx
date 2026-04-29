"use client";

/* ==========================================================
   OUTFLO — PROFILE VIEW
   File: app/account/profile/view/ProfileView.tsx
   Scope: Compose the full profile page surface and profile card panels
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: replace sheet/photo naming with single card panel system
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
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
    >
       <ProfileCardTabs
         activePanel={cardPanel}
         fullName={fullName}
         avatarUrl={avatarUrl}
         onChangePanel={onChangeCardPanel}
        />

        {cardPanel === "avatar" && (
        <ProfileAvatarPanel fullName={fullName} avatarUrl={avatarUrl} />
        )}
        {cardPanel === "controls" && <ProfileControlsPanel />}
        {cardPanel === "theme" && <ProfileThemePanel />}
      </BottomCard>
    </>
  );
}