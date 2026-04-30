"use client";

/* ==========================================================
   OUTFLO — PROFILE CARD
   File: app/account/profile/internal/card/ProfileCard.tsx
   Scope: Compose Profile-owned card panels inside reusable BottomCardFrame
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BottomCardFrame from "@/components/system/surfaces/card/types/bottom/BottomCardFrame";
import ProfileCardTabs from "../ProfileCardTabs";
import ProfileAvatarPanel from "../avatar/ProfileAvatarPanel";
import ProfileControlsPanel from "../ProfileControlsPanel";
import ProfileThemePanel from "../ProfileThemePanel";
import ProfileCardHandle from "./ProfileCardHandle";
import ProfileCardPanelViewport from "./ProfileCardPanelViewport";
import ProfileCardPanelTrack from "./ProfileCardPanelTrack";
import ProfileCardPanelSlot from "./ProfileCardPanelSlot";
import { APP_SHELL } from "@/components/system/shell/app/app-shell.constants";
import { useProfileCardPanelSwipe } from "./useProfileCardPanelSwipe";
import { useBottomCardScrollLock } from "@/components/system/surfaces/card/types/bottom/useBottomCardScrollLock";

/* ------------------------------
   Types
-------------------------------- */
type ProfileCardPanel = "avatar" | "controls" | "theme";

type Props = {
    show: boolean;
    activePanel: ProfileCardPanel | null;
    fullName: string;
    avatarUrl: string | null;
    onClose: () => void;
    onChangePanel: (panel: ProfileCardPanel) => void;
    onSelectAvatarFile: (file: File) => void;
};

const WRAP_STYLE: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 120,
    overflow: "hidden",
    overscrollBehavior: "contain",
};

const BACKDROP_STYLE: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    border: 0,
    margin: 0,
    padding: 0,
    background: "var(--bottom-card-backdrop)",
    pointerEvents: "auto",
};

const FRAME_WRAP_STYLE: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: APP_SHELL.maxWidth,
    margin: "0 auto",
    paddingLeft: "env(safe-area-inset-left)",
    paddingRight: "env(safe-area-inset-right)",
    boxSizing: "border-box",
};


/* ------------------------------
   Component
-------------------------------- */
export default function ProfileCard({
    show,
    activePanel,
    fullName,
    avatarUrl,
    onClose,
    onChangePanel,
    onSelectAvatarFile,
}: Props) {
    const { panelSwipeHandlers } = useProfileCardPanelSwipe({
        activePanel,
        onChangePanel,
    });

    useBottomCardScrollLock(show);

    if (!show) return null;

    return (
        <div style={WRAP_STYLE}>
            <button
                type="button"
                aria-label="Close profile card"
                onClick={onClose}
                style={BACKDROP_STYLE}
            />

            <div style={FRAME_WRAP_STYLE}>
                <BottomCardFrame height="var(--bottom-card-height-compact)">
                    <ProfileCardHandle />

                    <ProfileCardTabs
                        activePanel={activePanel}
                        fullName={fullName}
                        avatarUrl={avatarUrl}
                        onChangePanel={onChangePanel}
                    />

                    <ProfileCardPanelViewport swipeHandlers={panelSwipeHandlers}>
                        <ProfileCardPanelTrack activePanel={activePanel}>
                            <ProfileCardPanelSlot>
                                <ProfileAvatarPanel
                                    fullName={fullName}
                                    avatarUrl={avatarUrl}
                                    onSelectAvatarFile={onSelectAvatarFile}
                                />
                            </ProfileCardPanelSlot>

                            <ProfileCardPanelSlot>
                                <ProfileControlsPanel />
                            </ProfileCardPanelSlot>

                            <ProfileCardPanelSlot>
                                <ProfileThemePanel />
                            </ProfileCardPanelSlot>
                        </ProfileCardPanelTrack>
                    </ProfileCardPanelViewport>
                </BottomCardFrame>
            </div>
        </div>
    );
}