/* ==========================================================
   OUTFLO — NAV CLOSE BUTTON
   File: components/ui/NavCloseButton.tsx
   Scope: Return to origin route using navigation origin param
   Last Updated:
   - ms: 1775412646527
   - iso: 2026-04-05T18:10:46.527Z
   - note: introduce close navigation behavior using origin resolution
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { resolveClose } from "@/lib/navigation/navigation";

/* ------------------------------
   Types
-------------------------------- */

type NavCloseButtonProps = {
  children?: ReactNode;
  className?: string;
  fallback?: string;
};

/* ------------------------------
   Component
-------------------------------- */

export default function NavCloseButton({
  children = "Close",
  className = "",
  fallback = "/app/home",
}: NavCloseButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    const target = resolveClose(searchParams, fallback);
    router.push(target);
  };

  return (
    <button
      type="button"
      onClick={handleClose}
      className={className}
    >
      {children}
    </button>
  );
}