"use client";

/* ==========================================================
   OUTFLO — EPOCH TICKER
   File: components/system/primitives/display/clocks/EpochTicker.tsx
   Scope: Render live milliseconds elapsed from user epoch
   Last Updated:
   - ms: 1778540064130
   - iso: 2026-05-11T22:54:24.130Z
   - note: add optional size posture while preserving default Text clock sizing
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useEffect, useState } from "react";
import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type EpochTickerProps = {
  epochMs: number;
  size?: "sm" | "md";
};

/* ------------------------------
   Constants
-------------------------------- */
const EPOCH_TICKER_SIZE = {
  sm: {
    letterSpacing: "0.08em",
  },
  md: {
    fontSize: 22,
    letterSpacing: "0.06em",
  },
} satisfies Record<
  NonNullable<EpochTickerProps["size"]>,
  {
    fontSize?: number;
    letterSpacing: string;
  }
>;

/* ------------------------------
   Component
-------------------------------- */
export default function EpochTicker({ epochMs, size = "sm" }: EpochTickerProps) {
  const [nowMs, setNowMs] = useState(0);

  useEffect(() => {
    const update = () => setNowMs(Date.now());

    update();

    const interval = setInterval(update, 50);

    return () => clearInterval(interval);
  }, []);

  const value = nowMs === 0 ? 0 : nowMs - epochMs;
  const formatted = String(value).padStart(13, "0");
  const sizeStyle = EPOCH_TICKER_SIZE[size];

  return (
    <Text
      type="clock"
      style={{
        color: "var(--text-primary)",
        ...sizeStyle,
      }}
    >
      {formatted}
    </Text>
  );
}