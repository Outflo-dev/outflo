"use client";

/* ==========================================================
   OUTFLO — PROFILE CONTROLLER
   File: app/account/profile/internal/ProfileController.tsx
   Scope: Own local profile orchestration, motion state, and sheet state
   Last Updated:
   - ms: 1776471084070
   - iso: 2026-04-18T00:11:24.070Z
   - note: consolidated route logic and state into single controller
   ========================================================== */

import { useState } from "react";
import { MOTION_DURATION_MS } from "@/components/system/primitives/motion/Motion";
import ProfileView from "../view/ProfileView";
import type { ProfileDirection, ProfileRouteProps } from "./profile.types";

export default function ProfileController(props: ProfileRouteProps) {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<ProfileDirection>("up");
  const [sheetOpen, setSheetOpen] = useState(false);

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
    setSheetOpen(true);
  }

  function handleClosePhotoSheet() {
    setSheetOpen(false);
  }

  return (
    <ProfileView
      {...props}
      show={show}
      direction={direction}
      sheetOpen={sheetOpen}
      onDismiss={handleDismiss}
      onOpenPortal={handleOpenPortal}
      onOpenPhotoSheet={handleOpenPhotoSheet}
      onClosePhotoSheet={handleClosePhotoSheet}
    />
  );
}