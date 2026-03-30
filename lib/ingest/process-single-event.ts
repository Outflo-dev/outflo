/* ==========================================================
   OUTFLO — PROCESS SINGLE INGEST EVENT
   File: lib/ingest/process-single-event.ts
   Scope: Parse one ingest_events row into one canonical receipt immediately
   Last Updated:
   - ms: 1774824638157
   - iso: 2026-03-29T22:50:38.157Z
   - note: extract direct single-event receipt creation for instant automatic ingest
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------
   Types
-------------------------------- */
export type IngestEventRow = {
  id: string;
  provider: string | null;
  received_at: string | null;
  message_id: string | null;
  event_id: string | null;
  user_id: string | null;
  claimed_at: string | null;
  processed_at: string | null;
  raw: any;
};

type ReceiptInsert = {
  id: string;
  receipt_no: number;
  user_id: string;
  moment_ms: number;
  amount_minor: number;
  currency: string;
  amount_base_minor: number;
  base_currency: string;
  fx_rate: number;
  merchant_raw: string;
  raw: any;
};

/* ------------------------------
   Constants
-------------------------------- */
const DEFAULT_CURRENCY = "USD";

/* ------------------------------
   Helpers
-------------------------------- */
function isoNow(): string {
  return new Date().toISOString();
}

function nextReceiptNo(): number {
  return Math.floor(1000000000000 + Math.random() * 9000000000000);
}

function extractCashAppSpend(subject: string): {
  amount_minor: number;
  merchant_raw: string;
} | null {
  const s = subject.trim();

  if (!s.startsWith("You spent $")) return null;

  const match = s.match(/^You spent \$([0-9]+\.[0-9]{2}) at (.+)$/);
  if (!match) return null;

  const dollars = Number.parseFloat(match[1]);
  if (!Number.isFinite(dollars)) return null;

  const amount_minor = Math.round(dollars * 100);
  if (!Number.isInteger(amount_minor) || amount_minor <= 0) return null;

  const merchant_raw = match[2].trim();
  if (!merchant_raw) return null;

  return { amount_minor, merchant_raw };
}

function extractReceiptMomentMs(ev: IngestEventRow): number {
  const rawCreatedAt = ev.raw?.data?.created_at;
  if (typeof rawCreatedAt === "string") {
    const ms = Date.parse(rawCreatedAt);
    if (Number.isFinite(ms)) return ms;
  }

  if (typeof ev.received_at === "string") {
    const ms = Date.parse(ev.received_at);
    if (Number.isFinite(ms)) return ms;
  }

  return Date.now();
}

function buildReceiptFromEvent(
  ev: IngestEventRow,
  userId: string
): ReceiptInsert | null {
  const subject = ev.raw?.data?.subject;
  if (typeof subject !== "string") return null;

  const parsed = extractCashAppSpend(subject);
  if (!parsed) return null;

  const moment_ms = extractReceiptMomentMs(ev);

  if (!Number.isFinite(moment_ms)) {
    throw new Error("Invalid moment_ms during ingest processing");
  }

  return {
    id: ev.id,
    receipt_no: nextReceiptNo(),
    user_id: userId,
    moment_ms,
    amount_minor: parsed.amount_minor,
    currency: DEFAULT_CURRENCY,
    amount_base_minor: parsed.amount_minor,
    base_currency: DEFAULT_CURRENCY,
    fx_rate: 1,
    merchant_raw: parsed.merchant_raw,
    raw: {
      source: "ingest",
      provider: ev.provider,
      event_id: ev.event_id,
      message_id: ev.message_id,
      received_at: ev.received_at,
      payload: ev.raw,
    },
  };
}

/* ------------------------------
   Main
-------------------------------- */
export async function processSingleEvent(params: {
  supabase: SupabaseClient;
  event: IngestEventRow;
}) {
  const { supabase, event } = params;

  if (!event.user_id) {
    await supabase
      .from("ingest_events")
      .update({ process_error: "Missing user_id" } as any)
      .eq("id", event.id);

    return;
  }

  const receipt = buildReceiptFromEvent(event, event.user_id);

  if (!receipt) {
    await supabase
      .from("ingest_events")
      .update({
        processed_at: new Date().toISOString(),
        claimed_at: null,
      } as any)
      .eq("id", event.id);

    return;
  }

  await supabase
    .from("receipts")
    .upsert(receipt as any, { onConflict: "id" });

  await supabase
    .from("ingest_events")
    .update({
      processed_at: new Date().toISOString(),
      claimed_at: null,
      receipt_id: receipt.id,
    } as any)
    .eq("id", event.id);
}