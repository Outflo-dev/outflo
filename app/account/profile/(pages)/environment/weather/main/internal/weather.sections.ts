/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER MODEL
   File: app/account/profile/(pages)/environment/weather/main/internal/weather.sections.ts
   Scope: Build weather control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define weather signal control rows
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
                label: "Weather signal",
                value: "Master weather participation.",
                enabled: false,
            },
            {
                label: "Temperature",
                value: "Ambient temperature at the resolved context.",
                enabled: false,
            },
            {
                label: "Humidity",
                value: "Moisture level in the air.",
                enabled: false,
            },
            {
                label: "Wind",
                value: "Speed, gusts, and direction.",
                enabled: false,
            },
            {
                label: "Pressure",
                value: "Atmospheric pressure context.",
                enabled: false,
            },
        ],
    };
}