"use client";

/* ==========================================================
   OUTFLO — USE BOTTOM CARD DRAG
   File: components/system/surfaces/card/types/bottom/useBottomCardDrag.ts
   Scope: Own BottomCard drag-to-close gesture behavior
   ========================================================== */

import { useRef, useState } from "react";

/* ------------------------------
   Constants
-------------------------------- */
const CLOSE_THRESHOLD_PX = 96;

/* ------------------------------
   Hook
-------------------------------- */
export function useBottomCardDrag(onClose: () => void) {
  const startYRef = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    startYRef.current = event.clientY;
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (startYRef.current === null) return;

    const nextY = Math.max(0, event.clientY - startYRef.current);
    setDragY(nextY);
  }

  function handlePointerUp() {
    if (dragY >= CLOSE_THRESHOLD_PX) {
      onClose();
    }

    startYRef.current = null;
    setDragY(0);
    setIsDragging(false);
  }

  function handlePointerCancel() {
    startYRef.current = null;
    setDragY(0);
    setIsDragging(false);
  }

  return {
    dragStyle: {
      transform: `translateY(${dragY}px)`,
      transition: isDragging ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
      touchAction: "none",
    } as React.CSSProperties,

    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
}