/* ==========================================================
   OUTFLO — ADMIN EXPORT VIEWER
   File: app/admin/page.tsx
   Scope: View and restore exported receipts (cloud-aligned canonical format)
   Last Updated:
   - ms: 1774327226160
   - iso: 2026-03-24T04:40:26.160Z
   - note: Phase C read alignment
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */
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

type ExportPayloadV1 = {
  exportedAt: number;
  version: number;
  receipts: Receipt[];
};

/* ------------------------------
   Constants
-------------------------------- */
const STORAGE_KEY = "outflo_receipts_v1";
const BACKUP_KEY = "outflo_receipts_v1_backup";
const LAST_EXPORT_KEY = "outflo_last_export_v1";

/* ------------------------------
   Helpers
-------------------------------- */
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function pad3(n: number) {
  return String(n).padStart(3, "0");
}

function formatClock(ts: number) {
  const d = new Date(ts);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(
    d.getSeconds()
  )}:${pad3(d.getMilliseconds())}`;
}

function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

function formatReceiptTime(momentMs: number) {
  const d = new Date(momentMs);

  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${date} · ${time}`;
}

function safeParseExport(raw: string): ExportPayloadV1 | null {
  try {
    const p = JSON.parse(raw);

    if (!p || typeof p !== "object") return null;
    if (typeof p.version !== "number") return null;
    if (!Array.isArray(p.receipts)) return null;

    const receipts: Receipt[] = p.receipts.filter(
      (r: any) =>
        r &&
        typeof r.id === "string" &&
        typeof r.merchant_raw === "string" &&
        typeof r.amount_minor === "number" &&
        typeof r.currency === "string" &&
        typeof r.moment_ms === "number"
    );

    return {
      exportedAt: typeof p.exportedAt === "number" ? p.exportedAt : Date.now(),
      version: p.version,
      receipts,
    };
  } catch {
    return null;
  }
}

/** CSV escaping */
function csvEscape(v: string) {
  if (v.includes('"')) v = v.replace(/"/g, '""');
  const needsQuotes =
    v.includes(",") || v.includes("\n") || v.includes("\r") || v.includes('"');
  return needsQuotes ? `"${v}"` : v;
}

function receiptsToCsv(receipts: Receipt[]) {
  const header = [
    "moment_ms",
    "merchant_raw",
    "amount_minor",
    "currency",
    "id",
  ].join(",");

  const rows = receipts.map((r) => {
    const fields = [
      String(r.moment_ms),
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
   Component
-------------------------------- */
export default function ExportViewerPage() {
  const [clockTs, setClockTs] = useState(() => Date.now());
  const [payload, setPayload] = useState<ExportPayloadV1 | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => setClockTs(Date.now()), 50);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_EXPORT_KEY);
      if (!raw) return;
      const parsed = safeParseExport(raw);
      if (!parsed) return;
      setPayload(parsed);
    } catch {}
  }, []);

  const sortedReceipts = useMemo(() => {
    if (!payload) return [];
    return [...payload.receipts].sort(
      (a, b) => b.moment_ms - a.moment_ms
    );
  }, [payload]);

  async function onPickFile(file: File | null) {
    setError("");
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = safeParseExport(text);
      if (!parsed) {
        setError("Could not read this export file.");
        return;
      }
      setPayload(parsed);
    } catch {
      setError("Could not read this export file.");
    }
  }

  function exportCsv() {
    if (!payload) return;
    const csv = receiptsToCsv(sortedReceipts);
    downloadTextFile(
      `outflo_receipts_${Date.now()}.csv`,
      csv,
      "text/csv"
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
        padding: "max(24px, 6vh) 24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 760,
          marginInline: "auto",
          display: "grid",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/365/receipts">← Back</Link>
          <div>{formatClock(clockTs)}</div>
        </div>

        <input
          type="file"
          accept="application/json"
          onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
        />

        <button onClick={exportCsv} disabled={!payload}>
          Export CSV
        </button>

        {payload ? (
          <div style={{ display: "grid", gap: 12 }}>
            {sortedReceipts.map((r) => (
              <div key={r.id}>
                <div>{r.merchant_raw}</div>
                <div>{formatMoney(r.amount_minor, r.currency)}</div>
                <div>{formatReceiptTime(r.moment_ms)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>No data</div>
        )}
      </section>
    </main>
  );
}