/* ==========================================================
   OUTFLO — PROCESS SINGLE INGEST EVENT
   File: lib/ingest/process-single-event.ts
   Scope: Parse one ingest_events row into one canonical receipt immediately
   Last Updated:
   - ms: 1775079336492
   - iso: 2026-04-01T21:35:36.492Z
   - note: restore verified receipt write path with explicit result contract and db error handling
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
  receipt_id?: string | null;
  process_error?: string | null;
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

export type ProcessSingleEventResult =
  | {
      ok: true;
      status: "receipt_created";
      receipt_id: string;
      processed_at: string;
    }
  | {
      ok: true;
      status: "already_processed";
      receipt_id: string | null;
      processed_at: string | null;
    }
  | {
      ok: true;
      status: "non_spend";
      processed_at: string;
    }
  | {
      ok: false;
      status: "missing_user" | "db_error";
      process_error: string;
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

  const match = s.match(/You spent \$([0-9]+\.[0-9]{2}) at (.+)/i);
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
    id: crypto.randomUUID(),
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

async function writeProcessError(
  supabase: SupabaseClient,
  eventId: string,
  process_error: string
): Promise<void> {
  await supabase
    .from("ingest_events")
    .update({
      process_error,
      claimed_at: null,
    } as any)
    .eq("id", eventId);
}

/* ------------------------------
   Main
-------------------------------- */
export async function processSingleEvent(params: {
  supabase: SupabaseClient;
  event: IngestEventRow;
}): Promise<ProcessSingleEventResult> {
  const { supabase, event } = params;

  if (event.processed_at) {
    return {
      ok: true,
      status: "already_processed",
      receipt_id: event.receipt_id ?? null,
      processed_at: event.processed_at,
    };
  }

  if (!event.user_id) {
    const process_error = "Missing user_id on ingest event";

    await writeProcessError(supabase, event.id, process_error);

    return {
      ok: false,
      status: "missing_user",
      process_error,
    };
  }

  let receipt: ReceiptInsert | null;

  try {
    receipt = buildReceiptFromEvent(event, event.user_id);
  } catch (error: any) {
    const process_error =
      error?.message || "Failed to build receipt from ingest event";

    await writeProcessError(supabase, event.id, process_error);

    return {
      ok: false,
      status: "db_error",
      process_error,
    };
  }

  if (!receipt) {
    const processed_at = isoNow();

    const { error: finalizeErr } = await supabase
      .from("ingest_events")
      .update({
        processed_at,
        claimed_at: null,
        process_error: null,
        receipt_id: null,
      } as any)
      .eq("id", event.id)
      .is("processed_at", null);

    if (finalizeErr) {
      return {
        ok: false,
        status: "db_error",
        process_error: finalizeErr.message,
      };
    }

    return {
      ok: true,
      status: "non_spend",
      processed_at,
    };
  }

  const { error: upsertErr } = await supabase
    .from("receipts")
    .upsert(receipt as any, { onConflict: "id" });

  if (upsertErr) {
    await writeProcessError(supabase, event.id, upsertErr.message);

    return {
      ok: false,
      status: "db_error",
      process_error: upsertErr.message,
    };
  }

  const processed_at = isoNow();

  const { error: finalizeErr } = await supabase
    .from("ingest_events")
    .update({
      processed_at,
      claimed_at: null,
      process_error: null,
      receipt_id: receipt.id,
    } as any)
    .eq("id", event.id)
    .is("processed_at", null);

  if (finalizeErr) {
    await writeProcessError(
      supabase,
      event.id,
      `Receipt written but ingest finalization failed: ${finalizeErr.message}`
    );

    return {
      ok: false,
      status: "db_error",
      process_error: finalizeErr.message,
    };
  }

  return {
    ok: true,
    status: "receipt_created",
    receipt_id: receipt.id,
    processed_at,
  };
}