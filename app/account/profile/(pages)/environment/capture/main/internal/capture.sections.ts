/* ==========================================================
   OUTFLO — ENVIRONMENT CAPTURE MODEL
   File: app/account/profile/(pages)/environment/capture/main/internal/capture.sections.ts
   Scope: Build capture control view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define capture control rows
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
                label: "Capture signal",
                value: "Master environment capture participation.",
                enabled: false,
            },
            {
                label: "Moment capture",
                value: "Record environment context at specific app moments.",
                enabled: false,
            },
            {
                label: "Continuous capture",
                value: "Allow environment context to update over time.",
                enabled: false,
            },
        ],
    };
}