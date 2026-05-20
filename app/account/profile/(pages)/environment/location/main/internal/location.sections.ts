/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION MODEL
   File: app/account/profile/(pages)/environment/location/main/internal/location.sections.ts
   Scope: Build location control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define location control rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { LocationViewModel } from "./location.types";

/* ------------------------------
   Model
-------------------------------- */
export function getLocationModel(): LocationViewModel {
    return {
        controls: [
            {
                label: "Location signal",
                value: "Master user-specific location participation.",
                enabled: false,
            },
            {
                label: "Manual city",
                value: "Use a manually selected city as environment context.",
                enabled: false,
            },
            {
                label: "Device location",
                value: "Allow device location when permission is granted.",
                enabled: false,
            },
            {
                label: "Location precision",
                value: "Control whether location context is broad or precise.",
                enabled: false,
            },
        ],
    };
}