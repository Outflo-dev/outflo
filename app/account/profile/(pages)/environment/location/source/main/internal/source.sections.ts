/* ==========================================================
   OUTFLO — LOCATION SOURCE MODEL
   File: app/account/profile/(pages)/environment/location/source/main/internal/source.sections.ts
   Scope: Build location source choice model from environment preferences
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: source is Manual place or Emitter; Location owns off state
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
                label: "Manual place",
                value: hasManualCity
                    ? `Use ${preferences.manual_city} as place context.`
                    : "Choose a place before using Manual place.",
                selected: preferences.location_mode === "manual_city",
                disabled: false,
                kind: "manual_city",
                actionLabel: hasManualCity
                    ? preferences.location_mode === "manual_city"
                        ? "Selected"
                        : "Choose"
                    : "Add place",
            },
            {
                label: "Emitter",
                value: "Use a registered external emitter for location context.",
                selected: preferences.location_mode === "device",
                disabled: false,
                kind: "device",
                actionLabel:
                    preferences.location_mode === "device"
                        ? "Selected"
                        : "Choose",
            },
        ],
    };
}