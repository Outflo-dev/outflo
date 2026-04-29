"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLLER
   File: app/account/profile/internal/ProfileController.tsx
   Scope: Own local profile orchestration, motion state, and sheet state
   ========================================================== */

import { useState } from "react";
import { MOTION_DURATION_MS } from "@/components/system/primitives/motion/Motion";
import ProfileView from "../view/ProfileView";
import type { ProfileDirection, ProfileRouteProps } from "./profile.types";
import AppFrame from "@/components/system/shell/app/AppFrame";

type ProfileSheetPanel = "photo" | "controls" | "theme";

export default function ProfileController(props: ProfileRouteProps) {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<ProfileDirection>("up");
  const [sheetPanel, setSheetPanel] = useState<ProfileSheetPanel | null>(null);

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

  function handleOpenPhotoSheet() {
    setSheetPanel("photo");
  }

  function handleOpenControlsSheet() {
    setSheetPanel("controls");
  }

  function handleOpenThemeSheet() {
    setSheetPanel("theme");
  }

  function handleCloseSheet() {
    setSheetPanel(null);
  }

  return (
    <AppFrame>
      <ProfileView
        {...props}
        show={show}
        direction={direction}
        sheetPanel={sheetPanel}
        sheetOpen={sheetPanel !== null}
        onDismiss={handleDismiss}
        onOpenPortal={handleOpenPortal}
        onOpenPhotoSheet={handleOpenPhotoSheet}
        onOpenControlsSheet={handleOpenControlsSheet}
        onOpenThemeSheet={handleOpenThemeSheet}
        onCloseSheet={handleCloseSheet}
      />
    </AppFrame>
  );
}