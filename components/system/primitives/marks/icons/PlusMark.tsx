"use client";

/* ==========================================================
   OUTFLO — PLUS MARK
   File: components/system/primitives/marks/icons/PlusMark.tsx
   Scope: Render reusable plus mark glyph
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: move generic mark icons into marks/icons
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
type PlusMarkProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
  opacity?: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function PlusMark({
  size = 14,
  strokeWidth = 1.5,
  color = "currentColor",
  opacity = 1,
}: PlusMarkProps) {
  const half = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ display: "block", opacity }}
    >
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={size}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <line
        x1={0}
        y1={half}
        x2={size}
        y2={half}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}