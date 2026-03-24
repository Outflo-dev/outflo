/* ==========================================================
   OUTFLO — MONEY ROOT
   File: app/app/money/page.tsx
   Scope: Render money root surface with current spend summary and quick add
   Last Updated:
   - ms: 1774328392539
   - iso: 2026-03-24T04:59:52.539Z
   - note: Phase D write alignment
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */
import type React from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ------------------------------
   Types
-------------------------------- */
type Receipt = {
  id: string;
  merchant_raw: string;
  amount_minor: number;
  currency: string;
  moment_ms: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const API_RECEIPTS = "/api/receipts";
const DEFAULT_CURRENCY = "USD";

/* ------------------------------
   Helpers
-------------------------------- */
function startOfTodayLocal(nowTs: number) {
  const d = new Date(nowTs);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function sumAmountsMinor(receipts: Receipt[]) {
  let total = 0;
  for (const receipt of receipts) total += receipt.amount_minor;
  return total;
}

function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

function isReceipt(value: unknown): value is Receipt {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Receipt).id === "string" &&
    typeof (value as Receipt).merchant_raw === "string" &&
    typeof (value as Receipt).amount_minor === "number" &&
    typeof (value as Receipt).currency === "string" &&
    typeof (value as Receipt).moment_ms === "number"
  );
}

function dollarsToMinor(amount: number) {
  return Math.round(amount * 100);
}

/* ------------------------------
   API
-------------------------------- */
async function apiGetReceipts(): Promise<Receipt[]> {
  const response = await fetch(API_RECEIPTS, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`GET /api/receipts failed (${response.status})`);
  }

  const json = await response.json();
  const receipts = Array.isArray(json?.receipts) ? json.receipts : [];

  return receipts.filter(isReceipt);
}

async function apiPostReceipt(input: {
  merchant_raw: string;
  amount_minor: number;
  currency: string;
  moment_ms: number;
}): Promise<Receipt> {
  const response = await fetch(API_RECEIPTS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`POST /api/receipts failed (${response.status})`);
  }

  const json = await response.json();
  const receipt = json?.receipt;

  if (!isReceipt(receipt)) {
    throw new Error("Invalid receipt response");
  }

  return receipt;
}

/* ------------------------------
   Component
-------------------------------- */
export default function MoneyPage() {
  /* ------------------------------
     State
  -------------------------------- */
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [place, setPlace] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  /* ------------------------------
     Effects
  -------------------------------- */
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const nextReceipts = await apiGetReceipts();
        if (!alive) return;
        setReceipts(nextReceipts);
      } catch {
        // Silent fail for current sprint
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  /* ------------------------------
     Compute
  -------------------------------- */
  const nowTs = Date.now();
  const displayCurrency = receipts[0]?.currency ?? DEFAULT_CURRENCY;

  const { todaySpendMinor, spend365Minor } = useMemo(() => {
    const todayStartTs = startOfTodayLocal(nowTs);
    const cutoff365Ts = nowTs - 365 * 24 * 60 * 60 * 1000;

    const todayReceipts = receipts.filter(
      (receipt) =>
        receipt.moment_ms >= todayStartTs && receipt.moment_ms <= nowTs
    );

    const rollingReceipts = receipts.filter(
      (receipt) =>
        receipt.moment_ms >= cutoff365Ts && receipt.moment_ms <= nowTs
    );

    return {
      todaySpendMinor: sumAmountsMinor(todayReceipts),
      spend365Minor: sumAmountsMinor(rollingReceipts),
    };
  }, [receipts, nowTs]);

  /* ------------------------------
     Handlers
  -------------------------------- */
  async function addReceipt() {
    const nextPlace = place.trim();
    const nextAmount = Number(amount);

    if (!nextPlace) return;
    if (!Number.isFinite(nextAmount) || nextAmount <= 0) return;

    const moment_ms = Date.now();

    try {
      const created = await apiPostReceipt({
        merchant_raw: nextPlace,
        amount_minor: dollarsToMinor(nextAmount),
        currency: DEFAULT_CURRENCY,
        moment_ms,
      });

      setReceipts((prev) => [created, ...prev]);
      setPlace("");
      setAmount("");
    } catch {
      // Silent fail for current sprint
    }
  }

  /* ------------------------------
     Render
  -------------------------------- */
  return (
    <div
      style={{
        minHeight: "100svh",
        backgroundColor: "black",
        color: "white",
        display: "grid",
        placeItems: "center",
        padding: "max(24px, 6vh) 0px",
        width: "100%",
      }}
    >
      <section
        style={{
          width: "100%",
          display: "grid",
          rowGap: "clamp(28px, 5vh, 56px)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "grid", rowGap: 10 }}>
          <div style={{ fontSize: 13, opacity: 0.55 }}>Today Spend</div>
          <div
            style={{
              fontSize: "clamp(52px, 7vw, 76px)",
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatMoney(todaySpendMinor, displayCurrency)}
          </div>
        </div>

        <div style={{ display: "grid", rowGap: 10 }}>
          <div style={{ fontSize: 13, opacity: 0.55 }}>365 Spend</div>
          <div
            style={{
              fontSize: "clamp(40px, 5.5vw, 58px)",
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatMoney(spend365Minor, displayCurrency)}
          </div>
        </div>

        <div style={{ display: "grid", rowGap: 14 }}>
          <input
            placeholder="Place"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Amount"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            style={inputStyle}
          />

          <button onClick={addReceipt} style={buttonStyle} disabled={loading}>
            Add
          </button>

          <div style={{ fontSize: 13, opacity: 0.85 }}>
            <Link
              href="/app/money/receipts"
              style={{ textDecoration: "none", color: "white" }}
            >
              Receipts:{" "}
              <span
                style={{
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {receipts.length}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------
   Styles
-------------------------------- */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  background: "#111",
  border: "1px solid #222",
  borderRadius: 14,
  color: "white",
  fontSize: 16,
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 14,
  color: "white",
  fontSize: 15,
  fontWeight: 600,
};