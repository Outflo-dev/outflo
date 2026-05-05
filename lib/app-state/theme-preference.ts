/* ==========================================================
   OUTFLO — THEME PREFERENCE APP STATE
   File: lib/app-state/theme-preference.ts
   Scope: Validate and resolve persisted theme preference values
   Last Updated:
   - ms: 1777946575170
   - iso: 2026-05-05T02:02:55.170Z
   - note: centralize theme preference validation for runtime propagation
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
    | "funky";

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