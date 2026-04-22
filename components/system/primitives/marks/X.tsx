"use client";

import type { CSSProperties } from "react";

type XProps = {
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
};

export default function X({
  size = 18,
  strokeWidth = 2,
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
        transform: "translateY(10px)",
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