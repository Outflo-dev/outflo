/* ==========================================================
   OUTFLO — ENVIRONMENT CAPTURE MODEL
   File: app/account/profile/(pages)/environment/capture/main/internal/capture.sections.ts
   Scope: Build capture control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define Off, Moment, and Continuous capture controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CaptureViewModel } from "./capture.types";

/* ------------------------------
   Model
-------------------------------- */
export function getCaptureModel(): CaptureViewModel {
    return {
        controls: [
            {
                label: "Off",
                value: "Do not record Environment context.",
                enabled: false,
            },
            {
                label: "Moment",
                value: "Record Environment when explicitly requested.",
                enabled: false,
            },
            {
                label: "Continuous",
                value: "Accept background emitter reports.",
                enabled: true,
            },
        ],
    };
}