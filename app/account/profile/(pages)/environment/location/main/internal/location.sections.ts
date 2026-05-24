/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION MODEL
   File: app/account/profile/(pages)/environment/location/main/internal/location.sections.ts
   Scope: Build location control view model from environment preferences
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: simplify Location into participation, source, and precision controls
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
            value: "Choose how Location resolves.",
            actionLabel: "Select",
            href: locationEnabled
                ? "/account/profile/environment/location/source"
                : null,
            disabled: !locationEnabled,
        },

        activePlace: {
            label: "Active place",
            value: "Resolved through Source.",
            actionLabel: "Controls",
            href: null,
            disabled: true,
        },

        precision: {
            label: "Precision",
            value: "Control permitted location detail.",
            actionLabel: "Edit",
            href: locationEnabled
                ? "/account/profile/environment/location/precision"
                : null,
            disabled: !locationEnabled,
        },
    };
}
