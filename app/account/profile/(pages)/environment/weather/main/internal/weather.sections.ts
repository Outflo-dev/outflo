/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER MODEL
   File: app/account/profile/(pages)/environment/weather/main/internal/weather.sections.ts
   Scope: Build weather control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: align weather controls to middle split signal grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { WeatherViewModel } from "./weather.types";

/* ------------------------------
   Model
-------------------------------- */
export function getWeatherModel(): WeatherViewModel {
    return {
        controls: [
            {
                key: "master",
                label: "Master",
                value: "Master Weather control.",
                enabled: false,
            },
            {
                key: "weather",
                label: "Weather",
                value: "Forecast-facing weather state.",
                enabled: false,
            },
            {
                key: "temperature",
                label: "Temperature",
                value: "Ambient temperature at the resolved context.",
                enabled: false,
            },
            {
                key: "dew_point",
                label: "Dew point",
                value: "Dew point at the resolved context.",
                enabled: false,
            },
            {
                key: "precipitation",
                label: "Precipitation",
                value: "Rain and related weather amount context.",
                enabled: false,
            },
            {
                key: "forecast",
                label: "Forecast",
                value: "Forecast remains in its existing Weather surface.",
                enabled: false,
            },
        ],
    };
}