/* ==========================================================
   OUTFLO — ENVIRONMENT DISPLAY COMPILER
   File: app/app/environment/main/internal/compiler/environment.display.ts
   Scope: Own Environment display-unit rules and formatting helpers
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: normalize Environment preferences at display compiler boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
    type EnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences";
import type { TemperatureUnit } from "@/lib/app-state/environment/environment-units";

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentResolvedTemperatureUnit = Exclude<
    TemperatureUnit,
    "system"
>;

export type EnvironmentDisplayContext = {
    temperaturePreference: TemperatureUnit;
    temperatureUnit: EnvironmentResolvedTemperatureUnit;
};

/* ------------------------------
   Constants
-------------------------------- */
const DEFAULT_RESOLVED_TEMPERATURE_UNIT: EnvironmentResolvedTemperatureUnit =
    "fahrenheit";

const FAHRENHEIT_COUNTRY_CODES = new Set([
    "US",
    "BS",
    "BZ",
    "KY",
    "PR",
    "GU",
    "VI",
    "AS",
]);

/* ------------------------------
   Public API
-------------------------------- */
export function getEnvironmentDisplayContext(
    snapshot: Record<string, unknown> | null,
    preferences?: EnvironmentPreferences
): EnvironmentDisplayContext {
    const temperaturePreference =
        preferences?.temperature_unit ??
        DEFAULT_ENVIRONMENT_PREFERENCES.temperature_unit;

    return {
        temperaturePreference,
        temperatureUnit: resolveTemperatureUnit(
            snapshot,
            temperaturePreference
        ),
    };
}

export function resolveTemperatureUnit(
    snapshot: Record<string, unknown> | null,
    preference: TemperatureUnit
): EnvironmentResolvedTemperatureUnit {
    if (preference !== "system") {
        return preference;
    }

    return getSystemTemperatureUnitForSnapshot(snapshot);
}

export function getSystemTemperatureUnitForSnapshot(
    snapshot: Record<string, unknown> | null
): EnvironmentResolvedTemperatureUnit {
    const countryCode = readSnapshotString(snapshot, [
        "country_code",
        "countryCode",
        "location_country_code",
        "locationCountryCode",
        "provider_country_code",
        "providerCountryCode",
    ]);

    if (countryCode) {
        return FAHRENHEIT_COUNTRY_CODES.has(countryCode.toUpperCase())
            ? "fahrenheit"
            : "celsius";
    }

    return DEFAULT_RESOLVED_TEMPERATURE_UNIT;
}

export function formatTemperatureC(
    value: unknown,
    unit: EnvironmentResolvedTemperatureUnit
): string {
    const celsius = readNumber(value);

    if (celsius === null) {
        return "—";
    }

    if (unit === "fahrenheit") {
        return `${Math.round((celsius * 9) / 5 + 32)}°`;
    }

    if (unit === "kelvin") {
        return `${Math.round(celsius + 273.15)}°`;
    }

    return `${Math.round(celsius)}°`;
}

export function getTemperatureUnitLabel(
    unit: EnvironmentResolvedTemperatureUnit
): "°C" | "°F" | "°K" {
    if (unit === "fahrenheit") return "°F";
    if (unit === "kelvin") return "°K";

    return "°C";
}

/* ------------------------------
   Helpers
-------------------------------- */
function readNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);

        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }

    return null;
}

function readSnapshotString(
    snapshot: Record<string, unknown> | null,
    keys: string[]
): string | null {
    if (!snapshot) return null;

    for (const key of keys) {
        const value = snapshot[key];

        if (typeof value === "string" && value.trim().length > 0) {
            return value.trim();
        }
    }

    return null;
}