/* ==========================================================
   OUTFLO — EPOCH PRIMITIVES
   File: lib/epoch.ts
   Scope: Provide pure epoch helpers without owning epoch persistence
   ========================================================== */

/* ------------------------------
   Contract
-------------------------------- */

//
// Input:
// - candidate epoch values
// - moment_ms values
//
// Output:
// - validated epoch ms
// - derived delta ms
//
// Invariants:
// - no localStorage
// - no window access
// - no Date.now() ownership
// - no user/device persistence
// - pure helpers only
//

/* ------------------------------
   Constants
-------------------------------- */

const MIN_UNIX_MS = 1_000_000_000_000;
const MAX_UNIX_MS = 9_999_999_999_999;

/* ------------------------------
   Helpers
-------------------------------- */

export function isUnixMs(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= MIN_UNIX_MS &&
    value <= MAX_UNIX_MS
  );
}

export function normalizeEpochStartedAt(value: unknown): number | null {
  return isUnixMs(value) ? value : null;
}

export function getEpochDeltaMs(
  momentMs: number,
  epochStartedAtMs: number | null,
): number | null {
  if (!isUnixMs(momentMs)) return null;
  if (!isUnixMs(epochStartedAtMs)) return null;

  return momentMs - epochStartedAtMs;
}
