/* ==========================================================
   OUTFLO — PROCESS INGEST EVENTS
   File: app/api/admin/process-ingest/route.ts
   Scope: Claim ingest_events, bind user via ingest_aliases, create canonical receipts, mark processed_at
   Last Updated:
   - ms: 1774797630902
   - iso: 2026-03-29T15:20:30.902Z
   - note: Cash App parsing + canonical receipt builder + alias fix (to[0]) + strict finalization accounting
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/* ------------------------------
   Types
-------------------------------- */
type IngestEventRow = {
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

type AliasRow = {
  user_id: string;
  is_active: boolean;
  type: string | null;
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
export const runtime = "nodejs";

const PROVIDER = "resend";
const DEFAULT_LIMIT = 25;
const DEFAULT_CURRENCY = "USD";

/* ------------------------------
   Helpers — Core
-------------------------------- */
function isoNow(): string {
  return new Date().toISOString();
}

function bad(status: number, payload: any) {
  return NextResponse.json(payload, { status });
}

function mustInt(v: string | null, fallback: number): number {
  if (!v) return fallback;
  const n = parseInt(v, 10);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}

function getVaultKey(req: Request): string | null {
  const h = req.headers.get("x-outflo-vault-key");
  return h?.trim() || null;
}

function nextReceiptNo(): number {
  return Math.floor(1000000000000 + Math.random() * 9000000000000);
}

/* ------------------------------
   Helpers — Alias
-------------------------------- */
function extractAliasLocalPartFromRaw(raw: any): string | null {
  const to = raw?.data?.to;
  if (!Array.isArray(to) || to.length === 0) return null;

  const addr = String(to[0]).trim().toLowerCase();
  const at = addr.indexOf("@");
  if (at <= 0) return null;

  const local = addr.slice(0, at).trim();
  return local.length ? local : null;
}

/* ------------------------------
   Helpers — Cash App Parsing
-------------------------------- */
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

/* ------------------------------
   Helpers — Time
-------------------------------- */
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

/* ------------------------------
   Helpers — Receipt Builder
-------------------------------- */
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
   Handler
-------------------------------- */
export async function POST(req: Request) {
  const expectedVault = process.env.OUTFLO_VAULT_KEY;
  const providedVault = getVaultKey(req);

  if (!expectedVault || providedVault !== expectedVault) {
    return bad(401, {
      ok: false,
      where: "auth",
      message: "Invalid vault key",
    });
  }

  const supabase = createAdminClient();

  const url = new URL(req.url);
  const limit = mustInt(url.searchParams.get("limit"), DEFAULT_LIMIT);

  const { data: events, error: fetchErr } = await supabase
    .from("ingest_events")
    .select(
      "id, provider, received_at, message_id, event_id, user_id, claimed_at, processed_at, raw"
    )
    .eq("provider", PROVIDER)
    .is("processed_at", null)
    .is("claimed_at", null)
    .order("received_at", { ascending: true })
    .limit(limit);

  if (fetchErr) {
    return bad(500, {
      ok: false,
      where: "db",
      step: "fetch_events",
      message: fetchErr.message,
    });
  }

  const rows = (events || []) as IngestEventRow[];

  let scanned = 0;
  let claimed = 0;
  let skipped_claimed = 0;
  let bound = 0;
  let skipped_no_user = 0;
  let skipped_non_spend = 0;
  let receipt_upserted = 0;
  let marked_processed = 0;
  let finalize_failed = 0;

  for (const ev0 of rows) {
    scanned += 1;

    const claimAt = isoNow();

    const { data: claimedRow, error: claimErr } = await supabase
      .from("ingest_events")
      .update({ claimed_at: claimAt } as any)
      .eq("id", ev0.id)
      .is("processed_at", null)
      .is("claimed_at", null)
      .select(
        "id, provider, received_at, message_id, event_id, user_id, claimed_at, processed_at, raw"
      )
      .maybeSingle();

    if (claimErr) {
      return bad(500, {
        ok: false,
        where: "db",
        step: "claim_event",
        event_id: ev0.id,
        message: claimErr.message,
      });
    }

    if (!claimedRow) {
      skipped_claimed += 1;
      continue;
    }

    claimed += 1;

    const ev = claimedRow as IngestEventRow;
    let userId = ev.user_id;

    if (!userId) {
      const localPart = extractAliasLocalPartFromRaw(ev.raw);

      if (localPart) {
        const { data: alias, error: aliasErr } = await supabase
          .from("ingest_aliases")
          .select("user_id, is_active, type")
          .eq("local_part", localPart)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (aliasErr) {
          await supabase
            .from("ingest_events")
            .update({ claimed_at: null } as any)
            .eq("id", ev.id);

          return bad(500, {
            ok: false,
            where: "db",
            step: "lookup_alias",
            event_id: ev.id,
            local_part: localPart,
            message: aliasErr.message,
          });
        }

        const a = alias as AliasRow | null;

        if (a?.user_id) {
          userId = a.user_id;

          const { error: bindErr } = await supabase
            .from("ingest_events")
            .update({ user_id: userId } as any)
            .eq("id", ev.id);

          if (bindErr) {
            await supabase
              .from("ingest_events")
              .update({ claimed_at: null } as any)
              .eq("id", ev.id);

            return bad(500, {
              ok: false,
              where: "db",
              step: "bind_user",
              event_id: ev.id,
              message: bindErr.message,
            });
          }

          bound += 1;
        }
      }
    }

    if (!userId) {
      skipped_no_user += 1;

      const { error: releaseErr } = await supabase
        .from("ingest_events")
        .update({ claimed_at: null } as any)
        .eq("id", ev.id);

      if (releaseErr) {
        return bad(500, {
          ok: false,
          where: "db",
          step: "release_unbound_event",
          event_id: ev.id,
          message: releaseErr.message,
        });
      }

      continue;
    }

    const receipt = buildReceiptFromEvent(ev, userId);

    if (!receipt) {
      skipped_non_spend += 1;

      const processedAt = isoNow();

      const { error: skipFinalizeErr } = await supabase
        .from("ingest_events")
        .update({ processed_at: processedAt, claimed_at: null } as any)
        .eq("id", ev.id)
        .is("processed_at", null);

      if (skipFinalizeErr) {
        finalize_failed += 1;

        return bad(500, {
          ok: false,
          where: "db",
          step: "finalize_non_spend",
          event_id: ev.id,
          message: skipFinalizeErr.message,
        });
      }

      marked_processed += 1;
      continue;
    }

    const { error: upsertErr } = await supabase
      .from("receipts")
      .upsert(receipt as any, { onConflict: "id" });

    if (upsertErr) {
      const { error: releaseErr } = await supabase
        .from("ingest_events")
        .update({ claimed_at: null } as any)
        .eq("id", ev.id);

      if (releaseErr) {
        return bad(500, {
          ok: false,
          where: "db",
          step: "release_after_upsert_failure",
          event_id: ev.id,
          message: releaseErr.message,
          upstream: upsertErr.message,
        });
      }

      return bad(500, {
        ok: false,
        where: "db",
        step: "upsert_receipt",
        event_id: ev.id,
        message: upsertErr.message,
      });
    }

    receipt_upserted += 1;

    const processedAt = isoNow();

    const { error: finalizeErr } = await supabase
      .from("ingest_events")
      .update({ processed_at: processedAt, claimed_at: null } as any)
      .eq("id", ev.id)
      .is("processed_at", null);

    if (finalizeErr) {
      finalize_failed += 1;

      return bad(500, {
        ok: false,
        where: "db",
        step: "mark_processed",
        event_id: ev.id,
        message: finalizeErr.message,
      });
    }

    marked_processed += 1;
  }

  return NextResponse.json(
    {
      ok: true,
      provider: PROVIDER,
      limit,
      scanned,
      claimed,
      skipped_claimed,
      bound,
      skipped_no_user,
      skipped_non_spend,
      receipt_upserted,
      marked_processed,
      finalize_failed,
      version: "process-ingest-v4-finalization",
      note: "Strict finalization accounting enabled.",
    },
    { status: 200 }
  );
}