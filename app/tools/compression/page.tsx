"use client";

/* ==========================================================
   OUTFLO — ORBIT MONEY CALCULATOR
   File: app/tools/compression/page.tsx
   Scope: Calculate annualized orbit money from weekly visit cadence and cost per visit
   Last Updated:
   - ms: 1778107087301
   - iso: 2026-05-06T22:38:07.301Z
   - note: place orbit money calculator inside app frame and theme tokens
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useState } from "react";
import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Component
-------------------------------- */
export default function OrbitMoneyCalculator() {
  const [visitsPerWeek, setVisitsPerWeek] = useState<number>(0);
  const [costPerVisit, setCostPerVisit] = useState<number>(0);

  // Core engine
  const dailyRate = (visitsPerWeek / 7) * costPerVisit;
  const orbitMoney = dailyRate * 365;

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
            rowGap: "clamp(44px, 7vh, 72px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Orbit Money
            </div>

            <div
              style={{
                fontSize: "clamp(52px, 7vw, 76px)",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ${orbitMoney.toFixed(2)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 10 }}>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
              Daily Rate
            </div>

            <div
              style={{
                fontSize: "clamp(40px, 5.5vw, 58px)",
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ${dailyRate.toFixed(2)}
            </div>
          </div>

          <div style={{ display: "grid", rowGap: 14 }}>
            <input
              type="number"
              inputMode="decimal"
              placeholder="Visits per week"
              value={visitsPerWeek || ""}
              onChange={(e) => setVisitsPerWeek(Number(e.target.value))}
              style={inputStyle}
            />

            <input
              type="number"
              inputMode="decimal"
              placeholder="$ per visit"
              value={costPerVisit || ""}
              onChange={(e) => setCostPerVisit(Number(e.target.value))}
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
  padding: "16px 18px",
  background: "var(--surface-muted)",
  border: "1px solid var(--border-soft)",
  borderRadius: 14,
  color: "var(--text-primary)",
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
};