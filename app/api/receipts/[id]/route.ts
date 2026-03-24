/* ==========================================================
   OUTFLO — RECEIPT BY ID API
   File: app/api/receipts/[id]/route.ts
   Scope: Fetch single receipt (user-scoped, cloud truth)
   Last Updated:
   - ms: 1774324819434
   - iso: 2026-03-24T04:00:19.434Z
   - note: Phase C read alignment
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Metadata
-------------------------------- */
export const dynamic = "force-dynamic";

/* ------------------------------
   Helpers
-------------------------------- */
function jsonNoStore(payload: unknown, status = 200) {
  const response = NextResponse.json(payload, { status });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

/* ------------------------------
   GET — Receipt By ID
-------------------------------- */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return jsonNoStore({ error: "unauthorized" }, 401);
  }

  const { id } = await context.params;
  const decodedId = id ? decodeURIComponent(id) : "";

  if (!decodedId) {
    return jsonNoStore({ error: "missing id" }, 400);
  }

  const { data, error } = await supabase
    .from("receipts")
    .select("id, moment_ms, merchant_raw, amount_minor, currency")
    .eq("user_id", user.id)
    .eq("id", decodedId)
    .single();

  if (error || !data) {
    return jsonNoStore({ error: "not found" }, 404);
  }

  return jsonNoStore({ receipt: data });
}