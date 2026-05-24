/* ==========================================================
   OUTFLO — MANUAL CITY MODEL
   File: app/account/profile/(pages)/environment/location/manual-city/main/internal/manual-city.sections.ts
   Scope: Build active place control view model from environment preferences
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: rename manual city language to active place language
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ProfileEnvironmentPreferences } from "../../../../main/internal/profile-environment.client";
import type { ManualCityViewModel } from "./manual-city.types";

/* ------------------------------
   Model
-------------------------------- */
export function getManualCityModel(
    preferences: ProfileEnvironmentPreferences,
    draftCity: string
): ManualCityViewModel {
    const trimmedDraftCity = draftCity.trim();
    const currentCity = preferences.manual_city?.trim() ?? "";

    return {
        value: draftCity,
        placeholder: "City, region",
        currentLabel: "Active place",
        currentValue: currentCity || "No active place selected.",
        canSave:
            trimmedDraftCity.length > 0 &&
            trimmedDraftCity.toLowerCase() !== currentCity.toLowerCase(),
    };
}