"use client";

/* ==========================================================
   OUTFLO — PROFILE ROUTE (MOTION OWNER)
   ========================================================== */

import { useState } from "react";
import { MOTION_DURATION_MS } from "@/components/system/primitives/motion/Motion";
import ProfileController from "../controller/ProfileController";

export default function ProfileRoute({
  fullName,
  username,
  avatarUrl,
  initial,
  epochMs,
}: {
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  initial: string;
  epochMs: number;
}) {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<"up" | "down">("up");

  function handleDismiss() {
    setDirection("down");
    setShow(false);

    window.setTimeout(() => {
      window.history.back();
    }, MOTION_DURATION_MS);
  }

  function handlePortal() {
    setDirection("up");
    setShow(false);

    window.setTimeout(() => {
      window.location.href = "/";
    }, MOTION_DURATION_MS);
  }

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;

        if (target.closest("[data-profile-dismiss]")) {
          e.preventDefault();
          handleDismiss();
          return;
        }

        if (target.closest('a[href="/"]')) {
          e.preventDefault();
          handlePortal();
        }
      }}
    >
      <ProfileController
        show={show}
        direction={direction}
        fullName={fullName}
        username={username}
        avatarUrl={avatarUrl}
        initial={initial}
        epochMs={epochMs}
      />
    </div>
  );
}