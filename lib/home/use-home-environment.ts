/* ==========================================================
   OUTFLO — HOME ENVIRONMENT ORCHESTRATOR
   File: lib/home/use-home-environment.ts
   Scope: Orchestrate baseline vs user environment resolution, device participation, and weather lookup for Home
   Last Updated:
   - ms: 1775178432296
   - iso: 2026-04-03T01:07:12.296Z
   - note: rewrite home environment hook to align with baseline-always-on model, user participation boundaries, and manual-city weather support
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */

import { useEffect, useMemo, useState } from "react";
import {
  useEnvironment,
  type UseEnvironmentInput,
} from "../environment/use-environment";
import {
  getDeviceLocation,
  type DeviceLocationResult,
} from "../location/get-device-location";
import { getWeather, type NormalizedWeather } from "../weather/get-weather";
import type {
  BaselinePlace,
  DeviceLocation,
  EnvironmentProfile,
  ManualPlace,
} from "../environment/environment-engine";

/* ------------------------------
   Types
-------------------------------- */

export type HomeEnvironmentInput = {
  moment_ms: number;
  baseline_place: BaselinePlace;
  profile: EnvironmentProfile;
  manual_places?: ManualPlace[];
  active_manual_place_id?: string | null;
  request_device_location?: boolean;
};

export type HomeEnvironmentState = {
  environment: ReturnType<typeof useEnvironment>;
  weather: NormalizedWeather | null;
  loading_weather: boolean;
  weather_error: string | null;
  device_location_result: DeviceLocationResult;
};

/* ------------------------------
   Hook
-------------------------------- */

export function useHomeEnvironment(
  input: HomeEnvironmentInput
): HomeEnvironmentState {
  const [device_location_result, setDeviceLocationResult] =
    useState<DeviceLocationResult>({ status: "unavailable" });

  const [weather, setWeather] = useState<NormalizedWeather | null>(null);

  const [loading_weather, setLoadingWeather] = useState(false);

  const [weather_error, setWeatherError] = useState<string | null>(null);

  /* ------------------------------
     Device Location
  -------------------------------- */

  useEffect(() => {
    const should_request_device_location =
      input.request_device_location !== false &&
      input.profile.location_mode === "device";

    if (!should_request_device_location) {
      setDeviceLocationResult({ status: "unavailable" });
      return;
    }

    let cancelled = false;

    getDeviceLocation()
      .then((result) => {
        if (!cancelled) {
          setDeviceLocationResult(result);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setDeviceLocationResult({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Failed to get device location",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [input.request_device_location, input.profile.location_mode]);

  /* ------------------------------
     Device Location Projection
  -------------------------------- */

  const device_location = useMemo<DeviceLocation | null>(() => {
    if (device_location_result.status !== "granted") {
      return null;
    }

    return {
      lat: device_location_result.coords.latitude,
      lng: device_location_result.coords.longitude,
      accuracy_m: null,
    };
  }, [device_location_result]);

  /* ------------------------------
     Environment Resolution
  -------------------------------- */

  const environment_input: UseEnvironmentInput = useMemo(() => {
    return {
      moment_ms: input.moment_ms,
      baseline_place: input.baseline_place,
      profile: input.profile,
      manual_places: input.manual_places,
      active_manual_place_id: input.active_manual_place_id ?? null,
      device_location,
    };
  }, [
    input.moment_ms,
    input.baseline_place,
    input.profile,
    input.manual_places,
    input.active_manual_place_id,
    device_location,
  ]);

  const environment = useEnvironment(environment_input);

  /* ------------------------------
     Weather Lookup
  -------------------------------- */

  useEffect(() => {
    const query = environment.weather_query;

    if (!environment.weather_enabled || !query) {
      setWeather(null);
      setLoadingWeather(false);
      setWeatherError(null);
      return;
    }

    let cancelled = false;

    setLoadingWeather(true);
    setWeatherError(null);
    setWeather(null);

    const request =
      query.kind === "coords"
        ? getWeather({
            kind: "coords",
            lat: query.lat,
            lng: query.lng,
          })
        : getWeather({
            kind: "manual_city",
            manual_city: query.manual_city,
          });

    request
      .then((data) => {
        if (!cancelled) {
          setWeather(data);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setWeather(null);
          setWeatherError(
            error instanceof Error
              ? error.message
              : "Failed to load weather"
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingWeather(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [environment.weather_enabled, environment.weather_query]);

  return {
    environment,
    weather,
    loading_weather,
    weather_error,
    device_location_result,
  };
}