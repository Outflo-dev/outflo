"use client";

/* ==========================================================
   OUTFLO — MOTION PRIMITIVE (v2)
   File: components/system/primitives/motion/Motion.tsx
   Scope: Pure motion primitive for directional presence (no layout, no interaction ownership)
   Last Updated:
   - ms: 1776222056208
   - iso: 2026-04-15T03:00:56.208Z
   - note: remove layout ownership and enforce non-blocking interaction during transition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { ReactNode, useEffect, useRef, useState } from "react";

/* ------------------------------
   Types
-------------------------------- */
type Direction = "up" | "down" | "left" | "right";

type MotionProps = {
  show: boolean;
  direction: Direction;
  children: ReactNode;
};

/* ------------------------------
   Constants (LOCKED)
-------------------------------- */
export const MOTION_DURATION_MS = 340;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/* ------------------------------
   Helpers
-------------------------------- */
function getOffsetTransform(direction: Direction) {
  switch (direction) {
    case "up":
      return "translateY(-100%)";
    case "down":
      return "translateY(100%)";
    case "left":
      return "translateX(-100%)";
    case "right":
      return "translateX(100%)";
  }
}

/* ------------------------------
   Component
-------------------------------- */
export default function Motion({
  show,
  direction,
  children,
}: MotionProps) {
  const [mounted, setMounted] = useState(show);
  const [active, setActive] = useState(show);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setActive(false);

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = window.requestAnimationFrame(() => {
          setActive(true);
        });
      });

      return () => {
        if (rafRef.current !== null) {
          window.cancelAnimationFrame(rafRef.current);
        }
      };
    }

    setActive(false);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [show]);

  if (!mounted) return null;

  return (
    <div
      style={{
        transform: active
          ? "translate3d(0,0,0)"
          : getOffsetTransform(direction),
        opacity: active ? 1 : 0,

        transition: `transform ${MOTION_DURATION_MS}ms ${EASING}, opacity ${MOTION_DURATION_MS}ms ${EASING}`,
        willChange: "transform, opacity",
      }}
      onTransitionEnd={() => {
        if (!show) {
          setMounted(false);
        }
      }}
    >
      {children}
    </div>
  );
}