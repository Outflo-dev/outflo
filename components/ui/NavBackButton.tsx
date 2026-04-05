/* ==========================================================
   OUTFLO — NAV BACK BUTTON
   File: components/ui/NavBackButton.tsx
   Scope: Reusable back navigation button for layered and drilldown surfaces
   Last Updated:
   - ms: 1775412646527
   - iso: 2026-04-05T18:10:46.527Z
   - note: introduce reusable back button for global navigation system
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

/* ------------------------------
   Types
-------------------------------- */

type NavBackButtonProps = {
  children?: ReactNode;
  className?: string;
};

/* ------------------------------
   Component
-------------------------------- */

export default function NavBackButton({
  children = "Back",
  className = "",
}: NavBackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={className}
    >
      {children}
    </button>
  );
}