/* ==========================================================
   OUTFLO — ENVIRONMENT ENGINE
   File: lib/environment/environment-engine.ts
   Scope: Resolve baseline vs user environment context for rendering and snapshot eligibility
   Last Updated:
   - ms: 1775178432296
   - iso: 2026-04-03T01:07:12.296Z
   - note: rewrite environment engine to align with baseline-always-on model, user participation boundaries, and multi-place manual city selection
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type EnvironmentLocationMode = "off" | "device" | "manual_city";
export type EnvironmentWeatherMode = "off" | "on";

export type BaselinePlace = {
  id: string;
  label: string;
  lat: number;
  lng: number;
};

export type DeviceLocation = {
  lat: number;
  lng: number;
  accuracy_m?: number | null;
};

export type ManualPlace = {
  id: string;
  label: string;
  manual_city: string;
};

export type EnvironmentProfile = {
  location_mode: EnvironmentLocationMode;
  weather_mode: EnvironmentWeatherMode;
  manual_city?: string | null;
};

export type EnvironmentEngineInput = {
  moment_ms: number;
  baseline_place: BaselinePlace;
  profile: EnvironmentProfile;
  manual_places?: ManualPlace[];
  active_manual_place_id?: string | null;
  device_location?: DeviceLocation | null;
};

export type ResolvedLocation =
  | {
      kind: "coords";
      label: string;
      lat: number;
      lng: number;
    }
  | {
      kind: "manual_city";
      label: string;
      manual_city: string;
    };

export type WeatherQuery =
  | {
      kind: "coords";
      label: string;
      lat: number;
      lng: number;
    }
  | {
      kind: "manual_city";
      label: string;
      manual_city: string;
    };

export type EnvironmentRenderSource =
  | "system_baseline"
  | "user_device"
  | "user_manual_city";

export type EnvironmentSnapshotSourceMode = "device" | "manual_city" | null;

export type EnvironmentResolution = {
  moment_ms: number;

  render_source: EnvironmentRenderSource;
  render_location: ResolvedLocation;
  render_label: string;

  baseline_active: boolean;
  user_participation_enabled: boolean;
  weather_enabled: boolean;

  weather_query: WeatherQuery | null;

  snapshot_write_allowed: boolean;
  snapshot_source_mode: EnvironmentSnapshotSourceMode;

  active_manual_place_id: string | null;

  fallback_reason:
    | null
    | "location_off"
    | "device_location_unavailable"
    | "manual_city_missing";
};

/* ------------------------------
   Engine
-------------------------------- */

