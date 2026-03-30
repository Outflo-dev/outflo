/* ==========================================================
   OUTFLO — RESEND INGEST WEBHOOK
   File: app/api/ingest/resend/route.ts
   Scope: Receive Resend webhook, resolve alias, create receipt instantly
   Last Updated:
   - ms: 1774824638157
   - iso: 2026-03-29T22:50:38.157Z
   - note: remove async trigger and process event immediately
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  processSingleEvent,
  type IngestEventRow,
} from "@/lib/ingest/process-single-event";

/* ------------------------------
   Types
-------------------------------- */
type ResendWebhookPayload = {
  id?: string;
  created_at?: string;
  data?: {
    message_id?: string;
    to?: string[];
    subject?: string;
    [key: string]: any;
  };
};

/* ------------------------------
   Constants
-------------------------------- */
export const runtime = "nodejs";

/* ------------------------------
   Helpers
-------------------------------- */
function envOrNull(key: string): string | null {
  const v = process.env[key];
  return v?.trim() || null;
}

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(req: Request) {
  const url =
    envOrNull("SUPABASE_URL") || envOrNull("NEXT_PUBLIC_SUPABASE_URL");
  const key = envOrNull("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !key) {
    return NextResponse.json({ ok: false, message: "Missing env" }, { status: 500 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const payload = (await req.json()) as ResendWebhookPayload;

  const event_id = payload.id;
  const message_id = payload.data?.message_id;
  const to = payload.data?.to?.[0];

  if (!event_id || !to) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  const local_part = to.split("@")[0];

  const { data: alias } = await supabase
    .from("ingest_aliases")
    .select("user_id")
    .eq("local_part", local_part)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (!alias?.user_id) {
    return NextResponse.json({ ok: false, message: "Alias not found" }, { status: 404 });
  }

  const received_at = payload.created_at || new Date().toISOString();

  const { data: inserted } = await supabase
    .from("ingest_events")
    .insert({
      provider: "resend",
      event_id,
      message_id,
      received_at,
      raw: payload,
      user_id: alias.user_id,
    })
    .select("*")
    .single();

  const event = inserted as IngestEventRow;

  await processSingleEvent({
    supabase,
    event,
  });

  return NextResponse.json({ ok: true });
}