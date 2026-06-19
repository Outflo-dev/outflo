/* ==========================================================
   OUTFLO — THEME PREFERENCE APP STATE
   File: lib/app-state/theme-preference.ts
   Scope: Validate and resolve persisted theme preference values
   Last Updated:
   - ms: 1781877616535
   - iso: 2026-06-19T14:00:16.535Z
   - note: add Environment as full selectable Outflō theme
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type ThemePreference =
    | "dark"
    | "light"
    | "dawn"
    | "day"
    | "dusk"
    | "night"
    | "funky"
    | "environment";

/* ------------------------------
   Constants
-------------------------------- */
export const DEFAULT_THEME_PREFERENCE: ThemePreference = "dark";

export const THEME_PREFERENCES = [
    "dark",
    "light",
    "dawn",
    "day",
    "dusk",
    "night",
    "funky",
    "environment",
] as const;

/* ------------------------------
   Helpers
-------------------------------- */
export function isThemePreference(value: unknown): value is ThemePreference {
    return (
        typeof value === "string" &&
        THEME_PREFERENCES.includes(value as ThemePreference)
    );
}

export function resolveThemePreference(value: unknown): ThemePreference {
    return isThemePreference(value) ? value : DEFAULT_THEME_PREFERENCE;
}