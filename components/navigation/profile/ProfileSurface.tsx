"use client";

/* ==========================================================
   OUTFLŌ — PROFILE SURFACE
   File: components/navigation/profile/ProfileSurface.tsx
   Scope: Mount profile UI into shell layer root as a true overlay surface
   Last Updated:
   - ms: 1775672111393
   - iso: 2026-04-08T18:15:11.393Z
   - note: convert profile from route-rendered page to shell-layer surface via portal
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import ProfileMotion from "@/components/navigation/profile/ProfileMotion";

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileSurface({
  children,
}: {
  children: ReactNode;
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
        pointerEvents: "auto",
      }}
    >
      <ProfileMotion>{children}</ProfileMotion>
    </div>,
    root
  );
}