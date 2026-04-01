/* ==========================================================
   OUTFLO — CLAIM INGEST JOBS
   File: lib/ingest/claim-ingest-jobs.ts
   Scope: Claim queued ingest jobs that are ready for processing
   Last Updated:
   - ms: <YOUR_MS>
   - iso: <YOUR_ISO>
   - note: add ingest job claim helper for worker path
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------
   Types
-------------------------------- */
export type ClaimedIngestJob = {
  id: string;
  ingest_event_id: string;
  job_type: string;
  status: string;
  attempts: number;
  max_attempts: number;
  next_attempt_at: string;
  claimed_at: string | null;
  worker_id: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};

type ClaimIngestJobsParams = {
  supabase: SupabaseClient;
  workerId: string;
  limit?: number;
};

type ClaimIngestJobsResult =
  | {
      ok: true;
      jobs: ClaimedIngestJob[];
    }
  | {
      ok: false;
      error: string;
    };

/* ------------------------------
   Constants
-------------------------------- */
const DEFAULT_LIMIT = 10;

/* ------------------------------
   Helpers
-------------------------------- */
function isoNow(): string {
  return new Date().toISOString();
}

/* ------------------------------
   Main
-------------------------------- */
export async function claimIngestJobs(
  params: ClaimIngestJobsParams
): Promise<ClaimIngestJobsResult> {
  const { supabase, workerId, limit = DEFAULT_LIMIT } = params;
  const now = isoNow();

  const { data: candidates, error: loadErr } = await supabase
    .from("ingest_jobs")
    .select(
      "id, ingest_event_id, job_type, status, attempts, max_attempts, next_attempt_at, claimed_at, worker_id, last_error, created_at, updated_at"
    )
    .eq("status", "queued")
    .lte("next_attempt_at", now)
    .order("next_attempt_at", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(limit);

  if (loadErr) {
    return {
      ok: false,
      error: loadErr.message,
    };
  }

  if (!candidates || candidates.length === 0) {
    return {
      ok: true,
      jobs: [],
    };
  }

  const claimed: ClaimedIngestJob[] = [];

  for (const candidate of candidates) {
    const { data: updated, error: claimErr } = await supabase
      .from("ingest_jobs")
      .update({
        status: "claimed",
        claimed_at: now,
        worker_id: workerId,
        updated_at: now,
      })
      .eq("id", candidate.id)
      .eq("status", "queued")
      .select(
        "id, ingest_event_id, job_type, status, attempts, max_attempts, next_attempt_at, claimed_at, worker_id, last_error, created_at, updated_at"
      )
      .maybeSingle();

    if (claimErr) continue;
    if (!updated) continue;

    claimed.push(updated as ClaimedIngestJob);
  }

  return {
    ok: true,
    jobs: claimed,
  };
}