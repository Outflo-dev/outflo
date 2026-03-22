/* ==========================================================
   OUTFLO — TIME UTILITIES
   File: lib/time.ts
   Scope: Provide shared time constants and pure time formatting helpers
   ========================================================== */

/* ------------------------------
   Contract
-------------------------------- */

//
// Owns:
// - shared time constants
// - pure time math helpers
// - pure display formatting helpers
//
// Does Not Own:
// - epoch persistence
// - user epoch resolution
// - canonical user time truth
//

/* ------------------------------
   Constants
-------------------------------- */

export const YEAR_DAYS = 365;
export const DAY_MS = 24 * 60 * 60 * 1000;
export const YEAR_MS = YEAR_DAYS * DAY_MS;

/* ------------------------------
   Time Source
-------------------------------- */

export function nowMs(): number {
  return Date.now();
}

/* ------------------------------
   Window Helpers
-------------------------------- */

export function windowStartMs(nowMsValue: number, startedAtMs: number): number {
  return Math.max(startedAtMs, nowMsValue - YEAR_MS);
}

/* ------------------------------
   Formatting Helpers
-------------------------------- */

export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatHMS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}
