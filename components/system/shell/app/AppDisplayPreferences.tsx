"use client";

/* ==========================================================
   OUTFLO — APP DISPLAY PREFERENCES
   File: components/system/shell/app/AppDisplayPreferences.tsx
   Scope: Apply resolved display preferences to document runtime
   Last Updated:
   - ms: 1778611632761
   - iso: 2026-05-12T18:47:12.761Z
   - note: add runtime applicator for text scale and glow preferences
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import { useEffect } from "react";

import {
    DISPLAY_PREFERENCES_EVENT,
    type DisplayPreferencesEventDetail,
} from "@/lib/app-state/display-preferences";
import type { GlowPreference } from "@/lib/app-state/glow-preference";
import { isGlowPreference } from "@/lib/app-state/glow-preference";
import type { TextScale } from "@/lib/app-state/text-scale";
import { isTextScale } from "@/lib/app-state/text-scale";

/* ------------------------------
   Types
-------------------------------- */
type AppDisplayPreferencesProps = {
    children: ReactNode;
    textScale: TextScale;
    glowPreference: GlowPreference;
};

type DisplayPreferencesEvent = CustomEvent<DisplayPreferencesEventDetail>;

/* ------------------------------
   Helpers
-------------------------------- */
function applyDocumentDisplayPreferences(
    textScale: TextScale,
    glowPreference: GlowPreference
) {
    document.documentElement.dataset.textScale = textScale;
    document.documentElement.dataset.glow = glowPreference;
}

/* ------------------------------
   Component
-------------------------------- */
export default function AppDisplayPreferences({
    children,
    textScale,
    glowPreference,
}: AppDisplayPreferencesProps) {
    useEffect(() => {
        applyDocumentDisplayPreferences(textScale, glowPreference);
    }, [textScale, glowPreference]);

    useEffect(() => {
        function handleDisplayPreferences(event: Event) {
            const detail = (event as DisplayPreferencesEvent).detail;

            if (!isTextScale(detail?.textScale)) return;
            if (!isGlowPreference(detail?.glowPreference)) return;

            applyDocumentDisplayPreferences(
                detail.textScale,
                detail.glowPreference
            );
        }

        window.addEventListener(
            DISPLAY_PREFERENCES_EVENT,
            handleDisplayPreferences
        );

        return () => {
            window.removeEventListener(
                DISPLAY_PREFERENCES_EVENT,
                handleDisplayPreferences
            );
        };
    }, []);

    return children;
}