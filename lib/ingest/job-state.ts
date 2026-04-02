/* ==========================================================
   OUTFLO — INGEST JOB STATE
   File: lib/ingest/job-state.ts
   Scope: Centralize retry timing, stale-claim detection, and requeue eligibility for ingest jobs
   Last Updated:
   - ms: 1775095047608
   - iso: 2026-04-02T01:57:27.608Z
   - note: completion pass — add canonical ingest job state helper
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
  getIngestRetryDecision,
  INGEST_RETRY_MAX_ATTEMPTS,
} from "@/lib/ingest/retry-policy";

/* ------------------------------
   Types
-------------------------------- */

export type IngestJobStatus =
  | "queued"
  | "processing"
  | "succeeded"
  | "failed"
  | "exhausted";

export type IngestJobRow = {
  id: string;
  ingest_event_id: string;
  status: string | null;
  attempts: number | null;
  max_attempts: number | null;
  next_attempt_at: string | null;
  claimed_at: string | null;
  worker_id: string | null;
  last_error: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type IngestJobState = {
  attempts: number;
  max_attempts: number;
  has_claim: boolean;
  is_terminal: boolean;
  is_stale_claim: boolean;
  can_retry: boolean;
  next_delay_ms: number;
};

/* ------------------------------
   Constants
-------------------------------- */

export const INGEST_STALE_CLAIM_MS = 5 * 60 * 1000;

/* ------------------------------
   Helpers
-------------------------------- */

function toMs(value: string | null | undefined): number | null {
  if (!value) return null;

  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export function getIngestJobState(
  job: Pick<
    IngestJobRow,
    "status" | "attempts" | "max_attempts" | "claimed_at"
  >,
  nowMs: number = Date.now()
): IngestJobState {
  const attempts = Math.max(0, job.attempts ?? 0);
  const max_attempts = Math.max(
    1,
    job.max_attempts ?? INGEST_RETRY_MAX_ATTEMPTS
  );
  const claimedAtMs = toMs(job.claimed_at);
  const has_claim = claimedAtMs !== null;

  const is_terminal =
    job.status === "succeeded" || job.status === "exhausted";

  const is_stale_claim =
    claimedAtMs !== null && nowMs - claimedAtMs >= INGEST_STALE_CLAIM_MS;

  const retryDecision = getIngestRetryDecision({
    attempt_count: attempts,
    max_attempts,
  });

  const can_retry =
    !is_terminal &&
    retryDecision.retryable &&
    (!has_claim || is_stale_claim);

  return {
    attempts,
    max_attempts,
    has_claim,
    is_terminal,
    is_stale_claim,
    can_retry,
    next_delay_ms: retryDecision.delay_ms,
  };
}

export function getNextAttemptIso(params: {
  attempts: number;
  max_attempts?: number;
  nowMs?: number;
}): string | null {
  const nowMs = params.nowMs ?? Date.now();

  const retryDecision = getIngestRetryDecision({
    attempt_count: params.attempts,
    max_attempts: params.max_attempts,
  });

  if (!retryDecision.retryable) {
    return null;
  }

  return new Date(nowMs + retryDecision.delay_ms).toISOString();
}

export function shouldRequeueIngestJob(
  job: Pick<
    IngestJobRow,
    "status" | "attempts" | "max_attempts" | "claimed_at"
  >,
  nowMs: number = Date.now()
): boolean {
  return getIngestJobState(job, nowMs).can_retry;
}

export function isStaleClaimedIngestJob(
  job: Pick<IngestJobRow, "claimed_at">,
  nowMs: number = Date.now()
): boolean {
  const claimedAtMs = toMs(job.claimed_at);
  if (claimedAtMs === null) return false;

  return nowMs - claimedAtMs >= INGEST_STALE_CLAIM_MS;
}