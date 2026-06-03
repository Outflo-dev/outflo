/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER TYPES
   File: app/account/profile/(pages)/environment/weather/main/internal/weather.types.ts
   Scope: Define weather control view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add keyed weather controls for local toggle wiring
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type WeatherControlKey =
    | "master"
    | "weather"
    | "temperature"
    | "dew_point"
    | "precipitation"
    | "forecast";

export type WeatherControlRowData = {
    key: WeatherControlKey;
    label: string;
    value: string;
    enabled: boolean;
};

export type WeatherViewModel = {
    controls: WeatherControlRowData[];
};