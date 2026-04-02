/* ==========================================================
   OUTFLO — TIME AGGREGATION
   File: lib/time/aggregation.ts
   Scope: Aggregate canonical receipt outflow over UTC-derived temporal bounds
   Last Updated:
   - ms: 1775096572633
   - iso: 2026-04-02T02:22:52.633Z
   - note: time computation build — aggregate receipts over pure bounds
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { TimeBounds } from "@/lib/time/bounds";

/* ------------------------------
   Types
-------------------------------- */

export type TimeAggregationResult = {
  start_ms: number;
  end_ms: number;
  receipt_count: number;
  total_outflow_minor: number;
};

type ReceiptAmountRow = {
  amount_minor: number | null;
};

/* ------------------------------
   Guards
-------------------------------- */

function assertUserId(user_id: string) {
  if (!user_id || typeof user_id !== "string") {
    throw new Error("Invalid user_id");
  }
}

function assertBounds(bounds: TimeBounds) {
  if (!Number.isFinite(bounds.start_ms) || !Number.isFinite(bounds.end_ms)) {
    throw new Error("Invalid bounds");
  }

  if (bounds.end_ms <= bounds.start_ms) {
    throw new Error("Invalid bounds: end_ms must be greater than start_ms");
  }
}

/* ------------------------------
   Helpers
-------------------------------- */

function sumAmountMinor(rows: ReceiptAmountRow[]): number {
  return rows.reduce((sum, row) => sum + (row.amount_minor ?? 0), 0);
}

/* ------------------------------
   Aggregation
-------------------------------- */

export async function aggregateOutflowBetween(params: {
  supabase: SupabaseClient;
  user_id: string;
  bounds: TimeBounds;
}): Promise<TimeAggregationResult> {
  const { supabase, user_id, bounds } = params;

  assertUserId(user_id);
  assertBounds(bounds);

  const { data, error } = await supabase
    .from("receipts")
    .select("amount_minor")
    .eq("user_id", user_id)
    .gte("moment_ms", bounds.start_ms)
    .lt("moment_ms", bounds.end_ms);

  if (error) {
    throw new Error(`Failed to aggregate receipts: ${error.message}`);
  }

  const rows = ((data ?? []) as unknown[]) as ReceiptAmountRow[];

  return {
    start_ms: bounds.start_ms,
    end_ms: bounds.end_ms,
    receipt_count: rows.length,
    total_outflow_minor: sumAmountMinor(rows),
  };
}