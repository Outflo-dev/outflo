/* ==========================================================
   OUTFLO — ENVIRONMENT SETTINGS MENU ROWS
   File: app/app/environment/main/view/header/menu/settings/environment-settings-menu.rows.ts
   Scope: Define Environment header menu row data
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: define Environment menu labels, unit rows, and settings route
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentSettingsMenuUnit = "celsius" | "fahrenheit" | "kelvin";

export type EnvironmentSettingsMenuUnitRow = {
    label: "Celsius" | "Fahrenheit" | "Kelvin";
    unit: EnvironmentSettingsMenuUnit;
    mark: "°C" | "°F" | "°K";
};

/* ------------------------------
   Constants
-------------------------------- */
export const ENVIRONMENT_SETTINGS_MENU_LABELS = {
    editSettings: "Edit Settings",
    units: "Units",
    environmentSettings: "Environment Settings",
} as const;

export const ENVIRONMENT_SETTINGS_MENU_UNITS: EnvironmentSettingsMenuUnitRow[] = [
    {
        label: "Celsius",
        unit: "celsius",
        mark: "°C",
    },
    {
        label: "Fahrenheit",
        unit: "fahrenheit",
        mark: "°F",
    },
    {
        label: "Kelvin",
        unit: "kelvin",
        mark: "°K",
    },
];

export const ENVIRONMENT_SETTINGS_HREF = "/account/profile/environment";