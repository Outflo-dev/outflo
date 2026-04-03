/* ==========================================================
   OUTFLO — SYSTEM BASELINE PLACE
   File: lib/environment/baseline-place.ts
   Scope: Define the fixed system-owned fallback coordinate for baseline environment resolution
   Last Updated:
   - ms: <your timestamp>
   - iso: <your iso>
   - note: add fixed baseline coordinate for environment fallback resolution
   ========================================================== */

export const SYSTEM_BASELINE_PLACE = {
  id: "baseline_equator_prime",
  label: "Baseline",
  lat: 0,
  lng: 0,
} as const;