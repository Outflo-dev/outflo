/* ==========================================================
   OUTFLO — GLOW PREFERENCE APP STATE
   File: lib/app-state/glow-preference.ts
   Scope: Validate and resolve persisted glow preference values
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: add glow preference validation for runtime propagation
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type GlowPreference =
    | "matte"
    | "soft"
    | "full";

/* ------------------------------
   Constants
-------------------------------- */
export const DEFAULT_GLOW_PREFERENCE: GlowPreference = "soft";

export const GLOW_PREFERENCES = [
    "matte",
    "soft",
    "full",
] as const;

/* ------------------------------
   Helpers
-------------------------------- */
export function isGlowPreference(value: unknown): value is GlowPreference {
    return (
        typeof value === "string" &&
        GLOW_PREFERENCES.includes(value as GlowPreference)
    );
}

export function resolveGlowPreference(value: unknown): GlowPreference {
    return isGlowPreference(value) ? value : DEFAULT_GLOW_PREFERENCE;
}