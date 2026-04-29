"use client";

/* ==========================================================
   OUTFLO — PROFILE VIEW
   File: app/account/profile/view/ProfileView.tsx
   Scope: Compose the full profile page surface from route-owned view sections
   Last Updated:
   - ms: 1776475194844
   - iso: 2026-04-18T01:19:54.844Z
   - note: align profile view props to controller-owned motion and sheet orchestration
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
import ProfilePhotoPanel from "./ProfilePhotoPanel";
import ProfileControlsPanel from "../internal/ProfileControlsPanel";
import type { ProfileDirection } from "../internal/profile.types";
import { COLOR } from "@/components/system/primitives/color/color.config";
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
type ProfileSheetPanel = "photo" | "controls" | "theme";

type ProfileViewProps = {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  epochMs: number;

  show: boolean;
  direction: ProfileDirection;

  sheetPanel: ProfileSheetPanel | null;
  sheetOpen: boolean;

  onDismiss: () => void;
  onOpenPortal: () => void;
  onOpenPhotoSheet: () => void;
  onOpenControlsSheet: () => void;
  onOpenThemeSheet: () => void;
  onCloseSheet: () => void;
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
  sheetPanel,
  sheetOpen,
  onDismiss,
  onOpenPortal,
  onOpenPhotoSheet,
  onOpenControlsSheet,
  onCloseSheet,
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
                onOpenPhotoSheet={onOpenPhotoSheet}
                onOpenControlsSheet={onOpenControlsSheet}
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

      <BottomCard show={sheetOpen} onClose={onCloseSheet}>
         {sheetPanel === "photo" && <ProfilePhotoPanel />}
         {sheetPanel === "controls" && <ProfileControlsPanel />}
      </BottomCard>
    </>
  );
}