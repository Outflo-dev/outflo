/* ==========================================================
   OUTFLO — USE ENVIRONMENT HOOK
   File: lib/environment/use-environment.ts
   Scope: Resolve client environment context from baseline, profile, device location, and active manual place
   Last Updated:
   - ms: 1775178432296
   - iso: 2026-04-03T01:07:12.296Z
   - note: rewrite environment hook to align with baseline-always-on model and user participation boundaries
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import { useMemo } from "react";
import {
  resolveEnvironmentContext,
  type BaselinePlace,
  type DeviceLocation,
  type EnvironmentProfile,
  type EnvironmentResolution,
  type ManualPlace,
} from "./environment-engine";

/* ------------------------------
   Types
-------------------------------- */

export type UseEnvironmentInput = {
  moment_ms: number;
  baseline_place: BaselinePlace;
  profile: EnvironmentProfile;
  manual_places?: ManualPlace[];
  active_manual_place_id?: string | null;
  device_location?: DeviceLocation | null;
};

/* ------------------------------
   Hook
-------------------------------- */

export function useEnvironment(
  input: UseEnvironmentInput
): EnvironmentResolution {
  return useMemo(() => {
    return resolveEnvironmentContext({
      moment_ms: input.moment_ms,
      baseline_place: input.baseline_place,
      profile: input.profile,
      manual_places: input.manual_places,
      active_manual_place_id: input.active_manual_place_id ?? null,
      device_location: input.device_location ?? null,
    });
  }, [
    input.moment_ms,
    input.baseline_place.id,
    input.baseline_place.label,
    input.baseline_place.lat,
    input.baseline_place.lng,
    input.profile.location_mode,
    input.profile.weather_mode,
    input.profile.manual_city,
    input.active_manual_place_id,
    input.device_location?.lat,
    input.device_location?.lng,
    input.device_location?.accuracy_m,
    stableManualPlacesKey(input.manual_places),
  ]);
}

/* ------------------------------
   Helpers
-------------------------------- */

function stableManualPlacesKey(
  manual_places: ManualPlace[] | undefined
): string {
  if (!manual_places || manual_places.length === 0) {
    return "";
  }

  return manual_places
    .map((place) => `${place.id}::${place.label}::${place.manual_city}`)
    .join("|");
}