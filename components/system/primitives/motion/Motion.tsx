"use client";

/* ==========================================================
   OUTFLO — MOTION PRIMITIVE (v1)
   File: components/system/primitives/motion/Motion.tsx
   Scope: Single system motion primitive for directional presence

   Last Updated:
   - ms: 1775965053801
   - iso: 2026-04-12T03:37:33.801Z
   - note: initial system motion primitive (up, down, left, right)
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
const DURATION = 260;
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
        position: "relative",
        width: "100%",
        height: "100%",
        transform: active ? "translateX(0) translateY(0)" : getOffsetTransform(direction),
        opacity: active ? 1 : 0,
        transition: `transform ${DURATION}ms ${EASING}, opacity ${DURATION}ms ${EASING}`,
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