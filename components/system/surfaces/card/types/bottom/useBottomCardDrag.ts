"use client";

/* ==========================================================
   OUTFLO — USE BOTTOM CARD DRAG
   File: components/system/surfaces/card/types/bottom/useBottomCardDrag.ts
   Scope: Own panel-aware BottomCard posture and elastic drag behavior
   ========================================================== */

import { useRef, useState } from "react";

/* ------------------------------
   Types
-------------------------------- */
type BottomCardPosture = "compact" | "medium";

type DragConfig = {
  posture: BottomCardPosture;
  targetPosture: BottomCardPosture;
  onChangePosture: (posture: BottomCardPosture) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const EXPAND_THRESHOLD_PX = 56;
const MAX_UP_PX = 72;
const MAX_DOWN_PX = 72;
const COMPACT_UP_RESISTANCE = 0.42;
const MEDIUM_UP_RESISTANCE = 0.32;
const DOWN_RESISTANCE = 0.36;

/* ------------------------------
   Helpers
-------------------------------- */
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/* ------------------------------
   Hook
-------------------------------- */
export function useBottomCardDrag({
  posture,
  targetPosture,
  onChangePosture,
}: DragConfig) {
  const startYRef = useRef<number | null>(null);
  const lastDeltaYRef = useRef(0);

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const canExpand = posture === "compact" && targetPosture === "medium";

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    startYRef.current = event.clientY;
    lastDeltaYRef.current = 0;
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (startYRef.current === null) return;

    const deltaY = event.clientY - startYRef.current;
    lastDeltaYRef.current = deltaY;

    if (deltaY < 0) {
      const clampedUp = clamp(deltaY, -MAX_UP_PX, 0);
      const resistance =
        posture === "compact" ? COMPACT_UP_RESISTANCE : MEDIUM_UP_RESISTANCE;

      setDragY(clampedUp * resistance);
      return;
    }

    const clampedDown = clamp(deltaY, 0, MAX_DOWN_PX);
    setDragY(clampedDown * DOWN_RESISTANCE);
  }

  function handlePointerUp() {
    if (canExpand && lastDeltaYRef.current <= -EXPAND_THRESHOLD_PX) {
      onChangePosture("medium");
    }

    startYRef.current = null;
    lastDeltaYRef.current = 0;
    setDragY(0);
    setIsDragging(false);
  }

  function handlePointerCancel() {
    startYRef.current = null;
    lastDeltaYRef.current = 0;
    setDragY(0);
    setIsDragging(false);
  }

  return {
    dragStyle: {
      transform: `translateY(${dragY}px)`,
      transition: isDragging
        ? "none"
        : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
    } as React.CSSProperties,

    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
}