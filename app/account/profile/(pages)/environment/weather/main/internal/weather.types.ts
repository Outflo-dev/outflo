/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER TYPES
   File: app/account/profile/(pages)/environment/weather/main/internal/weather.types.ts
   Scope: Define weather control view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add weather control row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type WeatherControlRowData = {
    label: string;
    value: string;
    enabled: boolean;
};

export type WeatherViewModel = {
    controls: WeatherControlRowData[];
};