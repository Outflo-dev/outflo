"use client";

/* ==========================================================
   OUTFLO — GAIN CALCULATOR
   File: app/tools/gain/page.tsx
   Scope: Calculate daily gain and annualized projection from budget and spending inputs
   Last Updated:
   - ms: 1778107087301
   - iso: 2026-05-06T22:38:07.301Z
   - note: place gain calculator inside app frame and theme tokens
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useMemo, useState } from "react";
import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Component
-------------------------------- */
export default function GainCalculator() {
  const [budget, setBudget] = useState<string>("");
  const [spent, setSpent] = useState<string>("");

  const { gain, rolling365 } = useMemo(() => {
    const b = Number(budget) || 0;
    const s = Number(spent) || 0;

    const gainVal = b - s;

    return {
      gain: gainVal,
      rolling365: gainVal * 365,
    };
  }, [budget, spent]);

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
            rowGap: "clamp(28px, 5vh, 56px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Today’s Gain
            </div>

            <div
              style={{
                fontSize: "clamp(52px, 7vw, 76px)",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {(gain >= 0 ? "+" : "-") + "$" + Math.abs(gain).toFixed(2)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              365 Projection
            </div>

            <div
              style={{
                fontSize: "clamp(40px, 5.5vw, 58px)",
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {"$" + rolling365.toFixed(2)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 12 }}>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="Daily Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={inputStyle}
            />

            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="Amount Spent Today"
              value={spent}
              onChange={(e) => setSpent(e.target.value)}
              style={inputStyle}
            />
          </div>
        </section>
      </AppFrame>
    </main>
  );
}

/* ------------------------------
   Styles
-------------------------------- */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 14,
  borderRadius: 10,
  border: "1px solid var(--border-soft)",
  background: "var(--surface-muted)",
  color: "var(--text-primary)",
  outline: "none",
  fontSize: 16,
  boxSizing: "border-box",
};