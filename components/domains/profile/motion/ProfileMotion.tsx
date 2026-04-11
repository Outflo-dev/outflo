"use client";

/* ==========================================================
   OUTFLŌ — PROFILE MOTION
   File: components/navigation/profile/ProfileMotion.tsx
   Scope: Animate profile surface exit (up/down) and expose direction state for UI micro-motion
   Last Updated:
   - ms: 1775692290000
   - iso: 2026-04-08T19:51:30.000Z
   - note: separate surface motion from header micro-motion and align to system ownership model
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { MouseEvent, ReactNode } from "react";
import { useState, useEffect } from "react";
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

  const direction = closingDown ? "down" : leavingUp ? "up" : "idle";

/* ------------------------------
   Effects — Header Micro Motion
-------------------------------- */
useEffect(() => {
  const root = document.querySelector("[data-profile-direction]");
  if (!root) return;

  const down = root.querySelectorAll('[data-motion="down"]');
  const up = root.querySelectorAll('[data-motion="up"]');

  down.forEach((el) => {
    (el as HTMLElement).style.transform =
      direction === "down" ? "translateY(14px)" : "translateY(0)";
  });

  up.forEach((el) => {
    (el as HTMLElement).style.transform =
      direction !== "idle" ? "translateY(-12px)" : "translateY(0)";
  });
}, [direction]);

return (
  <div
    style={{
      transform: closingDown
        ? "translateY(100%)"
        : leavingUp
        ? "translateY(-100%)"
        : "translateY(0)",
      transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "transform",
    }}
  >
    <div
      data-profile-direction={direction}
      onClick={(e) => {
        const target = e.target as HTMLElement;

        if (target.closest('a[href="/"]')) {
          handlePortal(e);
          return;
        }

        if (target.closest("[data-profile-dismiss]")) {
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