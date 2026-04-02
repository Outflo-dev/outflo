/* ==========================================================
   OUTFLO — INGEST RETRY POLICY
   File: lib/ingest/retry-policy.ts
   Scope: Define shared retry limits and backoff policy for ingest replay and worker flows
   Last Updated:
   - ms: 1775093909424
   - iso: 2026-04-02T01:38:29.424Z
   - note: completion pass — centralize ingest retry policy
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type IngestRetryDecision = {
  retryable: boolean;
  attempt_count: number;
  max_attempts: number;
  delay_ms: number;
};

export type IngestRetryParams = {
  attempt_count: number;
  max_attempts?: number;
  base_delay_ms?: number;
  max_delay_ms?: number;
};

/* ------------------------------
   Constants
-------------------------------- */

export const INGEST_RETRY_MAX_ATTEMPTS = 5;
export const INGEST_RETRY_BASE_DELAY_MS = 15_000;
export const INGEST_RETRY_MAX_DELAY_MS = 15 * 60 * 1000;

/* ------------------------------
   Helpers
-------------------------------- */

export function getIngestRetryDelayMs(params: {
  attempt_count: number;
  base_delay_ms?: number;
  max_delay_ms?: number;
}): number {
  const attempt = Math.max(1, params.attempt_count);
  const base = params.base_delay_ms ?? INGEST_RETRY_BASE_DELAY_MS;
  const max = params.max_delay_ms ?? INGEST_RETRY_MAX_DELAY_MS;

  const raw = base * Math.pow(2, attempt - 1);

  return Math.min(raw, max);
}

export function getIngestRetryDecision(
  params: IngestRetryParams
): IngestRetryDecision {
  const attempt_count = Math.max(0, params.attempt_count);
  const max_attempts = params.max_attempts ?? INGEST_RETRY_MAX_ATTEMPTS;

  if (attempt_count >= max_attempts) {
    return {
      retryable: false,
      attempt_count,
      max_attempts,
      delay_ms: 0,
    };
  }

  return {
    retryable: true,
    attempt_count,
    max_attempts,
    delay_ms: getIngestRetryDelayMs({
      attempt_count: attempt_count + 1,
      base_delay_ms: params.base_delay_ms,
      max_delay_ms: params.max_delay_ms,
    }),
  };
}

export function isIngestRetryable(params: IngestRetryParams): boolean {
  return getIngestRetryDecision(params).retryable;
}