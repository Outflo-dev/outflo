"use client";

/* ==========================================================
   OUTFLO — PROFILE SURFACE
   File: components/domains/profile/surfaces/ProfileSurface.tsx
   Scope: Page surface owning portal mount, root layer, scroll, and motion
   Last Updated:
   - ms: 1776222056208
   - iso: 2026-04-15T03:00:56.208Z
   - note: enforce scroll as interaction layer; motion inside scroll
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
        background: "black",
        overflow: "hidden",
      }}
    >
      {/* Scroll owns interaction */}
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          background: "black",
        }}
      >
        {/* Motion is visual only */}
        <Motion show={show} direction={direction}>
          <div
            style={{
              minHeight: "100%",
            }}
          >
            {children}
          </div>
        </Motion>
      </div>
    </div>,
    root
  );
}