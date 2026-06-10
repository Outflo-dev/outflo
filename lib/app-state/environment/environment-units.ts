/* ==========================================================
   OUTFLO — ENVIRONMENT UNITS
   File: lib/app-state/environment/environment-units.ts
   Scope: Own environment unit preference types, defaults, and validators
   Last Updated:
   - ms: 1781096852713
   - iso: 2026-06-10T13:07:32.713Z
   - note: introduce unit preference contract for Environment propagation
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type TemperatureUnit = "system" | "celsius" | "fahrenheit" | "kelvin";
export type WindUnit = "system" | "mps" | "kmh" | "mph";
export type PrecipitationUnit = "system" | "mm" | "in";
export type PressureUnit = "system" | "hpa" | "kpa" | "inhg";
export type DistanceUnit = "system" | "m" | "ft";

/* ------------------------------
   Constants
-------------------------------- */
export const TEMPERATURE_UNITS = [
    "system",
    "celsius",
    "fahrenheit",
    "kelvin",
] as const;

export const WIND_UNITS = ["system", "mps", "kmh", "mph"] as const;
export const PRECIPITATION_UNITS = ["system", "mm", "in"] as const;
export const PRESSURE_UNITS = ["system", "hpa", "kpa", "inhg"] as const;
export const DISTANCE_UNITS = ["system", "m", "ft"] as const;

export const DEFAULT_ENVIRONMENT_UNITS = {
    temperature_unit: "system",
    wind_unit: "system",
    precipitation_unit: "system",
    pressure_unit: "system",
    distance_unit: "system",
} as const;

/* ------------------------------
   Validators
-------------------------------- */
export function isTemperatureUnit(value: unknown): value is TemperatureUnit {
    return (
        typeof value === "string" &&
        TEMPERATURE_UNITS.includes(value as TemperatureUnit)
    );
}

export function isWindUnit(value: unknown): value is WindUnit {
    return typeof value === "string" && WIND_UNITS.includes(value as WindUnit);
}

export function isPrecipitationUnit(
    value: unknown
): value is PrecipitationUnit {
    return (
        typeof value === "string" &&
        PRECIPITATION_UNITS.includes(value as PrecipitationUnit)
    );
}

export function isPressureUnit(value: unknown): value is PressureUnit {
    return (
        typeof value === "string" &&
        PRESSURE_UNITS.includes(value as PressureUnit)
    );
}

export function isDistanceUnit(value: unknown): value is DistanceUnit {
    return (
        typeof value === "string" &&
        DISTANCE_UNITS.includes(value as DistanceUnit)
    );
}