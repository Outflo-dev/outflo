"use client";

/* ==========================================================
   OUTFLO — ORBIT CALCULATOR
   File: app/tools/compression/page.tsx
   Scope: Prototype dialable orbit calculation with ticking values and atomic money math
   Last Updated:
   - ms: 1778113311005
   - iso: 2026-05-07T00:21:51.005Z
   - note: turn orbit calculator into winding interaction sandbox
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Constants
-------------------------------- */
const VISITS_MIN = 0;
const VISITS_MAX = 21;
const MONEY_MINOR_MIN = 0;
const MONEY_MINOR_MAX = 2500;
const MONEY_MINOR_STEP = 1;
const WEEKS_PER_ORBIT = 52;
const TICK_COUNT = 23;

/* ------------------------------
   Helpers
-------------------------------- */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function dollarsToMinor(value: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return clamp(Math.round(parsed * 100), MONEY_MINOR_MIN, MONEY_MINOR_MAX);
}

function minorToDollars(minor: number) {
  return (minor / 100).toFixed(2);
}

function formatMoney(minor: number) {
  return `$${minorToDollars(minor)}`;
}

function formatWhole(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function useTickingNumber(target: number) {
  const [displayValue, setDisplayValue] = useState(target);

  useEffect(() => {
    let frame = 0;
    let startTime: number | null = null;

    const startValue = displayValue;
    const distance = target - startValue;
    const duration = 220;

    if (Math.abs(distance) < 1) {
      setDisplayValue(target);
      return;
    }

    function tick(timestamp: number) {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = clamp(elapsed / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(startValue + distance * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplayValue(target);
      }
    }

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return displayValue;
}

/* ------------------------------
   Component
-------------------------------- */
export default function OrbitCalculator() {
  const [visitsPerWeek, setVisitsPerWeek] = useState(5);
  const [costPerVisitInput, setCostPerVisitInput] = useState("3.49");

  const costPerVisitMinor = useMemo(
    () => dollarsToMinor(costPerVisitInput),
    [costPerVisitInput]
  );

  const visitsPerOrbit = visitsPerWeek * WEEKS_PER_ORBIT;
  const orbitMinor = visitsPerOrbit * costPerVisitMinor;

  const tickingOrbitMinor = useTickingNumber(orbitMinor);
  const tickingVisits = useTickingNumber(visitsPerOrbit);

  function handleVisitsChange(value: string) {
    const nextVisits = clamp(
      Math.round(Number(value) || 0),
      VISITS_MIN,
      VISITS_MAX
    );

    setVisitsPerWeek(nextVisits);
  }

  function handleMoneyMinorChange(value: string) {
    const nextMinor = clamp(
      Math.round(Number(value) || 0),
      MONEY_MINOR_MIN,
      MONEY_MINOR_MAX
    );

    setCostPerVisitInput(minorToDollars(nextMinor));
  }

  function handleMoneyInputChange(value: string) {
    setCostPerVisitInput(value);
  }

  function handleMoneyInputBlur() {
    setCostPerVisitInput(minorToDollars(costPerVisitMinor));
  }

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
      <AppFrame>
        <section
          style={{
            width: "100%",
            display: "grid",
            rowGap: "clamp(34px, 6vh, 64px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={LABEL_STYLE}>Orbit</div>

            <div
              style={{
                fontSize: "clamp(58px, 12vw, 86px)",
                fontWeight: 740,
                letterSpacing: "-0.07em",
                lineHeight: 0.92,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatMoney(Math.round(tickingOrbitMinor))}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={LABEL_STYLE}>Visits</div>

            <div
              style={{
                fontSize: "clamp(42px, 8vw, 62px)",
                fontWeight: 650,
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatWhole(tickingVisits)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 24 }}>
            <div style={CONTROL_STYLE}>
              <div style={CONTROL_HEADER_STYLE}>
                <label htmlFor="visits-per-week" style={CONTROL_LABEL_STYLE}>
                  Visits per week
                </label>

                <input
                  id="visits-per-week"
                  type="number"
                  min={VISITS_MIN}
                  max={VISITS_MAX}
                  step={1}
                  inputMode="numeric"
                  value={visitsPerWeek}
                  onChange={(event) => handleVisitsChange(event.target.value)}
                  style={NUMBER_INPUT_STYLE}
                />
              </div>

              <WindingRail
                value={visitsPerWeek}
                min={VISITS_MIN}
                max={VISITS_MAX}
              />

              <input
                type="range"
                min={VISITS_MIN}
                max={VISITS_MAX}
                step={1}
                value={visitsPerWeek}
                onChange={(event) => handleVisitsChange(event.target.value)}
                aria-label="Visits per week dial"
                style={RANGE_STYLE}
              />
            </div>

            <div style={CONTROL_STYLE}>
              <div style={CONTROL_HEADER_STYLE}>
                <label htmlFor="cost-per-visit" style={CONTROL_LABEL_STYLE}>
                  Cost per visit
                </label>

                <input
                  id="cost-per-visit"
                  type="number"
                  min={minorToDollars(MONEY_MINOR_MIN)}
                  max={minorToDollars(MONEY_MINOR_MAX)}
                  step="0.01"
                  inputMode="decimal"
                  value={costPerVisitInput}
                  onChange={(event) =>
                    handleMoneyInputChange(event.target.value)
                  }
                  onBlur={handleMoneyInputBlur}
                  style={NUMBER_INPUT_STYLE}
                />
              </div>

              <WindingRail
                value={costPerVisitMinor}
                min={MONEY_MINOR_MIN}
                max={MONEY_MINOR_MAX}
              />

              <input
                type="range"
                min={MONEY_MINOR_MIN}
                max={MONEY_MINOR_MAX}
                step={MONEY_MINOR_STEP}
                value={costPerVisitMinor}
                onChange={(event) =>
                  handleMoneyMinorChange(event.target.value)
                }
                aria-label="Cost per visit dial"
                style={RANGE_STYLE}
              />
            </div>
          </div>
        </section>
      </AppFrame>
    </main>
  );
}

/* ------------------------------
   Winding Rail
-------------------------------- */
function WindingRail({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) {
  const activeIndex = Math.round(
    ((value - min) / Math.max(max - min, 1)) * (TICK_COUNT - 1)
  );

  return (
    <div
      aria-hidden="true"
      style={{
        height: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        padding: "4px 2px",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: TICK_COUNT }).map((_, index) => {
        const distance = Math.abs(index - activeIndex);
        const strength = clamp(1 - distance / 7, 0, 1);
        const isCenter = distance === 0;

        return (
          <div
            key={index}
            style={{
              width: isCenter ? 4 : 2,
              height: 7 + strength * 28,
              borderRadius: 999,
              background: "var(--text-primary)",
              opacity: 0.16 + strength * 0.72,
              boxShadow: isCenter
                ? "0 0 18px var(--glow-primary)"
                : "none",
              transform: `scaleY(${0.75 + strength * 0.35})`,
              transition:
                "height 160ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
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
const LABEL_STYLE: CSSProperties = {
  fontSize: 13,
  color: "var(--text-tertiary)",
};

const CONTROL_STYLE: CSSProperties = {
  display: "grid",
  rowGap: 10,
};

const CONTROL_HEADER_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};

const CONTROL_LABEL_STYLE: CSSProperties = {
  fontSize: 13,
  color: "var(--text-tertiary)",
};

const NUMBER_INPUT_STYLE: CSSProperties = {
  width: 94,
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid var(--border-soft)",
  background: "var(--surface-muted)",
  color: "var(--text-primary)",
  outline: "none",
  fontSize: 15,
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
  boxSizing: "border-box",
};

const RANGE_STYLE: CSSProperties = {
  width: "100%",
  accentColor: "var(--text-primary)",
};