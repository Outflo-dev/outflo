/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT MODEL
   File: app/account/profile/(pages)/environment/main/internal/environment.sections.ts
   Scope: Build profile environment activation view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define environment participation runtime and records rows
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
                mark: "location",
                label: "Location",
                value: "Off",
                actionLabel: "Soon",
            },
            {
                mark: "weather",
                label: "Weather",
                value: "Requires location",
                actionLabel: "Soon",
            },
            {
                mark: "capture",
                label: "Capture",
                value: "Moment-based only",
                actionLabel: "Soon",
            },
        ],

        runtime: [
            {
                mark: "runtime",
                label: "Active context",
                value: "Baseline only",
            },
            {
                mark: "weather",
                label: "Weather eligibility",
                value: "Blocked until location is active",
            },
            {
                mark: "snapshot",
                label: "Snapshot eligibility",
                value: "Not active",
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