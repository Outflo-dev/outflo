"use client";

/* ==========================================================
   OUTFLO — CHEVRON
   File: components/system/primitives/navigation/chevron/Chevron.tsx
   Scope: Render directional chevron primitive with role-based sizing
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: add safe numeric and token stroke handling for chevron roles
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
type ChevronDirection = "right" | "left" | "up" | "down";

type ChevronRole = "menu" | "nav";

type ChevronProps = {
  direction?: ChevronDirection;
  role?: ChevronRole;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  opacity?: number;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getChevronRotation(direction: ChevronDirection) {
  if (direction === "right") return "45deg";
  if (direction === "left") return "225deg";
  if (direction === "up") return "315deg";

  return "135deg";
}

function formatCssSize(value: number | string) {
  if (typeof value === "number") return `${value}px`;

  return value;
}

/* ------------------------------
   Component
-------------------------------- */
export default function Chevron({
  direction = "right",
  role = "menu",
  size,
  color = "var(--text-tertiary)",
  strokeWidth,
  opacity = 1,
}: ChevronProps) {
  const resolvedSize = formatCssSize(
    size ?? `var(--chevron-size-${role}, var(--chevron-size, 5px))`
  );

  const resolvedStrokeWidth = formatCssSize(
    strokeWidth ?? `var(--chevron-stroke-${role}, 1.5px)`
  );

  return (
    <span
      aria-hidden="true"
      style={{
        width: resolvedSize,
        height: resolvedSize,
        display: "inline-block",
        boxSizing: "border-box",
        borderTop: `${resolvedStrokeWidth} solid ${color}`,
        borderRight: `${resolvedStrokeWidth} solid ${color}`,
        transform: `rotate(${getChevronRotation(direction)})`,
        opacity,
        flexShrink: 0,
      }}
    />
  );
}