/* ==========================================================
   OUTFLO — EPOCH TICKER
   File: components/ui/EpochTicker.tsx
   Scope: Render a rolling 13-digit epoch-relative ticker
   Last Updated:
   - ms: 1775412646527
   - iso: 2026-04-05T18:10:46.527Z
   - note: add rolling bottom ticker for profile page
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EpochTickerProps = {
  epochMs: number;
};

type DigitColumnProps = {
  digit: string;
  index: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const TICK_MS = 48;
const DIGIT_HEIGHT = 14;
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

/* ------------------------------
   Helpers
-------------------------------- */
function formatElapsed(elapsedMs: number) {
  return String(Math.max(0, elapsedMs)).padStart(13, "0");
}

/* ------------------------------
   Component
-------------------------------- */
function DigitColumn({ digit, index }: DigitColumnProps) {
  const numericDigit = Number(digit);

  const transitionMs =
    index >= 11 ? 90 :
    index >= 9 ? 120 :
    index >= 6 ? 160 :
    220;

  return (
    <span
      style={{
        position: "relative",
        width: "0.68ch",
        height: DIGIT_HEIGHT,
        overflow: "hidden",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${numericDigit * DIGIT_HEIGHT}px)`,
          transition: `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          willChange: "transform",
        }}
      >
        {DIGITS.map((value) => (
          <span
            key={value}
            style={{
              height: DIGIT_HEIGHT,
              lineHeight: `${DIGIT_HEIGHT}px`,
              display: "block",
              textAlign: "center",
            }}
          >
            {value}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function EpochTicker({ epochMs }: EpochTickerProps) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const hasMountedRef = useRef(false);

  useEffect(() => {
    hasMountedRef.current = true;

    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, TICK_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const formatted = useMemo(() => {
    return formatElapsed(nowMs - epochMs);
  }, [nowMs, epochMs]);

  return (
    <div
      aria-label="Epoch ticker"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        minHeight: DIGIT_HEIGHT,
        color: "rgba(255,255,255,0.40)",
        fontSize: 11,
        lineHeight: `${DIGIT_HEIGHT}px`,
        letterSpacing: "0.08em",
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: '"tnum" 1, "lnum" 1',
        userSelect: "none",
      }}
    >
      {formatted.split("").map((digit, index) => {
        if (!hasMountedRef.current) {
          return (
            <span
              key={`${index}-${digit}`}
              style={{
                width: "0.68ch",
                height: DIGIT_HEIGHT,
                lineHeight: `${DIGIT_HEIGHT}px`,
                display: "inline-flex",
                justifyContent: "center",
              }}
            >
              {digit}
            </span>
          );
        }

        return <DigitColumn key={index} digit={digit} index={index} />;
      })}
    </div>
  );
}