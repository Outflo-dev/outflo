/* ==========================================================
   OUTFLO — PROCESS INGEST EVENTS
   File: app/api/admin/process-ingest/route.ts
   Scope: Claim ingest_events, bind user via ingest_aliases, upsert into receipts, mark processed_at
   Last Updated:
   - ms: 1774327877516
   - iso: 2026-03-24T04:51:17.516Z
   - note: Phase D write alignment
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

type DbErrorLike = {
  message?: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
};

/* ------------------------------
   Constants
-------------------------------- */
export const runtime = "nodejs";

const PROVIDER = "resend";
const DEFAULT_LIMIT = 25;
const DEFAULT_CURRENCY = "USD";

/* ------------------------------
   Helpers
-------------------------------- */
function envOrNull(key: string): string | null {
  const v = process.env[key];
  if (!v) return null;
  const t = v.trim();
  return t.length ? t : null;
}

function isoNow(): string {
  return new Date().toISOString();
}

function bad(status: number, payload: any) {
  return NextResponse.json(payload, { status });
}

function supabaseService() {
  const url =
    envOrNull("SUPABASE_URL") || envOrNull("NEXT_PUBLIC_SUPABASE_URL");
  const key = envOrNull("SUPABASE_SERVICE_ROLE_KEY");

  if (!url) {
    return {
      ok: false as const,
      where: "env" as const,
      message: "Missing SUPABASE_URL",
    };
  }

  if (!key) {
    return {
      ok: false as const,
      where: "env" as const,
      message: "Missing SUPABASE_SERVICE_ROLE_KEY",
    };
  }

  return {
    ok: true as const,
    client: createClient(url, key, { auth: { persistSession: false } }),
  };
}

function getVaultKey(req: Request): string | null {
  const h = req.headers.get("x-outflo-vault-key");
  if (!h) return null;
  const t = h.trim();
  return t.length ? t : null;
}

function mustInt(v: string | null, fallback: number): number {
  if (!v) return fallback;
  const n = parseInt(v, 10);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}

function extractLocalPartFromRaw(raw: any): string | null {
  const from = raw?.data?.from;
  if (typeof from !== "string") return null;

  const m = from.match(/<([^>]+)>/);
  const addr = (m ? m[1] : from).trim().toLowerCase();
  const at = addr.indexOf("@");
  if (at <= 0) return null;

  const local = addr.slice(0, at).trim();
  return local.length ? local : null;
}

function extractReceiptMerchantRaw(raw: any): string {
  const subject = raw?.data?.subject;
  if (typeof subject === "string" && subject.trim().length) {
    return subject.trim();
  }

  const type = raw?.type;
  if (typeof type === "string" && type.trim().length) {
    return type.trim();
  }

  return "ingest";
}

function extractReceiptMomentMs(ev: IngestEventRow): number {
  if (ev.received_at) {
    const ms = Date.parse(ev.received_at);
    if (Number.isFinite(ms)) return ms;
  }

  return Date.now();
}

function extractReceiptAmountMinor(_raw: any): number {
  return 0;
}

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(req: Request) {
  const expectedVault = envOrNull("OUTFLO_VAULT_KEY");
  const providedVault = getVaultKey(req);

  if (expectedVault) {
    if (!providedVault || providedVault !== expectedVault) {
      return bad(401, {
        ok: false,
        where: "auth",
        message: "Invalid vault key",
      });
    }
  } else {
    return bad(500, {
      ok: false,
      where: "env",
      message: "Missing OUTFLO_VAULT_KEY",
    });
  }

  const svc = supabaseService();
  if (!svc.ok) {
    return bad(500, {
      ok: false,
      where: svc.where,
      message: svc.message,
    });
  }

  const supabase = svc.client;

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
      message: fetchErr.message,
      step: "fetch_events",
    });
  }

  const rows = (events || []) as IngestEventRow[];

  let scanned = 0;
  let claimed = 0;
  let skipped_claimed = 0;
  let bound = 0;
  let upserted = 0;
  let processed = 0;

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
        message: claimErr.message,
        step: "claim_event",
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
      const localPart = extractLocalPartFromRaw(ev.raw);

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
            message: aliasErr.message,
            step: "lookup_alias",
            local_part: localPart,
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
              message: bindErr.message,
              step: "bind_user",
            });
          }

          bound += 1;
        }
      }
    }

    if (!userId) {
      await supabase
        .from("ingest_events")
        .update({ claimed_at: null } as any)
        .eq("id", ev.id);
      continue;
    }

    const receiptId = ev.id;
    const moment_ms = extractReceiptMomentMs(ev);
    const merchant_raw = extractReceiptMerchantRaw(ev.raw);
    const amount_minor = extractReceiptAmountMinor(ev.raw);
    const raw = {
      source: "ingest",
      provider: ev.provider,
      event_id: ev.event_id,
      message_id: ev.message_id,
      received_at: ev.received_at,
      payload: ev.raw,
    };

  if (
  !Number.isFinite(moment_ms) ||
  !merchant_raw ||
  !Number.isFinite(amount_minor) ||
  !Number.isInteger(amount_minor) ||
  amount_minor <= 0
) {
  throw new Error("Invalid canonical receipt fields during ingest processing");
}

const currency = DEFAULT_CURRENCY;
const base_currency = DEFAULT_CURRENCY;
const fx_rate = 1;
const amount_base_minor = amount_minor;

const receipt_no =
  Math.floor(1000000000000 + Math.random() * 9000000000000);

const { error: upsertErr } = await supabase
  .from("receipts")
  .upsert(
    {
      id: receiptId,
      receipt_no,
      user_id: userId,
      moment_ms,
      amount_minor,
      currency,
      amount_base_minor,
      base_currency,
      fx_rate,
      merchant_raw,
      raw,
    } as any,
    { onConflict: "id" }
  );

    if (upsertErr) {
      const e = upsertErr as DbErrorLike;

      await supabase
        .from("ingest_events")
        .update({ claimed_at: null } as any)
        .eq("id", ev.id);

      return bad(500, {
        ok: false,
        where: "db",
        message: e.message || "Receipt upsert failed",
        code: e.code || null,
        step: "upsert_receipt",
      });
    }

    upserted += 1;

    const processedAt = isoNow();

    const { error: markErr } = await supabase
      .from("ingest_events")
      .update({ processed_at: processedAt, claimed_at: null } as any)
      .eq("id", ev.id)
      .is("processed_at", null);

    if (markErr) {
      return bad(500, {
        ok: false,
        where: "db",
        message: markErr.message,
        step: "mark_processed",
      });
    }

    processed += 1;
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
      upserted,
      processed,
      version: "process-ingest-v3-canonical",
      note: "Concurrency sealed via ingest_events.claimed_at; completion uses processed_at.",
    },
    { status: 200 }
  );
}