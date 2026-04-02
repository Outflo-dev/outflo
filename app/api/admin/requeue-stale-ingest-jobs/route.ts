/* ==========================================================
   OUTFLO — ADMIN REQUEUE STALE INGEST JOBS
   File: app/api/admin/requeue-stale-ingest-jobs/route.ts
   Scope: Requeue stale claimed ingest jobs that are safe to retry
   Last Updated:
   - ms: 1775095047608
   - iso: 2026-04-02T01:57:27.608Z
   - note: completion pass — add stale ingest job requeue admin route
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getNextAttemptIso,
  shouldRequeueIngestJob,
  type IngestJobRow,
} from "@/lib/ingest/job-state";

/* ------------------------------
   Types
-------------------------------- */

type RequeueBody = {
  limit?: number;
};

type RequeueResult = {
  job_id: string;
  ingest_event_id: string;
  ok: boolean;
  previous_status: string | null;
  next_status: string | null;
  next_attempt_at: string | null;
  reason: string | null;
};

/* ------------------------------
   Constants
-------------------------------- */

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

/* ------------------------------
   Helpers
-------------------------------- */

function normalizeLimit(value: unknown): number {
  const n =
    typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);

  if (!Number.isFinite(n) || n <= 0) {
    return DEFAULT_LIMIT;
  }

  return Math.min(n, MAX_LIMIT);
}

/* ------------------------------
   Handler
-------------------------------- */

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();
    const body = (await req.json().catch(() => ({}))) as RequeueBody;
    const limit = normalizeLimit(body.limit);
    const nowMs = Date.now();

    const { data, error } = await supabase
      .from("ingest_jobs")
      .select(
        [
          "id",
          "ingest_event_id",
          "status",
          "attempts",
          "max_attempts",
          "next_attempt_at",
          "claimed_at",
          "worker_id",
          "last_error",
          "created_at",
          "updated_at",
        ].join(", ")
      )
      .not("claimed_at", "is", null)
      .order("claimed_at", { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to load claimed ingest jobs: ${error.message}`);
    }

    const jobs = ((data ?? []) as unknown[]) as IngestJobRow[];
    const results: RequeueResult[] = [];

    for (const job of jobs) {
      const canRequeue = shouldRequeueIngestJob(job, nowMs);

      if (!canRequeue) {
        results.push({
          job_id: job.id,
          ingest_event_id: job.ingest_event_id,
          ok: false,
          previous_status: job.status,
          next_status: job.status,
          next_attempt_at: job.next_attempt_at,
          reason: "not_requeueable",
        });
        continue;
      }

      const next_attempt_at = getNextAttemptIso({
        attempts: Math.max(0, job.attempts ?? 0),
        max_attempts: Math.max(1, job.max_attempts ?? 1),
        nowMs,
      });

      const next_status =
        (job.attempts ?? 0) >= Math.max(1, (job.max_attempts ?? 5) - 1)
          ? "failed"
          : "queued";

      const { error: updateError } = await supabase
        .from("ingest_jobs")
        .update({
          status: next_status,
          claimed_at: null,
          worker_id: null,
          next_attempt_at,
          updated_at: new Date(nowMs).toISOString(),
        } as any)
        .eq("id", job.id);

      if (updateError) {
        results.push({
          job_id: job.id,
          ingest_event_id: job.ingest_event_id,
          ok: false,
          previous_status: job.status,
          next_status: null,
          next_attempt_at: null,
          reason: updateError.message,
        });
        continue;
      }

      results.push({
        job_id: job.id,
        ingest_event_id: job.ingest_event_id,
        ok: true,
        previous_status: job.status,
        next_status,
        next_attempt_at,
        reason: null,
      });
    }

    const requeued = results.filter((r) => r.ok).length;
    const skipped = results.length - requeued;

    return NextResponse.json({
      ok: true,
      scanned: jobs.length,
      requeued,
      skipped,
      results,
      now: {
        ms: nowMs,
        iso: new Date(nowMs).toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Requeue stale ingest jobs error",
      },
      { status: 500 }
    );
  }
}