"use client";

/* ==========================================================
   OUTFLO — ORBIT CALCULATOR
   File: app/tools/compression/page.tsx
   Scope: Prototype orbit calculator with visits cost and time
   Last Updated:
   - ms: 1778110410006
   - iso: 2026-05-06T23:33:30.006Z
   - note: restore winding lines and add time output
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Constants
-------------------------------- */
const TICK_COUNT = 25;

/* ------------------------------
   Helpers
-------------------------------- */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatMinutes(totalMinutes: number) {
  const safeMinutes = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
}

/* ------------------------------
   Component
-------------------------------- */
export default function OrbitCalculator() {
  const [visitsPerWeek, setVisitsPerWeek] = useState<number>(4);
  const [costPerVisit, setCostPerVisit] = useState<number>(3.95);
  const [minutesPerVisit, setMinutesPerVisit] = useState<number>(5);

  const visits = visitsPerWeek * 52;
  const orbit = visits * costPerVisit;
  const time = visits * minutesPerVisit;

  return (
    <main
      style={{
        minHeight: "100svh",
        width: "100%",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        display: "grid",
        placeItems: "center",
        padding: "max(24px, 6vh) 0px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .orbit-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 18px;
          background: transparent;
          margin: 0;
        }

        .orbit-range::-webkit-slider-runnable-track {
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .orbit-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: var(--text-primary);
          border: none;
          margin-top: -09px;
        }

        .orbit-range::-moz-range-track {
          height: 8px;
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .orbit-range::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: var(--text-primary);
          border: none;
        }
      `}</style>

      <AppFrame>
        <section
          style={{
            width: "100%",
            display: "grid",
            rowGap: "clamp(34px, 5.5vh, 58px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Visits
            </div>

            <div
              style={{
                fontSize: "clamp(40px, 5.5vw, 58px)",
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {visits.toFixed(0)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Orbit
            </div>

            <div
              style={{
                fontSize: "clamp(52px, 7vw, 76px)",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              ${orbit.toFixed(2)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Time
            </div>

            <div
              style={{
                fontSize: "clamp(40px, 5.5vw, 58px)",
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {formatMinutes(time)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 26 }}>
            <DialBlock
              label="Visits per week"
              valueLabel={visitsPerWeek.toString()}
              value={visitsPerWeek}
              min={0}
              max={14}
              step={1}
              onChange={(value) => setVisitsPerWeek(Math.round(value))}
              input={
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={14}
                  step={1}
                  value={visitsPerWeek}
                  onChange={(e) =>
                    setVisitsPerWeek(
                      clamp(Math.round(Number(e.target.value) || 0), 0, 14)
                    )
                  }
                  style={pillInputStyle}
                />
              }
            />

            <DialBlock
              label="Cost per visit"
              valueLabel={costPerVisit.toFixed(2)}
              value={costPerVisit}
              min={0}
              max={15}
              step={0.01}
              onChange={(value) => setCostPerVisit(value)}
              input={
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={15}
                  step="0.01"
                  value={costPerVisit}
                  onChange={(e) =>
                    setCostPerVisit(clamp(Number(e.target.value) || 0, 0, 15))
                  }
                  style={pillInputStyle}
                />
              }
            />

            <DialBlock
              label="Minutes per visit"
              valueLabel={minutesPerVisit.toString()}
              value={minutesPerVisit}
              min={0}
              max={120}
              step={1}
              onChange={(value) => setMinutesPerVisit(Math.round(value))}
              input={
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={120}
                  step={1}
                  value={minutesPerVisit}
                  onChange={(e) =>
                    setMinutesPerVisit(
                      clamp(Math.round(Number(e.target.value) || 0), 0, 120)
                    )
                  }
                  style={pillInputStyle}
                />
              }
            />
          </div>

          <nav
            aria-label="Orbit calculator navigation"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: 2,
            }}
          >
            <Link
              href="/app/systems"
              style={{
                color: "var(--text-primary)",
                textDecoration: "none",
                fontSize: 13,
                border: "1px solid var(--border-soft)",
                background: "var(--surface-soft)",
                borderRadius: 999,
                padding: "9px 14px",
              }}
            >
              Systems
            </Link>
          </nav>
        </section>
      </AppFrame>
    </main>
  );
}

/* ------------------------------
   Dial Block
-------------------------------- */
function DialBlock({
  label,
  valueLabel,
  value,
  min,
  max,
  step,
  onChange,
  input,
}: {
  label: string;
  valueLabel: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  input: React.ReactNode;
}) {
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: "grid", rowGap: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
          {label}
        </div>

        <div style={{ width: 96 }}>{input}</div>
      </div>

      <WindingTicks percent={percent} />

      <input
        className="orbit-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

/* ------------------------------
   Winding Ticks
-------------------------------- */
function WindingTicks({ percent }: { percent: number }) {
  const activeIndex = (percent / 100) * (TICK_COUNT - 1);

  return (
    <div
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${TICK_COUNT}, 1fr)`,
        alignItems: "end",
        gap: 3,
        height: 28,
      }}
    >
      {Array.from({ length: TICK_COUNT }).map((_, index) => {
        const distance = Math.abs(index - activeIndex);
        const strength = Math.max(0, 1 - distance / 6);
        const isCenter = distance < 0.75;

        return (
          <div
            key={index}
            style={{
              width: 3,
              justifySelf: "center",
              height: 5 + strength * 19,
              borderRadius: 999,
              background: "var(--text-primary)",
              opacity: isCenter ? 0.92 : 0.16 + strength * 0.42,
              transition: "height 120ms ease, opacity 120ms ease",
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------
   Styles
-------------------------------- */
const pillInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--surface-muted)",
  border: "1px solid var(--border-soft)",
  borderRadius: 999,
  color: "var(--text-primary)",
  fontSize: 16,
  textAlign: "right",
  outline: "none",
  boxSizing: "border-box",
};