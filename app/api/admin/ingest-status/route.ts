/* ==========================================================
   OUTFLO — ADMIN INGEST STATUS
   File: app/api/admin/ingest-status/route.ts
   Scope: Return quick operational health for ingest events, jobs, and recent receipts
   Last Updated:
   - ms: 1775079336492
   - iso: 2026-04-01T21:35:36.492Z
   - note: completion pass — add ingest status visibility route
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/* ------------------------------
   Constants
-------------------------------- */

const RECENT_LIMIT = 20;

/* ------------------------------
   Helpers
-------------------------------- */

async function getTableCount(
  supabase: Awaited<ReturnType<typeof createAdminClient>>,
  table: string
) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error(`${table} count failed: ${error.message}`);
  }

  return count ?? 0;
}

async function getIngestEventCounts(
  supabase: Awaited<ReturnType<typeof createAdminClient>>
) {
  const totalPromise = supabase
    .from("ingest_events")
    .select("*", { count: "exact", head: true });

  const processedPromise = supabase
    .from("ingest_events")
    .select("*", { count: "exact", head: true })
    .not("processed_at", "is", null);

  const failedPromise = supabase
    .from("ingest_events")
    .select("*", { count: "exact", head: true })
    .not("process_error", "is", null);

  const pendingPromise = supabase
    .from("ingest_events")
    .select("*", { count: "exact", head: true })
    .is("processed_at", null)
    .is("process_error", null);

  const claimedPromise = supabase
    .from("ingest_events")
    .select("*", { count: "exact", head: true })
    .is("processed_at", null)
    .not("claimed_at", "is", null);

  const [total, processed, failed, pending, claimed] = await Promise.all([
    totalPromise,
    processedPromise,
    failedPromise,
    pendingPromise,
    claimedPromise,
  ]);

  for (const result of [total, processed, failed, pending, claimed]) {
    if (result.error) {
      throw new Error(`ingest_events count failed: ${result.error.message}`);
    }
  }

  return {
    total: total.count ?? 0,
    processed: processed.count ?? 0,
    failed: failed.count ?? 0,
    pending: pending.count ?? 0,
    claimed_unprocessed: claimed.count ?? 0,
  };
}

/* ------------------------------
   Handler
-------------------------------- */

export async function GET() {
  try {
    const supabase = await createAdminClient();

    const [
      ingestEventCounts,
      ingestJobCount,
      receiptCount,
      recentEventsResult,
      recentJobsResult,
      recentReceiptsResult,
    ] = await Promise.all([
      getIngestEventCounts(supabase),
      getTableCount(supabase, "ingest_jobs"),
      getTableCount(supabase, "receipts"),

      supabase
        .from("ingest_events")
        .select(
          [
            "id",
            "user_id",
            "provider",
            "event_id",
            "message_id",
            "received_at",
            "claimed_at",
            "processed_at",
            "receipt_id",
            "process_error",
          ].join(", ")
        )
        .order("received_at", { ascending: false })
        .limit(RECENT_LIMIT),

      supabase
        .from("ingest_jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(RECENT_LIMIT),

      supabase
        .from("receipts")
        .select(
          [
            "id",
            "receipt_no",
            "user_id",
            "moment_ms",
            "amount_minor",
            "currency",
            "merchant_raw",
            "created_at",
          ].join(", ")
        )
        .order("created_at", { ascending: false })
        .limit(RECENT_LIMIT),
    ]);

    if (recentEventsResult.error) {
      throw new Error(
        `recent ingest_events query failed: ${recentEventsResult.error.message}`
      );
    }

    if (recentJobsResult.error) {
      throw new Error(
        `recent ingest_jobs query failed: ${recentJobsResult.error.message}`
      );
    }

    if (recentReceiptsResult.error) {
      throw new Error(
        `recent receipts query failed: ${recentReceiptsResult.error.message}`
      );
    }

    const recentEvents = recentEventsResult.data ?? [];
    const recentJobs = recentJobsResult.data ?? [];
    const recentReceipts = recentReceiptsResult.data ?? [];

    return NextResponse.json({
      ok: true,
      status: {
        ingest_events: ingestEventCounts,
        ingest_jobs: {
          total: ingestJobCount,
        },
        receipts: {
          total: receiptCount,
        },
      },
      recent: {
        ingest_events: recentEvents,
        ingest_jobs: recentJobs,
        receipts: recentReceipts,
      },
      now: {
        ms: Date.now(),
        iso: new Date().toISOString(),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown ingest status error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}