export function resolveEnvironmentContext(
  input: EnvironmentEngineInput
): EnvironmentResolution {
  assertMomentMs(input.moment_ms);

  const baselineLocation = baselineToResolvedLocation(input.baseline_place);

  const manualPlace = pickActiveManualPlace(
    input.manual_places,
    input.active_manual_place_id,
    input.profile.manual_city
  );

  switch (input.profile.location_mode) {
    case "off":
      return {
        moment_ms: input.moment_ms,
        render_source: "system_baseline",
        render_location: baselineLocation,
        render_label: input.baseline_place.label,
        baseline_active: true,
        user_participation_enabled: false,
        weather_enabled: false,
        weather_query: null,
        snapshot_write_allowed: false,
        snapshot_source_mode: null,
        active_manual_place_id: null,
        fallback_reason: "location_off",
      };

    case "device":
      if (hasDeviceLocation(input.device_location)) {
        const deviceLocation: ResolvedLocation = {
          kind: "coords",
          label: "Your location",
          lat: input.device_location.lat,
          lng: input.device_location.lng,
        };

        return {
          moment_ms: input.moment_ms,
          render_source: "user_device",
          render_location: deviceLocation,
          render_label: "Your location",
          baseline_active: false,
          user_participation_enabled: true,
          weather_enabled: input.profile.weather_mode === "on",
          weather_query:
            input.profile.weather_mode === "on"
              ? {
                  kind: "coords",
                  label: "Your location",
                  lat: input.device_location.lat,
                  lng: input.device_location.lng,
                }
              : null,
          snapshot_write_allowed: true,
          snapshot_source_mode: "device",
          active_manual_place_id: null,
          fallback_reason: null,
        };
      }

      return {
        moment_ms: input.moment_ms,
        render_source: "system_baseline",
        render_location: baselineLocation,
        render_label: input.baseline_place.label,
        baseline_active: true,
        user_participation_enabled: true,
        weather_enabled: false,
        weather_query: null,
        snapshot_write_allowed: false,
        snapshot_source_mode: null,
        active_manual_place_id: null,
        fallback_reason: "device_location_unavailable",
      };

    case "manual_city":
      if (manualPlace) {
        const manualLocation: ResolvedLocation = {
          kind: "manual_city",
          label: manualPlace.label,
          manual_city: manualPlace.manual_city,
        };

        return {
          moment_ms: input.moment_ms,
          render_source: "user_manual_city",
          render_location: manualLocation,
          render_label: manualPlace.label,
          baseline_active: false,
          user_participation_enabled: true,
          weather_enabled: input.profile.weather_mode === "on",
          weather_query:
            input.profile.weather_mode === "on"
              ? {
                  kind: "manual_city",
                  label: manualPlace.label,
                  manual_city: manualPlace.manual_city,
                }
              : null,
          snapshot_write_allowed: true,
          snapshot_source_mode: "manual_city",
          active_manual_place_id: manualPlace.id,
          fallback_reason: null,
        };
      }

      return {
        moment_ms: input.moment_ms,
        render_source: "system_baseline",
        render_location: baselineLocation,
        render_label: input.baseline_place.label,
        baseline_active: true,
        user_participation_enabled: true,
        weather_enabled: false,
        weather_query: null,
        snapshot_write_allowed: false,
        snapshot_source_mode: null,
        active_manual_place_id: null,
        fallback_reason: "manual_city_missing",
      };
  }
}

/* ------------------------------
   Helpers
-------------------------------- */

function assertMomentMs(moment_ms: number): void {
  if (!Number.isInteger(moment_ms) || moment_ms <= 0) {
    throw new Error("resolveEnvironmentContext: moment_ms must be a positive integer");
  }
}

function hasDeviceLocation(
  device_location: DeviceLocation | null | undefined
): device_location is DeviceLocation {
  return Boolean(
    device_location &&
      Number.isFinite(device_location.lat) &&
      Number.isFinite(device_location.lng)
  );
}

function baselineToResolvedLocation(place: BaselinePlace): ResolvedLocation {
  return {
    kind: "coords",
    label: place.label,
    lat: place.lat,
    lng: place.lng,
  };
}

function pickActiveManualPlace(
  manual_places: ManualPlace[] | undefined,
  active_manual_place_id: string | null | undefined,
  profile_manual_city: string | null | undefined
): ManualPlace | null {
  const places = normalizeManualPlaces(manual_places);

  if (active_manual_place_id) {
    const activeMatch = places.find((place) => place.id === active_manual_place_id);
    if (activeMatch) {
      return activeMatch;
    }
  }

  if (places.length > 0) {
    return places[0];
  }

  const fallbackCity = cleanString(profile_manual_city);
  if (!fallbackCity) {
    return null;
  }

  return {
    id: "profile-manual-city",
    label: fallbackCity,
    manual_city: fallbackCity,
  };
}

function normalizeManualPlaces(
  manual_places: ManualPlace[] | undefined
): ManualPlace[] {
  if (!manual_places || manual_places.length === 0) {
    return [];
  }

  const seen = new Set<string>();
  const normalized: ManualPlace[] = [];

  for (const place of manual_places) {
    const id = cleanString(place.id);
    const label = cleanString(place.label);
    const manual_city = cleanString(place.manual_city);

    if (!id || !label || !manual_city) {
      continue;
    }

    if (seen.has(id)) {
      continue;
    }

    seen.add(id);
    normalized.push({
      id,
      label,
      manual_city,
    });
  }

  return normalized;
}

function cleanString(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}