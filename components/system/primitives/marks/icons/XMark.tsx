"use client";

/* ==========================================================
   OUTFLO — X MARK
   File: components/system/primitives/marks/icons/XMark.tsx
   Scope: Render reusable x mark glyph
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: move generic mark icons into marks/icons
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type XMarkProps = {
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function XMark({
  size = 18,
  strokeWidth = 2,
  style,
}: XMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      style={{
        display: "block",
        flexShrink: 0,
        ...style,
      }}
    >
      <path
        d="M7.5 7.5L16.5 16.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M16.5 7.5L7.5 16.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}