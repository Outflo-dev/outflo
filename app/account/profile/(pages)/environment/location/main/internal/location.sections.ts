/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION MODEL
   File: app/account/profile/(pages)/environment/location/main/internal/location.sections.ts
   Scope: Build location control view model from environment preferences
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: derive location system and drilldown controls from persisted environment preferences
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ProfileEnvironmentPreferences } from "../../../main/internal/profile-environment.client";
import type { LocationViewModel } from "./location.types";

/* ------------------------------
   Model
-------------------------------- */
export function getLocationModel(
    preferences: ProfileEnvironmentPreferences
): LocationViewModel {
    const locationEnabled = preferences.location_mode !== "off";

    return {
        preferences,

        master: {
            label: "Location",
            value: locationEnabled
                ? "Location may participate in Environment."
                : "Location is not participating in Environment.",
            enabled: locationEnabled,
        },

        source: {
            label: "Source",
            value: locationEnabled
                ? "Choose how place resolves."
                : "Disabled while Location is off.",
            actionLabel: locationEnabled
                ? getSourceLabel(preferences.location_mode)
                : "Disabled",
            href: locationEnabled
                ? "/account/profile/environment/location/source"
                : null,
            disabled: !locationEnabled,
        },

        manualCity: {
            label: "Manual city",
            value: locationEnabled
                ? getManualCityValue(preferences.manual_city)
                : "Disabled while Location is off.",
            actionLabel: locationEnabled
                ? preferences.manual_city
                    ? "Change"
                    : "Add"
                : "Disabled",
            href: locationEnabled
                ? "/account/profile/environment/location/manual-city"
                : null,
            disabled: !locationEnabled,
        },

        precision: {
            label: "Precision",
            value: locationEnabled
                ? getPrecisionLabel(preferences.location_precision)
                : "Disabled while Location is off.",
            actionLabel: locationEnabled
                ? getPrecisionLabel(preferences.location_precision)
                : "Disabled",
            href: locationEnabled
                ? "/account/profile/environment/location/precision"
                : null,
            disabled: !locationEnabled,
        },
    };
}

/* ------------------------------
   Helpers
-------------------------------- */
function getSourceLabel(
    locationMode: ProfileEnvironmentPreferences["location_mode"]
) {
    if (locationMode === "device") return "Device";
    if (locationMode === "manual_city") return "Manual";
    return "Disabled";
}

function getManualCityValue(manualCity: string | null) {
    return manualCity ? manualCity : "No city selected.";
}

function getPrecisionLabel(
    precision: ProfileEnvironmentPreferences["location_precision"]
) {
    if (precision === "approximate") return "Approximate";
    if (precision === "precise") return "Precise";
    return "City";
}