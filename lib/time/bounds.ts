/* ==========================================================
   OUTFLO — TIME BOUNDS
   File: lib/time/bounds.ts
   Scope: Pure UTC temporal bounds helpers over canonical unix ms truth
   Last Updated:
   - ms: 1775096572633
   - iso: 2026-04-02T02:22:52.633Z
   - note: time computation build — add canonical orbit bounds and keep UTC-pure derivation
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type TimeBounds = {
  start_ms: number;
  end_ms: number;
};

/* ------------------------------
   Constants
-------------------------------- */

export const SIDEREAL_YEAR_MS = 31_558_149_764;

/* ------------------------------
   Guards
-------------------------------- */

function assertFiniteMs(value: number, label: string) {
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid ${label}`);
  }
}

function assertRange(start_ms: number, end_ms: number) {
  assertFiniteMs(start_ms, "start_ms");
  assertFiniteMs(end_ms, "end_ms");

  if (end_ms <= start_ms) {
    throw new Error("Invalid range: end_ms must be greater than start_ms");
  }
}

/* ------------------------------
   Bounds
-------------------------------- */

export function getExplicitBounds(params: {
  start_ms: number;
  end_ms: number;
}): TimeBounds {
  assertRange(params.start_ms, params.end_ms);

  return {
    start_ms: params.start_ms,
    end_ms: params.end_ms,
  };
}

export function getSinceEpochBounds(params: {
  epoch_ms: number;
  now_ms?: number;
}): TimeBounds {
  const now_ms = params.now_ms ?? Date.now();

  assertRange(params.epoch_ms, now_ms + 1);

  return {
    start_ms: params.epoch_ms,
    end_ms: now_ms + 1,
  };
}

export function getOrbitBounds(params: {
  epoch_ms: number;
  orbit_index: number;
}): TimeBounds {
  assertFiniteMs(params.epoch_ms, "epoch_ms");

  if (!Number.isInteger(params.orbit_index) || params.orbit_index < 0) {
    throw new Error("Invalid orbit_index");
  }

  const start_ms = params.epoch_ms + params.orbit_index * SIDEREAL_YEAR_MS;
  const end_ms = start_ms + SIDEREAL_YEAR_MS;

  assertRange(start_ms, end_ms);

  return {
    start_ms,
    end_ms,
  };
}

export function getCurrentOrbitIndex(params: {
  epoch_ms: number;
  now_ms?: number;
}): number {
  const now_ms = params.now_ms ?? Date.now();

  assertFiniteMs(params.epoch_ms, "epoch_ms");
  assertFiniteMs(now_ms, "now_ms");

  if (now_ms < params.epoch_ms) {
    return 0;
  }

  return Math.floor((now_ms - params.epoch_ms) / SIDEREAL_YEAR_MS);
}

export function getCurrentOrbitBounds(params: {
  epoch_ms: number;
  now_ms?: number;
}): TimeBounds {
  const orbit_index = getCurrentOrbitIndex(params);

  return getOrbitBounds({
    epoch_ms: params.epoch_ms,
    orbit_index,
  });
}