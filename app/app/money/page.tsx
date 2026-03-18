/* ==========================================================
   OUTFLO — MONEY ROOT
   File: app/app/money/page.tsx
   Scope: Render money root surface with current spend summary and quick add
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
  place: string;
  amount: number;
  ts: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const API_RECEIPTS = "/api/receipts";

/* ------------------------------
   Helpers
-------------------------------- */
function startOfTodayLocal(nowTs: number) {
  const d = new Date(nowTs);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function sumAmounts(receipts: Receipt[]) {
  let total = 0;
  for (const receipt of receipts) total += receipt.amount;
  return total;
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function isReceipt(value: any): value is Receipt {
  return (
    value &&
    typeof value.id === "string" &&
    typeof value.place === "string" &&
    typeof value.amount === "number" &&
    typeof value.ts === "number"
  );
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
  place: string;
  amount: number;
  ts: number;
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

  const { todaySpend, spend365 } = useMemo(() => {
    const todayStartTs = startOfTodayLocal(nowTs);
    const cutoff365Ts = nowTs - 365 * 24 * 60 * 60 * 1000;

    const todayReceipts = receipts.filter(
      (receipt) => receipt.ts >= todayStartTs && receipt.ts <= nowTs
    );

    const rollingReceipts = receipts.filter(
      (receipt) => receipt.ts >= cutoff365Ts && receipt.ts <= nowTs
    );

    return {
      todaySpend: sumAmounts(todayReceipts),
      spend365: sumAmounts(rollingReceipts),
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

    const ts = Date.now();

    try {
      const created = await apiPostReceipt({
        place: nextPlace,
        amount: nextAmount,
        ts,
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
            {formatMoney(todaySpend)}
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
            {formatMoney(spend365)}
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