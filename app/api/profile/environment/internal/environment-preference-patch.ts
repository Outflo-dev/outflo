/* ==========================================================
   OUTFLO — ENVIRONMENT PREFERENCE PATCH
   File: app/api/profile/environment/internal/environment-preference-patch.ts
   Scope: Resolve and validate profile environment preference patch payloads
   Last Updated:
   - ms: 1781096852713
   - iso: 2026-06-10T13:07:32.713Z
   - note: extract environment preference patch resolution from API route
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
    type EnvironmentPreferences,
    isCaptureMode,
    isLocationMode,
    isLocationPrecision,
    isSignalMode,
    isWeatherMode,
    normalizeManualCity,
} from "@/lib/app-state/environment/environment-preferences";

import {
    isDistanceUnit,
    isPrecipitationUnit,
    isPressureUnit,
    isTemperatureUnit,
    isWindUnit,
} from "@/lib/app-state/environment/environment-units";

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentRequestBody = {
    location_mode?: unknown;
    manual_city?: unknown;
    location_precision?: unknown;
    weather_mode?: unknown;
    capture_mode?: unknown;
    sun_mode?: unknown;
    precipitation_mode?: unknown;
    air_quality_mode?: unknown;
    receipt_links_mode?: unknown;
    snapshots_mode?: unknown;
    temperature_unit?: unknown;
    wind_unit?: unknown;
    precipitation_unit?: unknown;
    pressure_unit?: unknown;
    distance_unit?: unknown;
};

export type EnvironmentPreferenceRow = EnvironmentPreferences & {
    user_id: string;
};

export type EnvironmentPreferencePatchResult =
    | {
        ok: true;
        payload: EnvironmentPreferences;
    }
    | {
        ok: false;
        error: string;
    };

/* ------------------------------
   Constants
-------------------------------- */
export const ENVIRONMENT_PREFERENCE_SELECT_COLUMNS = [
    "user_id",
    "location_mode",
    "manual_city",
    "location_precision",
    "weather_mode",
    "capture_mode",
    "sun_mode",
    "precipitation_mode",
    "air_quality_mode",
    "receipt_links_mode",
    "snapshots_mode",
    "temperature_unit",
    "wind_unit",
    "precipitation_unit",
    "pressure_unit",
    "distance_unit",
] as const;

/* ------------------------------
   Helpers
-------------------------------- */
export async function readEnvironmentRequestBody(
    req: Request
): Promise<EnvironmentRequestBody> {
    try {
        const body = await req.json();

        if (!body || typeof body !== "object") {
            return {};
        }

        return body as EnvironmentRequestBody;
    } catch {
        return {};
    }
}

function resolveEnvironmentPreferences(args: {
    body: EnvironmentRequestBody;
    existing: EnvironmentPreferenceRow | null;
}) {
    const { body, existing } = args;

    return {
        ...DEFAULT_ENVIRONMENT_PREFERENCES,
        ...(existing ?? {}),
        ...body,
    };
}

export function resolveEnvironmentPreferencePatch(args: {
    body: EnvironmentRequestBody;
    existing: EnvironmentPreferenceRow | null;
}): EnvironmentPreferencePatchResult {
    const resolved = resolveEnvironmentPreferences(args);

    const locationMode = resolved.location_mode;
    const locationPrecision = resolved.location_precision;
    const weatherMode = resolved.weather_mode;
    const captureMode = resolved.capture_mode;
    const sunMode = resolved.sun_mode;
    const precipitationMode = resolved.precipitation_mode;
    const airQualityMode = resolved.air_quality_mode;
    const receiptLinksMode = resolved.receipt_links_mode;
    const snapshotsMode = resolved.snapshots_mode;
    const temperatureUnit = resolved.temperature_unit;
    const windUnit = resolved.wind_unit;
    const precipitationUnit = resolved.precipitation_unit;
    const pressureUnit = resolved.pressure_unit;
    const distanceUnit = resolved.distance_unit;

    if (!isLocationMode(locationMode)) {
        return {
            ok: false,
            error: "Invalid location_mode.",
        };
    }

    if (!isLocationPrecision(locationPrecision)) {
        return {
            ok: false,
            error: "Invalid location_precision.",
        };
    }

    if (!isWeatherMode(weatherMode)) {
        return {
            ok: false,
            error: "Invalid weather_mode.",
        };
    }

    if (!isCaptureMode(captureMode)) {
        return {
            ok: false,
            error: "Invalid capture_mode.",
        };
    }

    if (
        !isSignalMode(sunMode) ||
        !isSignalMode(precipitationMode) ||
        !isSignalMode(airQualityMode) ||
        !isSignalMode(receiptLinksMode) ||
        !isSignalMode(snapshotsMode)
    ) {
        return {
            ok: false,
            error: "Invalid environment mode.",
        };
    }

    if (
        !isTemperatureUnit(temperatureUnit) ||
        !isWindUnit(windUnit) ||
        !isPrecipitationUnit(precipitationUnit) ||
        !isPressureUnit(pressureUnit) ||
        !isDistanceUnit(distanceUnit)
    ) {
        return {
            ok: false,
            error: "Invalid environment unit.",
        };
    }

    const manualCity = normalizeManualCity(resolved.manual_city);

    if (locationMode === "manual_city" && !manualCity) {
        return {
            ok: false,
            error: "Manual city is required when location_mode is manual_city.",
        };
    }

    return {
        ok: true,
        payload: {
            location_mode: locationMode,
            manual_city: manualCity,
            location_precision: locationPrecision,
            weather_mode: weatherMode,
            capture_mode: captureMode,
            sun_mode: sunMode,
            precipitation_mode: precipitationMode,
            air_quality_mode: airQualityMode,
            receipt_links_mode: receiptLinksMode,
            snapshots_mode: snapshotsMode,
            temperature_unit: temperatureUnit,
            wind_unit: windUnit,
            precipitation_unit: precipitationUnit,
            pressure_unit: pressureUnit,
            distance_unit: distanceUnit,
        },
    };
}