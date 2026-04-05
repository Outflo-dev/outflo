/* ==========================================================
   OUTFLO — NAV SHELL
   File: components/NavShell.tsx
   Scope: Global navigation shell controlling depth and bottom nav visibility
   Last Updated:
   - ms: 1775412646527
   - iso: 2026-04-05T18:10:46.527Z
   - note: introduce shell-level nav visibility based on depth
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { getDepthFromPath, shouldShowNav } from "@/lib/navigation/navigation";

/* ------------------------------
   Types
-------------------------------- */

type NavShellProps = {
  children: ReactNode;
  nav?: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */

export default function NavShell({ children, nav }: NavShellProps) {
  const pathname = usePathname();

  const depth = getDepthFromPath(pathname);
  const showNav = shouldShowNav(depth);

  return (
    <div className="relative w-full">
      {/* --- Content --- */}
      <div className="w-full">{children}</div>

      {/* --- Bottom Nav --- */}
      {showNav && nav ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
          <div className="w-full max-w-[640px] px-4 pb-4">{nav}</div>
        </div>
      ) : null}
    </div>
  );
}