/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION MODEL
   File: app/account/profile/(pages)/environment/location/main/internal/location.sections.ts
   Scope: Build location control view model from environment preferences
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: separate active place and precision availability by location source
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
    const deviceSelected = preferences.location_mode === "device";
    const manualSelected = preferences.location_mode === "manual_city";
    const activePlaceDisabled = !locationEnabled || deviceSelected;
    const precisionDisabled = !locationEnabled || manualSelected;

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

        activePlace: {
            label: "Active place",
            value: getActivePlaceValue(
                preferences.manual_city,
                locationEnabled,
                deviceSelected
            ),
            actionLabel: getActivePlaceActionLabel(
                preferences.manual_city,
                locationEnabled,
                deviceSelected
            ),
            href: activePlaceDisabled
                ? null
                : "/account/profile/environment/location/manual-city",
            disabled: activePlaceDisabled,
        },

        precision: {
            label: "Precision",
            value: getPrecisionValue(
                preferences.location_precision,
                locationEnabled,
                manualSelected
            ),
            actionLabel: getPrecisionActionLabel(
                preferences.location_precision,
                locationEnabled,
                manualSelected
            ),
            href: precisionDisabled
                ? null
                : "/account/profile/environment/location/precision",
            disabled: precisionDisabled,
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

function getActivePlaceValue(
    manualCity: string | null,
    locationEnabled: boolean,
    deviceSelected: boolean
) {
    if (!locationEnabled) return "Disabled while Location is off.";
    if (deviceSelected) return "Inactive while Source is Device.";

    return manualCity ? manualCity : "No active place selected.";
}

function getActivePlaceActionLabel(
    manualCity: string | null,
    locationEnabled: boolean,
    deviceSelected: boolean
) {
    if (!locationEnabled || deviceSelected) return "Disabled";

    return manualCity ? "Change" : "Add";
}

function getPrecisionValue(
    precision: ProfileEnvironmentPreferences["location_precision"],
    locationEnabled: boolean,
    manualSelected: boolean
) {
    if (!locationEnabled) return "Disabled while Location is off.";
    if (manualSelected) return "City precision locked for Manual source.";

    return getPrecisionLabel(precision);
}

function getPrecisionActionLabel(
    precision: ProfileEnvironmentPreferences["location_precision"],
    locationEnabled: boolean,
    manualSelected: boolean
) {
    if (!locationEnabled) return "Disabled";
    if (manualSelected) return "City";

    return getPrecisionLabel(precision);
}

function getPrecisionLabel(
    precision: ProfileEnvironmentPreferences["location_precision"]
) {
    if (precision === "approximate") return "Approximate";
    if (precision === "precise") return "Precise";
    return "City";
}
