/* ==========================================================
   OUTFLO — ENVIRONMENT PRECIPITATION MODEL
   File: app/account/profile/(pages)/environment/precipitation/main/internal/precipitation.sections.ts
   Scope: Build precipitation control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define precipitation signal control rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { PrecipitationViewModel } from "./precipitation.types";

/* ------------------------------
   Model
-------------------------------- */
export function getPrecipitationModel(): PrecipitationViewModel {
    return {
        controls: [
            {
                label: "Precipitation signal",
                value: "Master precipitation participation.",
                enabled: false,
            },
            {
                label: "Rain",
                value: "Whether rain is present at the moment.",
                enabled: false,
            },
            {
                label: "Accumulation",
                value: "Measured precipitation amount.",
                enabled: false,
            },
            {
                label: "Probability",
                value: "Chance of precipitation context.",
                enabled: false,
            },
        ],
    };
}