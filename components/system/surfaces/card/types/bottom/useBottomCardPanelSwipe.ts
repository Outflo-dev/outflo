"use client";

/* ==========================================================
   OUTFLO — USE BOTTOM CARD PANEL SWIPE
   File: components/system/surfaces/card/types/bottom/useBottomCardPanelSwipe.ts
   Scope: Own optional horizontal panel swipe behavior for BottomCard
   ========================================================== */

import { useRef } from "react";

type SwipePanelsConfig<T extends string> = {
  active: T | null;
  order: readonly T[];
  onChange: (panel: T) => void;
};

const SWIPE_THRESHOLD_PX = 48;
const VERTICAL_CANCEL_PX = 36;

export function useBottomCardPanelSwipe<T extends string>(
  config?: SwipePanelsConfig<T>
) {
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!config) return;

    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!config || startXRef.current === null || startYRef.current === null) {
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;

    startXRef.current = null;
    startYRef.current = null;

    if (Math.abs(deltaY) > VERTICAL_CANCEL_PX) return;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (!config.active) return;

    const currentIndex = config.order.indexOf(config.active);
    if (currentIndex < 0) return;

    const nextIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
    const nextPanel = config.order[nextIndex];

    if (nextPanel) {
      config.onChange(nextPanel);
    }
  }

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
  };
}