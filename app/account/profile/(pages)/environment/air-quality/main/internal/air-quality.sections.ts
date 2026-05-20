/* ==========================================================
   OUTFLO — ENVIRONMENT AIR QUALITY MODEL
   File: app/account/profile/(pages)/environment/air-quality/main/internal/air-quality.sections.ts
   Scope: Build air quality control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define air quality signal control rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { AirQualityViewModel } from "./air-quality.types";

/* ------------------------------
   Model
-------------------------------- */
export function getAirQualityModel(): AirQualityViewModel {
    return {
        controls: [
            {
                label: "Air quality signal",
                value: "Master air quality participation.",
                enabled: false,
            },
            {
                label: "AQI",
                value: "Air quality index context.",
                enabled: false,
            },
            {
                label: "PM2.5",
                value: "Fine particulate matter concentration.",
                enabled: false,
            },
            {
                label: "PM10",
                value: "Coarse particulate matter concentration.",
                enabled: false,
            },
            {
                label: "Ozone",
                value: "Ground-level ozone context.",
                enabled: false,
            },
        ],
    };
}