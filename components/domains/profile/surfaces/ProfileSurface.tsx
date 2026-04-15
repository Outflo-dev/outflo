"use client";

/* ==========================================================
   OUTFLŌ — PROFILE SURFACE
   File: components/domains/profile/surfaces/ProfileSurface.tsx
   Scope: Page surface owning portal mount, root layer, scroll, and motion
   Last Updated:
   - ms: 1776181621000
   - iso: 2026-04-14T15:47:01.000Z
   - note: strip controller + overlay ownership; enforce pure page surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import Motion from "@/components/system/primitives/motion/Motion";

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSurface({
  children,
  show,
  direction,
}: {
  children: ReactNode;
  show: boolean;
  direction: "up" | "down";
}) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.getElementById("surface-layer-root"));
  }, []);

  if (!root) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: "auto",
        background: "black",
        overflow: "hidden",
      }}
    >
      <Motion show={show} direction={direction}>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            background: "black",
          }}
        >
          <div
            style={{
              minHeight: "100%",
            }}
          >
            {children}
          </div>
        </div>
      </Motion>
    </div>,
    root
  );
}