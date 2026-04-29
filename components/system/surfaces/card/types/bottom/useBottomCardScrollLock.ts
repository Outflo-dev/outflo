"use client";

/* ==========================================================
   OUTFLO — USE BOTTOM CARD SCROLL LOCK
   File: components/system/surfaces/card/types/bottom/useBottomCardScrollLock.ts
   Scope: Lock document scroll while BottomCard is open
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect } from "react";

/* ------------------------------
   Hook
-------------------------------- */
export function useBottomCardScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyLeft = document.body.style.left;
    const originalBodyRight = document.body.style.right;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.left = originalBodyLeft;
      document.body.style.right = originalBodyRight;
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);
}