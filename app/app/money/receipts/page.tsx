/* ==========================================================
   OUTFLO — RECEIPTS PAGE
   File: app/app/money/receipts/page.tsx
   Scope: Render receipt list from canonical receipt reads
   Last Updated:
   - ms: 1774325010177
   - iso: 2026-03-24T04:03:30.177Z
   - note: Phase C read alignment
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

/* ------------------------------
   Helpers
-------------------------------- */
function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

/* 24-hour European time (time only) */
function formatReceiptTime(momentMs: number) {
  const d = new Date(momentMs);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/* Day header: 11 Feb 2026 */
function formatDayHeader(momentMs: number) {
  const d = new Date(momentMs);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* Stable local day key */
function dayKeyLocal(momentMs: number) {
  const d = new Date(momentMs);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function receiptSuffix(id: string) {
  const parts = id.split("-");
  return parts.length > 1 ? parts[1] : id;
}

function sumDay(items: Receipt[]) {
  let s = 0;
  for (const r of items) s += r.amount_minor;
  return s;
}

/** CSV escaping (Excel-safe) */
function csvEscape(v: string) {
  if (v.includes('"')) v = v.replace(/"/g, '""');
  const needsQuotes =
    v.includes(",") || v.includes("\n") || v.includes("\r") || v.includes('"');
  return needsQuotes ? `"${v}"` : v;
}

function formatLocalDate(momentMs: number) {
  const d = new Date(momentMs);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatLocalTime(momentMs: number) {
  const d = new Date(momentMs);
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mi}`;
}

function receiptsToCsv(receipts: Receipt[]) {
  const header = [
    "moment_ms",
    "localDate",
    "localTime",
    "merchant_raw",
    "amount_minor",
    "currency",
    "id",
  ].join(",");

  const rows = receipts.map((r) => {
    const fields = [
      String(r.moment_ms),
      formatLocalDate(r.moment_ms),
      formatLocalTime(r.moment_ms),
      csvEscape(r.merchant_raw),
      String(r.amount_minor),
      csvEscape(r.currency),
      csvEscape(r.id),
    ];
    return fields.join(",");
  });

  return [header, ...rows].join("\r\n");
}

function downloadTextFile(filename: string, content: string, mime: string) {
  try {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {}
}

async function apiGetReceipts(): Promise<Receipt[]> {
  const res = await fetch(API_RECEIPTS, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`GET /api/receipts failed (${res.status})`);
  const json = await res.json();
  const receipts = Array.isArray(json?.receipts) ? json.receipts : [];

  return receipts.filter(
    (t: unknown) =>
      typeof t === "object" &&
      t !== null &&
      typeof (t as Receipt).id === "string" &&
      typeof (t as Receipt).merchant_raw === "string" &&
      typeof (t as Receipt).amount_minor === "number" &&
      typeof (t as Receipt).currency === "string" &&
      typeof (t as Receipt).moment_ms === "number"
  );
}

/* ------------------------------
   Component
-------------------------------- */
export default function ReceiptsPage() {
  const router = useRouter();

  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const rs = await apiGetReceipts();
        if (!alive) return;
        setReceipts(rs);
      } catch {
        // silent fail for sprint
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const sortedLimited = useMemo(() => {
    const sorted = [...receipts].sort((a, b) => b.moment_ms - a.moment_ms);
    return sorted.slice(0, 300);
  }, [receipts]);

  const grouped = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, Receipt[]>();

    for (const r of sortedLimited) {
      const key = dayKeyLocal(r.moment_ms);
      if (!map.has(key)) {
        map.set(key, []);
        order.push(key);
      }
      map.get(key)!.push(r);
    }

    return { order, map };
  }, [sortedLimited]);

  const dayCumById = useMemo(() => {
    const out = new Map<string, number>();

    const byDay = new Map<string, Receipt[]>();
    for (const r of receipts) {
      const k = dayKeyLocal(r.moment_ms);
      if (!byDay.has(k)) byDay.set(k, []);
      byDay.get(k)!.push(r);
    }

    for (const [, items] of byDay) {
      const asc = [...items].sort((a, b) => {
        if (a.moment_ms !== b.moment_ms) return a.moment_ms - b.moment_ms;
        return a.id.localeCompare(b.id);
      });

      let s = 0;
      for (const r of asc) {
        s += r.amount_minor;
        out.set(r.id, s);
      }
    }

    return out;
  }, [receipts]);

  const showCsv = tapCount >= 3;
  const showAdmin = tapCount >= 11;

  function onTapTitle() {
    setTapCount((n) => n + 1);
  }

  function exportCsv() {
    const sorted = [...receipts].sort((a, b) => b.moment_ms - a.moment_ms);
    const csv = receiptsToCsv(sorted);
    downloadTextFile(
      `outflo_receipts_${Date.now()}.csv`,
      csv,
      "text/csv;charset=utf-8"
    );
  }

  function goAdmin() {
    const pw = window.prompt("Enter admin password");
    if (pw !== "CALLIOPE") return;
    router.push("/admin");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        display: "grid",
        placeItems: "center",
        padding: "max(24px, 6vh) 0px",
        width: "100%",
        maxWidth: "none",
      }}
    >
      <section
        style={{
          width: "100%",
          display: "grid",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <Link
            href="/app/money"
            style={{
              color: "white",
              opacity: 0.7,
              textDecoration: "none",
              fontSize: 12,
            }}
          >
            ← Back
          </Link>

          {showAdmin ? (
            <button onClick={goAdmin} style={dangerButtonStyle}>
              Admin
            </button>
          ) : (
            <div style={{ fontSize: 12, opacity: 0.35 }} />
          )}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <div
            onClick={onTapTitle}
            style={{
              fontSize: 13,
              opacity: 0.85,
              userSelect: "none",
              cursor: "default",
            }}
            title="(tap 3x for export · 11x for admin)"
          >
            Receipts
          </div>

          <div style={{ fontSize: 12, opacity: 0.45 }}>
            Total:{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {receipts.length}
            </span>
            <span style={{ opacity: 0.35 }}>
              {" "}
              · showing latest {sortedLimited.length}
            </span>
          </div>

          {showCsv ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={exportCsv} style={pillButtonStyle}>
                Export CSV
              </button>
            </div>
          ) : null}
        </div>

        {loading ? (
          <div style={{ fontSize: 12, opacity: 0.35 }}>Loading…</div>
        ) : sortedLimited.length === 0 ? (
          <div style={{ fontSize: 12, opacity: 0.35 }}>No receipts yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 18 }}>
            {grouped.order.map((key) => {
              const items = grouped.map.get(key)!;
              const header = formatDayHeader(items[0].moment_ms);
              const dayTotal = sumDay(items);
              const dayCurrency = items[0].currency;

              return (
                <div key={key} style={{ display: "grid", gap: 10 }}>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: 0.6,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {header} · {formatMoney(dayTotal, dayCurrency)}
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    {items.map((r) => {
                      const cum = dayCumById.get(r.id);
                      const cumText = formatMoney(
                        typeof cum === "number" ? cum : r.amount_minor,
                        r.currency
                      );

                      return (
                        <Link
                          key={r.id}
                          href={`/app/money/receipts/${encodeURIComponent(
                            r.id
                          )}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "block",
                          }}
                        >
                          <div
                            style={{
                              padding: "16px",
                              borderRadius: 18,
                              border: "1px solid rgba(255,255,255,0.10)",
                              background: "rgba(255,255,255,0.03)",
                              display: "grid",
                              gap: 10,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                gap: 12,
                              }}
                            >
                              <div style={{ fontSize: 14, opacity: 0.9 }}>
                                {r.merchant_raw}
                              </div>

                              <div
                                style={{
                                  fontSize: 12,
                                  opacity: 0.55,
                                  fontVariantNumeric: "tabular-nums",
                                  letterSpacing: "0.02em",
                                  textAlign: "right",
                                  whiteSpace: "nowrap",
                                }}
                                title="Day cumulative at this moment"
                              >
                                {cumText}
                              </div>
                            </div>

                            <div
                              style={{
                                fontSize: 30,
                                fontWeight: 700,
                                fontVariantNumeric: "tabular-nums",
                                letterSpacing: "-0.02em",
                              }}
                            >
                              {formatMoney(r.amount_minor, r.currency)}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                fontSize: 12,
                                opacity: 0.55,
                              }}
                            >
                              <span>{formatReceiptTime(r.moment_ms)}</span>

                              <span
                                style={{
                                  fontVariantNumeric: "tabular-nums",
                                  letterSpacing: "0.05em",
                                  opacity: 0.7,
                                }}
                              >
                                #{receiptSuffix(r.id)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ fontSize: 11, opacity: 0.22 }}>
          Stored in cloud. Export recommended.
        </div>
      </section>
    </main>
  );
}

/* ------------------------------
   Styles
-------------------------------- */
const pillButtonStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.14)",
  color: "white",
  borderRadius: 999,
  padding: "8px 12px",
  fontSize: 12,
  cursor: "pointer",
};

const dangerButtonStyle: React.CSSProperties = {
  background: "rgba(255,60,60,0.12)",
  border: "1px solid rgba(255,60,60,0.30)",
  color: "white",
  borderRadius: 999,
  padding: "8px 12px",
  fontSize: 12,
  cursor: "pointer",
};





