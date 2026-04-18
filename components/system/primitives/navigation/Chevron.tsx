"use client";

/* ==========================================================
   OUTFLO — CHEVRON
   File: components/system/primitives/navigation/Chevron.tsx
   Scope: Pure directional chevron primitive for navigation affordances
   Last Updated:
   - ms: 1776222056208
   - iso: 2026-04-15T03:00:56.208Z
   - note: extract chevron as first clean navigation primitive
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
type ChevronProps = {
  direction?: "right" | "left" | "up" | "down";
  size?: number;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function Chevron({
  direction = "right",
  size = 10,
  color = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
}: ChevronProps) {
  const rotation =
    direction === "right"
      ? "45deg"
      : direction === "left"
        ? "225deg"
        : direction === "up"
          ? "315deg"
          : "135deg";

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: "inline-block",
        boxSizing: "border-box",
        borderTop: `${strokeWidth}px solid ${color}`,
        borderRight: `${strokeWidth}px solid ${color}`,
        transform: `rotate(${rotation})`,
        opacity,
        flexShrink: 0,
      }}
    />
  );
}