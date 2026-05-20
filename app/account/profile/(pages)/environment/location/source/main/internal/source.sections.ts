/* ==========================================================
   OUTFLO — LOCATION SOURCE MODEL
   File: app/account/profile/(pages)/environment/location/source/main/internal/source.sections.ts
   Scope: Build location source control view model from environment preferences
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: derive selected source rows from persisted location mode
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ProfileEnvironmentPreferences } from "../../../../main/internal/profile-environment.client";
import type { SourceViewModel } from "./source.types";

/* ------------------------------
   Model
-------------------------------- */
export function getSourceModel(
    preferences: ProfileEnvironmentPreferences
): SourceViewModel {
    const hasManualCity = Boolean(preferences.manual_city);

    return {
        options: [
            {
                label: "Device location",
                value: "Use this device when permission is granted.",
                selected: preferences.location_mode === "device",
                disabled: false,
                kind: "device",
            },
            {
                label: "Manual city",
                value: hasManualCity
                    ? `Use ${preferences.manual_city} as place context.`
                    : "Add a manual city before selecting this source.",
                selected: preferences.location_mode === "manual_city",
                disabled: !hasManualCity,
                kind: "manual_city",
            },
            {
                label: "Off",
                value: "Do not use location as environment context.",
                selected: preferences.location_mode === "off",
                disabled: false,
                kind: "off",
            },
        ],
    };
}