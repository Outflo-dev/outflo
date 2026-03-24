/* ==========================================================
   OUTFLO — DAY RECEIPTS
   File: app/app/money/day/[key]/page.tsx
   Scope: Cloud-only day view (filter receipts by local day key)
   Last Updated:
   - ms: 1774325529558
   - iso: 2026-03-24T04:12:09.558Z
   - note: Phase C read alignment
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

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
   API
-------------------------------- */
const API_RECEIPTS = "/api/receipts";

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
   Format / Compute
-------------------------------- */
function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

function receiptSuffix(id: string) {
  const parts = id.split("-");
  return parts.length > 1 ? parts[1] : id;
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
function formatDayHeaderFromKey(key: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!m) return key;
  const yyyy = Number(m[1]);
  const mm = Number(m[2]);
  const dd = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
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

/* ------------------------------
   CSV
-------------------------------- */
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

/* ------------------------------
   Page
-------------------------------- */
export default function DayPage() {
  const params = useParams();
  const rawKey = (params as { key?: string | string[] })?.key;
  const key = decodeURIComponent(
    Array.isArray(rawKey) ? rawKey[0] : (rawKey ?? "")
  );

  const [receipts, setReceipts] = useState<Receipt[]>([]);
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

  const dayReceipts = useMemo(() => {
    if (!key) return [];
    const filtered = receipts.filter((r) => dayKeyLocal(r.moment_ms) === key);
    return filtered.sort((a, b) => b.moment_ms - a.moment_ms);
  }, [receipts, key]);

  const dayTotal = useMemo(() => {
    let s = 0;
    for (const r of dayReceipts) s += r.amount_minor;
    return s;
  }, [dayReceipts]);

  const dayCumById = useMemo(() => {
    const out = new Map<string, number>();

    const asc = [...dayReceipts].sort((a, b) => {
      if (a.moment_ms !== b.moment_ms) return a.moment_ms - b.moment_ms;
      return a.id.localeCompare(b.id);
    });

    let s = 0;
    for (const r of asc) {
      s += r.amount_minor;
      out.set(r.id, s);
    }

    return out;
  }, [dayReceipts]);

  function exportDayCsv() {
    const sorted = [...dayReceipts].sort((a, b) => b.moment_ms - a.moment_ms);
    const csv = receiptsToCsv(sorted);
    downloadTextFile(
      `outflo_day_${key}_${Date.now()}.csv`,
      csv,
      "text/csv;charset=utf-8"
    );
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
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "none",
          marginInline: "auto",
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
            href="/app/money/receipts"
            style={{
              color: "white",
              opacity: 0.7,
              textDecoration: "none",
              fontSize: 12,
            }}
          >
            ← Back
          </Link>

          <button onClick={exportDayCsv} style={pillButtonStyle}>
            Export CSV
          </button>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, opacity: 0.85 }}>Day</div>

          <div
            style={{
              fontSize: 12,
              opacity: 0.6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {formatDayHeaderFromKey(key)} ·{" "}
            {dayReceipts[0]
              ? formatMoney(dayTotal, dayReceipts[0].currency)
              : "—"}
          </div>

          <div style={{ fontSize: 12, opacity: 0.45 }}>
            Receipts:{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {loading ? "…" : dayReceipts.length}
            </span>
          </div>
        </div>

        {loading ? (
          <div style={{ fontSize: 12, opacity: 0.35 }}>Loading…</div>
        ) : dayReceipts.length === 0 ? (
          <div style={{ fontSize: 12, opacity: 0.35 }}>No receipts.</div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {dayReceipts.map((r) => {
              const cum = dayCumById.get(r.id);
              const cumText = formatMoney(
                typeof cum === "number" ? cum : r.amount_minor,
                r.currency
              );

              return (
                <Link
                  key={r.id}
                  href={`/app/money/receipts/${encodeURIComponent(r.id)}`}
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
        )}

        <div style={{ fontSize: 11, opacity: 0.22 }}>Stored in cloud.</div>
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