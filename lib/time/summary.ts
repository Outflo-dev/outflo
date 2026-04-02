/* ==========================================================
   OUTFLO — TIME SUMMARY
   File: lib/time/summary.ts
   Scope: Compose UTC-pure temporal bounds and receipt aggregation into reusable summary outputs
   Last Updated:
   - ms: 1775096572633
   - iso: 2026-04-02T02:22:52.633Z
   - note: time computation build — add orbit summary to canonical time outputs
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getCurrentOrbitBounds,
  getExplicitBounds,
  getSinceEpochBounds,
  type TimeBounds,
} from "@/lib/time/bounds";
import {
  aggregateOutflowBetween,
  type TimeAggregationResult,
} from "@/lib/time/aggregation";

/* ------------------------------
   Types
-------------------------------- */

export type TimeSummaryResult = {
  since_epoch: TimeAggregationResult;
  orbit_current: TimeAggregationResult;
};

export type BuildTimeSummaryParams = {
  supabase: SupabaseClient;
  user_id: string;
  epoch_ms: number;
  now_ms?: number;
};

export type AggregateExplicitRangeSummaryParams = {
  supabase: SupabaseClient;
  user_id: string;
  start_ms: number;
  end_ms: number;
};

/* ------------------------------
   Guards
-------------------------------- */

function assertUserId(user_id: string) {
  if (!user_id || typeof user_id !== "string") {
    throw new Error("Invalid user_id");
  }
}

function assertEpochMs(epoch_ms: number) {
  if (!Number.isFinite(epoch_ms)) {
    throw new Error("Invalid epoch_ms");
  }
}

/* ------------------------------
   Summary
-------------------------------- */

export async function buildTimeSummary(
  params: BuildTimeSummaryParams
): Promise<TimeSummaryResult> {
  const { supabase, user_id, epoch_ms, now_ms } = params;

  assertUserId(user_id);
  assertEpochMs(epoch_ms);

  const sinceEpochBounds = getSinceEpochBounds({
    epoch_ms,
    now_ms,
  });

  const currentOrbitBounds = getCurrentOrbitBounds({
    epoch_ms,
    now_ms,
  });

  const [since_epoch, orbit_current] = await Promise.all([
    aggregateOutflowBetween({
      supabase,
      user_id,
      bounds: sinceEpochBounds,
    }),
    aggregateOutflowBetween({
      supabase,
      user_id,
      bounds: currentOrbitBounds,
    }),
  ]);

  return {
    since_epoch,
    orbit_current,
  };
}

export async function aggregateExplicitRangeSummary(
  params: AggregateExplicitRangeSummaryParams
): Promise<TimeAggregationResult> {
  const bounds: TimeBounds = getExplicitBounds({
    start_ms: params.start_ms,
    end_ms: params.end_ms,
  });

  return aggregateOutflowBetween({
    supabase: params.supabase,
    user_id: params.user_id,
    bounds,
  });
}