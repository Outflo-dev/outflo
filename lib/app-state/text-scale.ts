/* ==========================================================
   OUTFLO — TEXT SCALE APP STATE
   File: lib/app-state/text-scale.ts
   Scope: Validate and resolve persisted text scale preference values
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: add text scale preference validation for runtime propagation
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type TextScale =
    | "compact"
    | "standard"
    | "large";

/* ------------------------------
   Constants
-------------------------------- */
export const DEFAULT_TEXT_SCALE: TextScale = "compact";

export const TEXT_SCALES = [
    "compact",
    "standard",
    "large",
] as const;

/* ------------------------------
   Helpers
-------------------------------- */
export function isTextScale(value: unknown): value is TextScale {
    return (
        typeof value === "string" &&
        TEXT_SCALES.includes(value as TextScale)
    );
}

export function resolveTextScale(value: unknown): TextScale {
    return isTextScale(value) ? value : DEFAULT_TEXT_SCALE;
}