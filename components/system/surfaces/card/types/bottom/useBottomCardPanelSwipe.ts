"use client";

/* ==========================================================
   OUTFLO — USE BOTTOM CARD PANEL SWIPE
   File: components/system/surfaces/card/types/bottom/useBottomCardPanelSwipe.ts
   Scope: Own optional horizontal panel swipe behavior for BottomCard
   ========================================================== */

import { useRef, useState } from "react";

type SwipePanelsConfig<T extends string> = {
  active: T | null;
  order: readonly T[];
  onChange: (panel: T) => void;
};

const SWIPE_THRESHOLD_PX = 54;
const VELOCITY_THRESHOLD_PX = 0.45;
const VERTICAL_CANCEL_PX = 36;
const FOLLOW_RESISTANCE = 0.28;

export function useBottomCardPanelSwipe<T extends string>(
  config?: SwipePanelsConfig<T>
) {
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const [followX, setFollowX] = useState(0);

  function resetSwipe() {
    startXRef.current = null;
    startYRef.current = null;
    startTimeRef.current = null;
    setFollowX(0);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!config) return;

    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    startTimeRef.current = performance.now();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!config || startXRef.current === null || startYRef.current === null) {
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;

    if (Math.abs(deltaY) > VERTICAL_CANCEL_PX) {
      setFollowX(0);
      return;
    }

    setFollowX(deltaX * FOLLOW_RESISTANCE);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (
      !config ||
      startXRef.current === null ||
      startYRef.current === null ||
      startTimeRef.current === null
    ) {
      resetSwipe();
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    const elapsedMs = Math.max(1, performance.now() - startTimeRef.current);
    const velocity = Math.abs(deltaX) / elapsedMs;

    if (Math.abs(deltaY) > VERTICAL_CANCEL_PX) {
      resetSwipe();
      return;
    }

    const shouldSwipe =
      Math.abs(deltaX) >= SWIPE_THRESHOLD_PX ||
      velocity >= VELOCITY_THRESHOLD_PX;

    if (!shouldSwipe || !config.active) {
      resetSwipe();
      return;
    }

    const currentIndex = config.order.indexOf(config.active);
    if (currentIndex < 0) {
      resetSwipe();
      return;
    }

    const nextIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
    const nextPanel = config.order[nextIndex];

    if (nextPanel) {
      config.onChange(nextPanel);
    }

    resetSwipe();
  }

  function handlePointerCancel() {
    resetSwipe();
  }

  return {
    panelSwipeStyle: {
      transform: `translateX(${followX}px)`,
      transition:
        followX === 0
          ? "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)"
          : "none",
    } as React.CSSProperties,

    panelSwipeHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
}