/* ==========================================================
   OUTFLO — NAV LAYER
   File: components/NavLayer.tsx
   Scope: Shared layered surface wrapper for back and close navigation behavior
   Last Updated:
   - ms: 1775412646527
   - iso: 2026-04-05T18:10:46.527Z
   - note: introduce reusable layered surface wrapper for global navigation system
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import { ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */

type NavLayerProps = {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
};

/* ------------------------------
   Component
-------------------------------- */

export default function NavLayer({
  children,
  header,
  className = "",
}: NavLayerProps) {
  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      {header ? <div className="w-full">{header}</div> : null}

      <div className="w-full">{children}</div>
    </div>
  );
}