"use client";

/* ==========================================================
   OUTFLO — MOTION PRIMITIVE (v2)
   File: components/system/primitives/motion/Motion.tsx
   Scope: Pure motion primitive for directional presence (no layout, no interaction ownership)
   Last Updated:
   - ms: 1778290038937
   - iso: 2026-05-09T01:27:18.937Z
   - note: separate enter and exit direction transforms
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { ReactNode, useEffect, useRef, useState } from "react";

/* ------------------------------
   Types
-------------------------------- */
type Direction = "up" | "down" | "left" | "right";

type MotionPhase = "enter" | "exit";

type MotionProps = {
  show: boolean;
  direction: Direction;
  children: ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
export const MOTION_DURATION_MS = 300;

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const VERTICAL_TRAVEL_PX = 28;
const HORIZONTAL_TRAVEL_PX = 22;

/* ------------------------------
   Helpers
-------------------------------- */
function getOffsetTransform(direction: Direction, phase: MotionPhase) {
  switch (direction) {
    case "up":
      return phase === "enter"
        ? `translate3d(0, ${VERTICAL_TRAVEL_PX}px, 0)`
        : `translate3d(0, -${VERTICAL_TRAVEL_PX}px, 0)`;
    case "down":
      return phase === "enter"
        ? `translate3d(0, -${VERTICAL_TRAVEL_PX}px, 0)`
        : `translate3d(0, ${VERTICAL_TRAVEL_PX}px, 0)`;
    case "left":
      return phase === "enter"
        ? `translate3d(${HORIZONTAL_TRAVEL_PX}px, 0, 0)`
        : `translate3d(-${HORIZONTAL_TRAVEL_PX}px, 0, 0)`;
    case "right":
      return phase === "enter"
        ? `translate3d(-${HORIZONTAL_TRAVEL_PX}px, 0, 0)`
        : `translate3d(${HORIZONTAL_TRAVEL_PX}px, 0, 0)`;
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
  const [phase, setPhase] = useState<MotionPhase>("enter");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (show) {
      setMounted(true);
      setPhase("enter");
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

    setPhase("exit");
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
          ? "translate3d(0, 0, 0)"
          : getOffsetTransform(direction, phase),
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