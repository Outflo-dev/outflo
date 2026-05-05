"use client";

/* ==========================================================
   OUTFLO — APP THEME
   File: components/system/shell/app/AppTheme.tsx
   Scope: Apply resolved app theme preference to document runtime
   Last Updated:
   - ms: 1778018872799
   - iso: 2026-05-05T22:07:52.799Z
   - note: add single runtime theme applicator for authenticated surfaces
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

/* ------------------------------
   Component
-------------------------------- */
export default function AppTheme({
    children,
    themePreference,
}: AppThemeProps) {
    useEffect(() => {
        document.documentElement.dataset.theme = themePreference;
    }, [themePreference]);

    useEffect(() => {
        function handleThemePreference(event: Event) {
            const themePreference = (event as ThemePreferenceEvent).detail
                ?.themePreference;

            if (!isThemePreference(themePreference)) return;

            document.documentElement.dataset.theme = themePreference;
        }

        window.addEventListener(THEME_PREFERENCE_EVENT, handleThemePreference);

        return () => {
            window.removeEventListener(THEME_PREFERENCE_EVENT, handleThemePreference);
        };
    }, []);

    return children;
}