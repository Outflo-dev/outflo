"use client";

/* ==========================================================
   OUTFLO — APP THEME
   File: components/system/shell/app/AppTheme.tsx
   Scope: Apply resolved app theme preference to document runtime
   Last Updated:
   - ms: 1778207400000
   - iso: 2026-05-08T02:30:00.000Z
   - note: sync document theme background and mobile theme-color chrome
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { ReactNode, useEffect } from "react";
import type { ThemePreference } from "@/lib/app-state/theme-preference";
import { isThemePreference } from "@/lib/app-state/theme-preference";

/* ------------------------------
   Types
-------------------------------- */
type AppThemeProps = {
    children: ReactNode;
    themePreference: ThemePreference;
};

type ThemePreferenceEvent = CustomEvent<{
    themePreference: ThemePreference;
}>;

/* ------------------------------
   Constants
-------------------------------- */
export const THEME_PREFERENCE_EVENT = "outflo:theme-preference";

/* ------------------------------
   Helpers
-------------------------------- */
export function emitThemePreference(themePreference: ThemePreference) {
    window.dispatchEvent(
        new CustomEvent(THEME_PREFERENCE_EVENT, {
            detail: {
                themePreference,
            },
        })
    );
}

function applyDocumentTheme(themePreference: ThemePreference) {
    document.documentElement.dataset.theme = themePreference;

    const bgPrimary = getComputedStyle(document.documentElement)
        .getPropertyValue("--bg-primary")
        .trim();

    if (!bgPrimary) return;

    document.body.style.background = bgPrimary;

    const themeColorMeta = document.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]'
    );

    if (themeColorMeta) {
        themeColorMeta.content = bgPrimary;
    }
}

/* ------------------------------
   Component
-------------------------------- */
export default function AppTheme({
    children,
    themePreference,
}: AppThemeProps) {
    useEffect(() => {
        applyDocumentTheme(themePreference);
    }, [themePreference]);

    useEffect(() => {
        function handleThemePreference(event: Event) {
            const themePreference = (event as ThemePreferenceEvent).detail
                ?.themePreference;

            if (!isThemePreference(themePreference)) return;

            applyDocumentTheme(themePreference);
        }

        window.addEventListener(THEME_PREFERENCE_EVENT, handleThemePreference);

        return () => {
            window.removeEventListener(THEME_PREFERENCE_EVENT, handleThemePreference);
        };
    }, []);

    return children;
}