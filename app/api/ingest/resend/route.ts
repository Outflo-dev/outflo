/* ==========================================================
   OUTFLO — RESEND INGEST WEBHOOK
   File: app/api/ingest/resend/route.ts
   Scope: Receive Resend webhook, resolve ingest alias, persist canonical ingest_events row, and await processing handoff
   Last Updated:
   - ms: 1774820880798
   - iso: 2026-03-29T21:48:00.798Z
   - note: replace unreliable fire-and-forget trigger with awaited processing handoff
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ------------------------------
   Types
-------------------------------- */
type ResendWebhookPayload = {
  id?: string;
  type?: string;
  created_at?: string;
  data?: {
    email_id?: string;
    message_id?: string;
    from?: string;
    to?: string[];
    subject?: string;
    [key: string]: any;
  };
  [key: string]: any;
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
const VERSION = "ingest-resend-v8-capture-plus-awaited-trigger";

/* ------------------------------
   Helpers
-------------------------------- */
function envOrNull(key: string): string | null {
  const v = process.env[key];
  if (!v) return null;
  const t = v.trim();
  return t.length ? t : null;
}

function safeJsonParse<T>(
  raw: string
): { ok: true; value: T } | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(raw) as T };
  } catch (e: any) {
    return { ok: false, error: e?.message || "invalid json" };
  }
}

function isoNow(): string {
  return new Date().toISOString();
}

function pickReceivedAt(payload: ResendWebhookPayload): string {
  if (typeof payload?.created_at === "string" && payload.created_at.trim()) {
    return payload.created_at.trim();
  }

  return isoNow();
}

function extractEventId(payload: ResendWebhookPayload): string | null {
  const candidates = [payload?.id, payload?.data?.email_id];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length) {
      return c.trim();
    }
  }

  return null;
}

function extractMessageId(payload: ResendWebhookPayload): string | null {
  const candidates = [payload?.data?.message_id, payload?.data?.email_id];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length) {
      return c.trim();
    }
  }

  return null;
}

function extractAliasLocalPart(payload: ResendWebhookPayload): string | null {
  const to = payload?.data?.to;
  if (!Array.isArray(to) || to.length === 0) return null;

  for (const addr of to) {
    if (typeof addr !== "string") continue;

    const trimmed = addr.trim().toLowerCase();
    const at = trimmed.indexOf("@");
    if (at <= 0) continue;

    const local = trimmed.slice(0, at).trim();
    if (local.length) return local;
  }

  return null;
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

function getBaseUrl(req: Request): string | null {
  const envUrl =
    envOrNull("APP_URL") ||
    envOrNull("NEXT_PUBLIC_APP_URL") ||
    envOrNull("VERCEL_PROJECT_PRODUCTION_URL") ||
    envOrNull("VERCEL_URL");

  if (envUrl) {
    const normalized = envUrl.startsWith("http")
      ? envUrl
      : `https://${envUrl}`;
    return normalized.replace(/\/+$/, "");
  }

  try {
    const url = new URL(req.url);
    return `${url.protocol}//${url.host}`;
  } catch {
    return null;
  }
}

async function triggerProcessing(req: Request) {
  const baseUrl = getBaseUrl(req);
  const vaultKey = envOrNull("OUTFLO_VAULT_KEY");

  if (!baseUrl || !vaultKey) {
    return {
      ok: false as const,
      where: "trigger",
      message: "Missing base URL or vault key",
    };
  }

  const target = `${baseUrl}/api/admin/process-ingest`;

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: {
        "x-outflo-vault-key": vaultKey,
      },
      cache: "no-store",
    });

    const text = await res.text().catch(() => "");

    if (!res.ok) {
      return {
        ok: false as const,
        where: "trigger",
        message: `Processing trigger failed (${res.status})`,
        status: res.status,
        body: text || null,
      };
    }

    return {
      ok: true as const,
      status: res.status,
      body: text || null,
    };
  } catch (e: any) {
    return {
      ok: false as const,
      where: "trigger",
      message: e?.message || "Processing trigger request failed",
    };
  }
}

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(req: Request) {
  const svc = supabaseService();

  if (!svc.ok) {
    return NextResponse.json(
      {
        ok: false,
        where: svc.where,
        message: svc.message,
        version: VERSION,
      },
      { status: 500 }
    );
  }

  const supabase = svc.client;

  const rawText = await req.text();
  const parsed = safeJsonParse<ResendWebhookPayload>(rawText);

  if (!parsed.ok) {
    return NextResponse.json(
      {
        ok: false,
        where: "payload",
        message: parsed.error,
        version: VERSION,
      },
      { status: 400 }
    );
  }

  const payload = parsed.value;

  const event_id = extractEventId(payload);
  const message_id = extractMessageId(payload);
  const local_part = extractAliasLocalPart(payload);
  const received_at = pickReceivedAt(payload);

  if (!event_id || !local_part) {
    return NextResponse.json(
      {
        ok: false,
        where: "payload",
        message: "Missing required fields",
        version: VERSION,
      },
      { status: 400 }
    );
  }

  const { data: aliasRow, error: aliasErr } = await supabase
    .from("ingest_aliases")
    .select("user_id")
    .eq("local_part", local_part)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (aliasErr) {
    return NextResponse.json(
      {
        ok: false,
        where: "db",
        step: "lookup_alias",
        local_part,
        message: aliasErr.message,
        version: VERSION,
      },
      { status: 500 }
    );
  }

  if (!aliasRow?.user_id) {
    return NextResponse.json(
      {
        ok: false,
        where: "alias",
        message: "No active alias",
        local_part,
        version: VERSION,
      },
      { status: 404 }
    );
  }

  const user_id = aliasRow.user_id;

  const { data: inserted, error: insertErr } = await supabase
    .from("ingest_events")
    .insert({
      provider: PROVIDER,
      event_id,
      message_id,
      received_at,
      raw: payload,
      user_id,
    })
    .select(
      "id, provider, event_id, message_id, received_at, user_id, processed_at, claimed_at"
    )
    .single();

  if (insertErr) {
    const e = insertErr as DbErrorLike;

    if (e.code === "23505") {
      const trigger = await triggerProcessing(req);

      return NextResponse.json(
        {
          ok: true,
          deduped: true,
          provider: PROVIDER,
          event_id,
          message_id,
          user_id,
          trigger_ok: trigger.ok,
          trigger_message: trigger.ok ? "Processing trigger completed." : trigger.message,
          version: VERSION,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        where: "db",
        step: "insert_ingest_event",
        message: e.message || "Failed to insert ingest event",
        code: e.code || null,
        version: VERSION,
      },
      { status: 500 }
    );
  }

  const trigger = await triggerProcessing(req);

  return NextResponse.json(
    {
      ok: true,
      provider: PROVIDER,
      ingest_event_id: inserted.id,
      event_id: inserted.event_id,
      message_id: inserted.message_id,
      user_id: inserted.user_id,
      received_at: inserted.received_at,
      processed_at: inserted.processed_at,
      claimed_at: inserted.claimed_at,
      trigger_ok: trigger.ok,
      trigger_message: trigger.ok ? "Processing trigger completed." : trigger.message,
      version: VERSION,
      note: "Capture complete; processing handoff awaited.",
    },
    { status: 200 }
  );
}