/* ==========================================================
   OUTFLO — ROLLING NUMBER
   File: components/ui/RollingNumber.tsx
   Scope: Render loading-safe numeric display with last-known persistence and real-change roll behavior
   Last Updated:
   - ms: 1775411530078
   - iso: 2026-04-05T17:52:10.078Z
   - note: add global numeric behavior primitive with logo loading state and Cash App–style rolling transition
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------
   Types
-------------------------------- */

type RollingNumberProps = {
  value?: string | null;
  isLoading?: boolean;
  className?: string;
  durationMs?: number;
  logoSrc?: string;
  logoAlt?: string;
};

/* ------------------------------
   Constants
-------------------------------- */

const DEFAULT_DURATION_MS = 180;
const DEFAULT_LOGO_SRC = "/favicon.png";
const DEFAULT_LOGO_ALT = "Outflō";

/* ------------------------------
   Helpers
-------------------------------- */

function hasResolvedValue(value: string | null | undefined): value is string {
  return typeof value === "string" && value.length > 0;
}

/* ------------------------------
   Component
-------------------------------- */

export default function RollingNumber({
  value,
  isLoading = false,
  className = "",
  durationMs = DEFAULT_DURATION_MS,
  logoSrc = DEFAULT_LOGO_SRC,
  logoAlt = DEFAULT_LOGO_ALT,
}: RollingNumberProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lastResolvedValue, setLastResolvedValue] = useState<string | null>(null);
  const [incomingValue, setIncomingValue] = useState<string | null>(null);
  const [outgoingValue, setOutgoingValue] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [hasResolvedOnce, setHasResolvedOnce] = useState(false);

  const nextValue = useMemo(() => {
    return hasResolvedValue(value) ? value : null;
  }, [value]);

  useEffect(() => {
    if (!nextValue) return;

    if (!hasResolvedOnce) {
      setHasResolvedOnce(true);
      setLastResolvedValue(nextValue);
      setIncomingValue(nextValue);
      setOutgoingValue(null);
      setIsRolling(false);
      return;
    }

    if (nextValue === lastResolvedValue) {
      setIncomingValue(nextValue);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setOutgoingValue(lastResolvedValue);
    setIncomingValue(nextValue);
    setLastResolvedValue(nextValue);
    setIsRolling(true);

    timeoutRef.current = setTimeout(() => {
      setIsRolling(false);
      setOutgoingValue(null);
    }, durationMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [durationMs, hasResolvedOnce, lastResolvedValue, nextValue]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const displayValue = incomingValue ?? lastResolvedValue;

  if (!displayValue && isLoading) {
    return (
      <span
        aria-label="Loading"
        className={`inline-flex h-[1em] min-w-[1em] items-center justify-center align-middle ${className}`}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={16}
          height={16}
          className="h-[0.95em] w-[0.95em] animate-pulse object-contain opacity-80"
          priority={false}
        />
      </span>
    );
  }

  if (!displayValue) {
    return null;
  }

  if (!isRolling || !outgoingValue) {
    return (
      <span className={`inline-block align-middle ${className}`} aria-live="off">
        {displayValue}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block overflow-hidden align-middle ${className}`}
      aria-live="off"
      style={{ height: "1em", lineHeight: 1 }}
    >
      <span
        className="absolute inset-0 whitespace-nowrap will-change-transform"
        style={{
          transform: "translateY(0%)",
          animation: `outflo-roll-out ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
        }}
      >
        {outgoingValue}
      </span>

      <span
        className="absolute inset-0 whitespace-nowrap will-change-transform"
        style={{
          transform: "translateY(100%)",
          animation: `outflo-roll-in ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
        }}
      >
        {displayValue}
      </span>

      <style jsx>{`
        @keyframes outflo-roll-out {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 1;
          }
        }

        @keyframes outflo-roll-in {
          from {
            transform: translateY(100%);
            opacity: 1;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}