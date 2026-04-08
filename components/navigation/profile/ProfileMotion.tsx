"use client";

/* ==========================================================
   OUTFLO — PROFILE MOTION
   File: components/navigation/profile/ProfileMotion.tsx
   Scope: Animate profile dismissal down and portal exit up without changing page structure
   Last Updated:
   - ms: 1775666271526
   - iso: 2026-04-08T16:37:51.526Z
   - note: add local motion wrapper for profile header exit actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileMotion({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [closingDown, setClosingDown] = useState(false);
  const [leavingUp, setLeavingUp] = useState(false);

  function handlePortal(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setLeavingUp(true);

    window.setTimeout(() => {
      router.push("/");
    }, 180);
  }

  function handleBack() {
    setClosingDown(true);

    window.setTimeout(() => {
      window.history.back();
    }, 180);
  }

  return (
    <div
      style={{
        transform: closingDown
          ? "translateY(100%)"
          : leavingUp
          ? "translateY(-100%)"
          : "translateY(0)",
        transition: "transform 180ms ease",
        willChange: "transform",
      }}
    >
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;

          if (target.closest('a[href="/"]')) {
            handlePortal(e);
            return;
          }

          if (target.closest('a[href="javascript:history.back()"]')) {
            e.preventDefault();
            handleBack();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}