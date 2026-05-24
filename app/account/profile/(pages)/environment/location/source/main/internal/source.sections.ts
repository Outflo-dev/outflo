/* ==========================================================
   OUTFLO — LOCATION SOURCE MODEL
   File: app/account/profile/(pages)/environment/location/source/main/internal/source.sections.ts
   Scope: Build location source choice model from environment preferences
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: recast source as off device and city choices
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
                label: "Off",
                value: "Do not use user location for Environment.",
                selected: preferences.location_mode === "off",
                disabled: false,
                kind: "off",
                actionLabel:
                    preferences.location_mode === "off" ? "Selected" : "Choose",
            },
            {
                label: "Device",
                value: "Use this device when Outflō is open.",
                selected: preferences.location_mode === "device",
                disabled: false,
                kind: "device",
                actionLabel:
                    preferences.location_mode === "device"
                        ? "Selected"
                        : "Choose",
            },
            {
                label: "City",
                value: hasManualCity
                    ? `Use ${preferences.manual_city} as place context.`
                    : "Choose an active place before using City.",
                selected: preferences.location_mode === "manual_city",
                disabled: false,
                kind: "manual_city",
                actionLabel: hasManualCity
                    ? preferences.location_mode === "manual_city"
                        ? "Selected"
                        : "Choose"
                    : "Add place",
            },
        ],
    };
}