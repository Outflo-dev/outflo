/* ==========================================================
   OUTFLO — DISPLAY PREFERENCES APP STATE
   File: lib/app-state/display-preferences.ts
   Scope: Compose display preference validation and runtime event contract
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: add combined display preference contract for text scale and glow
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { GlowPreference } from "./glow-preference";
import {
    DEFAULT_GLOW_PREFERENCE,
    isGlowPreference,
    resolveGlowPreference,
} from "./glow-preference";
import type { TextScale } from "./text-scale";
import {
    DEFAULT_TEXT_SCALE,
    isTextScale,
    resolveTextScale,
} from "./text-scale";

/* ------------------------------
   Types
-------------------------------- */
export type DisplayPreferences = {
    textScale: TextScale;
    glowPreference: GlowPreference;
};

export type DisplayPreferencesPayload = {
    text_scale?: unknown;
    glow_preference?: unknown;
};

export type DisplayPreferencesEventDetail = {
    textScale: TextScale;
    glowPreference: GlowPreference;
};

/* ------------------------------
   Constants
-------------------------------- */
export const DISPLAY_PREFERENCES_EVENT = "outflo:display-preferences";

export const DEFAULT_DISPLAY_PREFERENCES: DisplayPreferences = {
    textScale: DEFAULT_TEXT_SCALE,
    glowPreference: DEFAULT_GLOW_PREFERENCE,
};

/* ------------------------------
   Helpers
-------------------------------- */
export function isDisplayPreferencesPayload(
    value: unknown
): value is DisplayPreferencesPayload {
    if (!value || typeof value !== "object") return false;

    const payload = value as DisplayPreferencesPayload;

    return (
        (payload.text_scale === undefined || isTextScale(payload.text_scale)) &&
        (payload.glow_preference === undefined ||
            isGlowPreference(payload.glow_preference))
    );
}

export function resolveDisplayPreferences(
    payload: DisplayPreferencesPayload | null | undefined
): DisplayPreferences {
    return {
        textScale: resolveTextScale(payload?.text_scale),
        glowPreference: resolveGlowPreference(payload?.glow_preference),
    };
}

export function emitDisplayPreferences(
    displayPreferences: DisplayPreferences
): void {
    window.dispatchEvent(
        new CustomEvent<DisplayPreferencesEventDetail>(
            DISPLAY_PREFERENCES_EVENT,
            {
                detail: displayPreferences,
            }
        )
    );
}
