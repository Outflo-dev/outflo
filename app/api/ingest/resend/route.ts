/* ==========================================================
   OUTFLO — RESEND INGEST WEBHOOK
   File: app/api/ingest/resend/route.ts
   Scope: Receive Resend webhook, resolve alias, persist ingest event, enqueue ingest job
   Last Updated:
   - ms: <YOUR_MS>
   - iso: <YOUR_ISO>
   - note: convert resend ingest route to capture-and-enqueue only
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { enqueueIngestJob } from "@/lib/ingest/enqueue-ingest-job";

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
const VERSION = "ingest-resend-v11-capture-enqueue";

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
  } catch (error: any) {
    return { ok: false, error: error?.message || "invalid json" };
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

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length) {
      return candidate.trim();
    }
  }

  return null;
}

function extractMessageId(payload: ResendWebhookPayload): string | null {
  const candidates = [payload?.data?.message_id, payload?.data?.email_id];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length) {
      return candidate.trim();
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

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(req: Request) {
  const url =
    envOrNull("SUPABASE_URL") || envOrNull("NEXT_PUBLIC_SUPABASE_URL");
  const key = envOrNull("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !key) {
    return NextResponse.json(
      {
        ok: false,
        where: "env",
        message: "Missing Supabase environment",
        version: VERSION,
      },
      { status: 500 }
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

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
        event_id,
        local_part,
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
    .select("id, provider, received_at, message_id, event_id, user_id")
    .single();

  let eventId: string | null = null;
  let ingestStatus: "inserted" | "duplicate" = "inserted";

  if (insertErr) {
    const dbErr = insertErr as DbErrorLike;

    if (dbErr.code !== "23505") {
      return NextResponse.json(
        {
          ok: false,
          where: "db",
          step: "insert_ingest_event",
          message: dbErr.message || "Failed to insert ingest event",
          code: dbErr.code || null,
          version: VERSION,
        },
        { status: 500 }
      );
    }

    const { data: existing, error: existingErr } = await supabase
      .from("ingest_events")
      .select("id")
      .eq("event_id", event_id)
      .limit(1)
      .maybeSingle();

    if (existingErr) {
      return NextResponse.json(
        {
          ok: false,
          where: "db",
          step: "load_existing_ingest_event",
          message: existingErr.message,
          version: VERSION,
        },
        { status: 500 }
      );
    }

    if (!existing?.id) {
      return NextResponse.json(
        {
          ok: false,
          where: "db",
          step: "load_existing_ingest_event",
          message:
            "Duplicate ingest event detected, but existing row could not be loaded",
          version: VERSION,
        },
        { status: 500 }
      );
    }

    eventId = existing.id;
    ingestStatus = "duplicate";
  } else {
    eventId = inserted?.id ?? null;
  }

  if (!eventId) {
    return NextResponse.json(
      {
        ok: false,
        where: "db",
        step: "resolve_ingest_event_id",
        message: "Missing ingest event id after insert/load",
        version: VERSION,
      },
      { status: 500 }
    );
  }

  const enqueueResult = await enqueueIngestJob({
    supabase,
    ingestEventId: eventId,
  });

  if (!enqueueResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        where: "queue",
        step: "enqueue_ingest_job",
        ingest_event_id: eventId,
        event_id,
        message: enqueueResult.error,
        version: VERSION,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      version: VERSION,
      provider: PROVIDER,
      ingest_status: ingestStatus,
      ingest_event_id: eventId,
      event_id,
      message_id,
      user_id,
      job_id: enqueueResult.jobId,
      job_status: enqueueResult.status,
    },
    { status: 200 }
  );
}