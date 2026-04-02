/* ==========================================================
   OUTFLO — PROCESS INGEST JOBS
   File: app/api/admin/process-ingest/route.ts
   Scope: Claim queued ingest jobs, process events, and finalize job state
   Last Updated:
   - ms: <YOUR_MS>
   - iso: <YOUR_ISO>
   - note: convert admin process-ingest route into ingest worker endpoint
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { claimIngestJobs, type ClaimedIngestJob } from "@/lib/ingest/claim-ingest-jobs";
import { processSingleEvent, type IngestEventRow, } from "@/lib/ingest/process-single-event";
import { getNextAttemptIso } from "@/lib/ingest/job-state";

/* ------------------------------
   Types
-------------------------------- */
type ProcessRequestBody = {
  limit?: number;
};

/* ------------------------------
   Constants
-------------------------------- */
export const runtime = "nodejs";

const VERSION = "process-ingest-v1-worker";
const DEFAULT_LIMIT = 10;

/* ------------------------------
   Helpers
-------------------------------- */
function envOrThrow(key: string): string {
  const value = process.env[key]?.trim();

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

function isoNow(): string {
  return new Date().toISOString();
}

function getWorkerId(): string {
  return `worker:${process.env.VERCEL_REGION || "local"}:${Date.now()}`;
}

function safeLimit(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return DEFAULT_LIMIT;
  }

  const rounded = Math.floor(value);

  if (rounded <= 0) return DEFAULT_LIMIT;
  if (rounded > 100) return 100;

  return rounded;
}

async function finalizeSucceededJob(params: {
  supabase: SupabaseClient;
  jobId: string;
}): Promise<string | null> {
  const { supabase, jobId } = params;

  const { error } = await supabase
    .from("ingest_jobs")
    .update({
      status: "succeeded",
      claimed_at: null,
      worker_id: null,
      last_error: null,
      updated_at: isoNow(),
    })
    .eq("id", jobId);

  return error?.message || null;
}

async function finalizeFailedJob(params: {
  supabase: SupabaseClient;
  job: ClaimedIngestJob;
  errorMessage: string;
}): Promise<string | null> {
  const { supabase, job, errorMessage } = params;

  const nextAttempts = (job.attempts ?? 0) + 1;
  const isDead = nextAttempts >= (job.max_attempts ?? 5);

  const { error } = await supabase
    .from("ingest_jobs")
    .update({
      status: isDead ? "exhausted" : "queued",
      attempts: nextAttempts,
      claimed_at: null,
      worker_id: null,
      last_error: errorMessage,
      next_attempt_at: isDead ? null : getNextAttemptIso({attempts: nextAttempts, 
        max_attempts: job.max_attempts ?? 5,   
      }),
      updated_at: isoNow(),
    })
    .eq("id", job.id);

  return error?.message || null;
}

/* ------------------------------
   Handler
-------------------------------- */
export async function POST(req: Request) {
  try {
    const url =
      process.env.SUPABASE_URL?.trim() ||
      process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

    const key = envOrThrow("SUPABASE_SERVICE_ROLE_KEY");

    if (!url) {
      throw new Error("Missing environment variable: SUPABASE_URL");
    }

    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });

    let body: ProcessRequestBody = {};
    try {
      body = (await req.json()) as ProcessRequestBody;
    } catch {
      body = {};
    }

    const limit = safeLimit(body.limit);
    const workerId = getWorkerId();

    const claimResult = await claimIngestJobs({
      supabase,
      workerId,
      limit,
    });

    if (!claimResult.ok) {
      return NextResponse.json(
        {
          ok: false,
          where: "claim_jobs",
          message: claimResult.error,
          version: VERSION,
        },
        { status: 500 }
      );
    }

    const jobs = claimResult.jobs;

    if (jobs.length === 0) {
      return NextResponse.json(
        {
          ok: true,
          version: VERSION,
          worker_id: workerId,
          claimed: 0,
          processed: 0,
          succeeded: 0,
          failed: 0,
          results: [],
        },
        { status: 200 }
      );
    }

    const results: Array<Record<string, unknown>> = [];
    let succeeded = 0;
    let failed = 0;

    for (const job of jobs) {
      const { data: event, error: eventErr } = await supabase
        .from("ingest_events")
        .select(
          "id, provider, received_at, message_id, event_id, user_id, claimed_at, processed_at, receipt_id, process_error, raw"
        )
        .eq("id", job.ingest_event_id)
        .maybeSingle();

      if (eventErr || !event) {
        const errorMessage =
          eventErr?.message || "Missing ingest event for claimed job";

        await finalizeFailedJob({
          supabase,
          job,
          errorMessage,
        });

        failed += 1;
        results.push({
          job_id: job.id,
          ingest_event_id: job.ingest_event_id,
          ok: false,
          error: errorMessage,
        });
        continue;
      }

      const processing = await processSingleEvent({
        supabase,
        event: event as IngestEventRow,
      });

      if (!processing.ok) {
        await finalizeFailedJob({
          supabase,
          job,
          errorMessage: processing.process_error,
        });

        failed += 1;
        results.push({
          job_id: job.id,
          ingest_event_id: job.ingest_event_id,
          ok: false,
          status: processing.status,
          error: processing.process_error,
        });
        continue;
      }

      const finalizeSuccessError = await finalizeSucceededJob({
        supabase,
        jobId: job.id,
      });

      if (finalizeSuccessError) {
        await finalizeFailedJob({
          supabase,
          job,
          errorMessage: finalizeSuccessError,
        });

        failed += 1;
        results.push({
          job_id: job.id,
          ingest_event_id: job.ingest_event_id,
          ok: false,
          error: finalizeSuccessError,
        });
        continue;
      }

      succeeded += 1;
      results.push({
        job_id: job.id,
        ingest_event_id: job.ingest_event_id,
        ok: true,
        status: processing.status,
        receipt_id:
          processing.status === "receipt_created" ||
          processing.status === "already_processed"
            ? processing.receipt_id
            : null,
        processed_at:
          processing.status === "receipt_created" ||
          processing.status === "already_processed" ||
          processing.status === "non_spend"
            ? processing.processed_at
            : null,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        version: VERSION,
        worker_id: workerId,
        claimed: jobs.length,
        processed: jobs.length,
        succeeded,
        failed,
        results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        where: "handler",
        message: error?.message || "Unknown worker failure",
        version: VERSION,
      },
      { status: 500 }
    );
  }
}