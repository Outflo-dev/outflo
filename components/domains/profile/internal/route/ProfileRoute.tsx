"use client";

/* ==========================================================
   OUTFLO — PROFILE ROUTE (MOTION OWNER)
   File: components/domains/profile/internal/route/ProfileRoute.tsx
   Scope: Own route-level motion state (show, direction) and navigation intent for profile surface
   Last Updated:
   - ms: 1776039946425
   - iso: 2026-04-13T00:25:46.425Z
   - note: establish single motion owner and remove domain motion drift
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import type { ReactNode } from "react";
import ProfileSurface from "@/components/domains/profile/surfaces/ProfileSurface";

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileRoute({
  children,
}: {
  children: ReactNode;
}) {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<"up" | "down">("up");

  /* ------------------------------
     Handlers
  -------------------------------- */

  function handleDismiss() {
    setDirection("down");
    setShow(false);

    window.setTimeout(() => {
      window.history.back();
    }, 260);
  }

  function handlePortal() {
    setDirection("up");
    setShow(false);

    window.setTimeout(() => {
      window.location.href = "/";
    }, 260);
  }

  /* ------------------------------
     Render
  -------------------------------- */

  return (
    <ProfileSurface show={show} direction={direction}>
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
        {children}
      </div>
    </ProfileSurface>
  );
}