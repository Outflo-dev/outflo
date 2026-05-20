/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT MODEL
   File: app/account/profile/(pages)/environment/main/internal/environment.sections.ts
   Scope: Build profile environment activation view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define environment participation signals and records rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentViewModel } from "./environment.types";

/* ------------------------------
   Model
-------------------------------- */
export function getEnvironmentModel(): EnvironmentViewModel {
    return {
        participation: [
            {
                mark: "environment",
                label: "Environment",
                value: "Off",
                actionLabel: "Soon",
            },
            {
                mark: "location",
                label: "Location",
                value: "Off",
                actionLabel: "Soon",
            },
            {
                mark: "capture",
                label: "Capture",
                value: "Off",
                actionLabel: "Soon",
            },
        ],

        signals: [
            {
                mark: "sun",
                label: "Sun",
                value: "Altitude + azimuth",
                actionLabel: "Soon",
            },
            {
                mark: "precipitation",
                label: "Precipitation",
                value: "Rain + accumulation",
                actionLabel: "Soon",
            },
            {
                mark: "weather",
                label: "Weather",
                value: "Temperature + conditions",
                actionLabel: "Soon",
            },
            {
                mark: "air",
                label: "Air quality",
                value: "AQI + particles",
                actionLabel: "Soon",
            },
        ],

        records: [
            {
                mark: "snapshot",
                label: "Snapshots",
                value: "No environment records yet",
                actionLabel: "Soon",
            },
            {
                mark: "receipt",
                label: "Receipt links",
                value: "No linked context yet",
                actionLabel: "Soon",
            },
        ],
    };
}