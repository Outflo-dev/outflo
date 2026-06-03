/* ==========================================================
   OUTFLO — ENVIRONMENT PREFERENCES
   File: lib/app-state/environment-preferences.ts
   Scope: Own environment preference types, defaults, and validators
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: extract environment preference contract for shared propagation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { DEFAULT_THEME_PREFERENCE } from "@/lib/app-state/theme-preference";

/* ------------------------------
   Types
-------------------------------- */
export type LocationMode = "off" | "device" | "manual_city";
export type WeatherMode = "off" | "on";
export type LocationPrecision = "city" | "approximate" | "precise";
export type CaptureMode = "off" | "moment" | "continuous";
export type SignalMode = "off" | "on";

export type EnvironmentPreferences = {
    location_mode: LocationMode;
    manual_city: string | null;
    location_precision: LocationPrecision;
    weather_mode: WeatherMode;
    capture_mode: CaptureMode;
    sun_mode: SignalMode;
    precipitation_mode: SignalMode;
    air_quality_mode: SignalMode;
    receipt_links_mode: SignalMode;
    snapshots_mode: SignalMode;
};

/* ------------------------------
   Constants
-------------------------------- */
export const LOCATION_MODES = ["off", "device", "manual_city"] as const;
export const WEATHER_MODES = ["off", "on"] as const;
export const LOCATION_PRECISIONS = ["city", "approximate", "precise"] as const;
export const CAPTURE_MODES = ["off", "moment", "continuous"] as const;
export const SIGNAL_MODES = ["off", "on"] as const;

export const DEFAULT_ENVIRONMENT_PREFERENCES: EnvironmentPreferences = {
    location_mode: "off",
    manual_city: null,
    location_precision: "city",
    weather_mode: "off",
    capture_mode: "off",
    sun_mode: "off",
    precipitation_mode: "off",
    air_quality_mode: "off",
    receipt_links_mode: "off",
    snapshots_mode: "off",
};

export const DEFAULT_USER_PREFERENCES = {
    base_currency: "USD",
    time_display: "auto",
    theme_preference: DEFAULT_THEME_PREFERENCE,
    text_scale: "compact",
    glow_preference: "soft",
    ...DEFAULT_ENVIRONMENT_PREFERENCES,
} as const;

/* ------------------------------
   Validators
-------------------------------- */
export function isLocationMode(value: unknown): value is LocationMode {
    return (
        typeof value === "string" &&
        LOCATION_MODES.includes(value as LocationMode)
    );
}

export function isWeatherMode(value: unknown): value is WeatherMode {
    return (
        typeof value === "string" &&
        WEATHER_MODES.includes(value as WeatherMode)
    );
}

export function isLocationPrecision(value: unknown): value is LocationPrecision {
    return (
        typeof value === "string" &&
        LOCATION_PRECISIONS.includes(value as LocationPrecision)
    );
}

export function isCaptureMode(value: unknown): value is CaptureMode {
    return (
        typeof value === "string" &&
        CAPTURE_MODES.includes(value as CaptureMode)
    );
}

export function isSignalMode(value: unknown): value is SignalMode {
    return (
        typeof value === "string" &&
        SIGNAL_MODES.includes(value as SignalMode)
    );
}

export function normalizeManualCity(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const clean = value.trim();

    return clean ? clean : null;
}