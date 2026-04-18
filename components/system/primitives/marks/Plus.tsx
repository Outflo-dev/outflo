"use client";

type PlusProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
  opacity?: number;
};

export default function Plus({
  size = 14,
  strokeWidth = 1.5,
  color = "currentColor",
  opacity = 1,
}: PlusProps) {
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