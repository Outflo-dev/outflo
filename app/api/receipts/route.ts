/* ==========================================================
   OUTFLO — RECEIPTS API
   File: app/api/receipts/route.ts
   Scope: List receipts and create one receipt (user-scoped, cloud truth)
   Last Updated:
   - ms: 1774327678082
   - iso: 2026-03-24T04:47:58.082Z
   - note: Phase D write alignment
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type CreateReceiptBody = {
  merchant_raw?: unknown;
  amount_minor?: unknown;
  currency?: unknown;
  moment_ms?: unknown;
};

/* ------------------------------
   Helpers
-------------------------------- */
function json(payload: unknown, status = 200) {
  return NextResponse.json(payload, { status });
}

function parseCreateReceiptBody(body: CreateReceiptBody | null) {
  const merchant_raw =
    typeof body?.merchant_raw === "string" ? body.merchant_raw.trim() : "";

  const amount_minor =
    typeof body?.amount_minor === "number" ? body.amount_minor : NaN;

  const currency =
    typeof body?.currency === "string" ? body.currency.trim().toUpperCase() : "";

  const moment_ms =
    typeof body?.moment_ms === "number" ? body.moment_ms : Date.now();

  return {
    merchant_raw,
    amount_minor,
    currency,
    moment_ms,
  };
}

/* ------------------------------
   GET — List Receipts
-------------------------------- */
export async function GET() {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return json({ error: "unauthorized" }, 401);
  }

  const { data, error } = await supabase
    .from("receipts")
    .select("id, moment_ms, merchant_raw, amount_minor, currency")
    .eq("user_id", user.id)
    .order("moment_ms", { ascending: false })
    .limit(500);

  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({ receipts: data ?? [] });
}

/* ------------------------------
   POST — Create Receipt
-------------------------------- */
export async function POST(request: Request) {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return json({ error: "unauthorized" }, 401);
  }

  const body = (await request.json().catch(() => null)) as CreateReceiptBody | null;

  const {
    merchant_raw,
    amount_minor,
    currency,
    moment_ms,
  } = parseCreateReceiptBody(body);

  if (
    !merchant_raw ||
    !Number.isFinite(amount_minor) ||
    !Number.isInteger(amount_minor) ||
    !currency ||
    !Number.isFinite(moment_ms)
  ) {
    return json({ error: "invalid payload" }, 400);
  }

  const { data, error } = await supabase
    .from("receipts")
    .insert({
      user_id: user.id,
      merchant_raw,
      amount_minor,
      currency,
      moment_ms,
    })
    .select("id, moment_ms, merchant_raw, amount_minor, currency")
    .single();

  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({ receipt: data });
}