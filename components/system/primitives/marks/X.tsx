"use client";

import type { CSSProperties } from "react";

type XProps = {
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
};

export default function X({
  size = 14,
  strokeWidth = 1.8,
  style,
}: XProps) {
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
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}