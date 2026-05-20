/* ==========================================================
   OUTFLO — ENVIRONMENT SUN MODEL
   File: app/account/profile/(pages)/environment/sun/main/internal/sun.sections.ts
   Scope: Build sun control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define sun signal control rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { SunViewModel } from "./sun.types";

/* ------------------------------
   Model
-------------------------------- */
export function getSunModel(): SunViewModel {
    return {
        controls: [
            {
                label: "Sun signal",
                value: "Master sun participation.",
                enabled: false,
            },
            {
                label: "Altitude",
                value: "Sun height above the horizon.",
                enabled: false,
            },
            {
                label: "Azimuth",
                value: "Sun direction across the horizon.",
                enabled: false,
            },
            {
                label: "Daylight state",
                value: "Day, night, sunrise, and sunset context.",
                enabled: false,
            },
        ],
    };
}