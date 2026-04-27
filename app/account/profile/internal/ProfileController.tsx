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

export default function ProfileController(props: ProfileRouteProps) {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<ProfileDirection>("up");

  // ✅ NEW — split sheet state
  const [photoSheetOpen, setPhotoSheetOpen] = useState(false);
  const [controlsSheetOpen, setControlsSheetOpen] = useState(false);

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

  // ✅ photo sheet
  function handleOpenPhotoSheet() {
    setPhotoSheetOpen(true);
  }

  function handleClosePhotoSheet() {
    setPhotoSheetOpen(false);
  }

  // ✅ controls sheet
  function handleOpenControlsSheet() {
    setControlsSheetOpen(true);
  }

  function handleCloseControlsSheet() {
    setControlsSheetOpen(false);
  }

  return (
    <AppFrame>
      <ProfileView
        {...props}
        show={show}
        direction={direction}

        // ✅ pass both states
        photoSheetOpen={photoSheetOpen}
        controlsSheetOpen={controlsSheetOpen}

        onDismiss={handleDismiss}
        onOpenPortal={handleOpenPortal}

        onOpenPhotoSheet={handleOpenPhotoSheet}
        onClosePhotoSheet={handleClosePhotoSheet}

        // ✅ new controls handlers
        onOpenControlsSheet={handleOpenControlsSheet}
        onCloseControlsSheet={handleCloseControlsSheet}
      />
    </AppFrame>
  );
}