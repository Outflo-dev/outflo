"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLLER
   File: app/account/profile/internal/ProfileController.tsx
   Scope: Own local profile orchestration, motion state, and card panel state
   Last Updated:
   - ms: 1777481701125
   - iso: 2026-04-29T16:55:01.125Z
   - note: remove stale sheet naming from profile card panel orchestration
   ========================================================== */

import { useState } from "react";
import { MOTION_DURATION_MS } from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";
import ProfileView from "../view/ProfileView";
import type { ProfileDirection, ProfileRouteProps } from "./profile.types";

type ProfileCardPanel = "avatar" | "controls" | "theme";

export default function ProfileController(props: ProfileRouteProps) {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<ProfileDirection>("up");
  const [cardPanel, setCardPanel] = useState<ProfileCardPanel | null>(null);

  function handleDismiss() {
    setDirection("down");
    setShow(false);

    window.setTimeout(() => {
      window.history.back();
    }, MOTION_DURATION_MS);
  }

  function handleOpenPortal() {
    setDirection("up");
    setShow(false);

    window.setTimeout(() => {
      window.location.href = "/";
    }, MOTION_DURATION_MS);
  }

  function handleOpenAvatarPanel() {
    setCardPanel("avatar");
  }

  function handleOpenControlsPanel() {
    setCardPanel("controls");
  }

  function handleChangeCardPanel(panel: ProfileCardPanel) {
    setCardPanel(panel);
  }

  function handleCloseCard() {
    setCardPanel(null);
  }

  return (
    <AppFrame>
      <ProfileView
        {...props}
        show={show}
        direction={direction}
        cardPanel={cardPanel}
        cardOpen={cardPanel !== null}
        onDismiss={handleDismiss}
        onOpenPortal={handleOpenPortal}
        onOpenAvatarPanel={handleOpenAvatarPanel}
        onOpenControlsPanel={handleOpenControlsPanel}
        onChangeCardPanel={handleChangeCardPanel}
        onCloseCard={handleCloseCard}
      />
    </AppFrame>
  );
}