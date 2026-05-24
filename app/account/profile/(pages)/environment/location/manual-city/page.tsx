/* ==========================================================
   OUTFLO — MANUAL CITY PAGE
   File: app/account/profile/(pages)/environment/location/manual-city/page.tsx
   Scope: Server route entry for manual city location control
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: read persisted environment preferences for manual city controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ProfileEnvironmentPreferences } from "../../main/internal/profile-environment.client";

import { supabaseServer } from "@/lib/supabase/server";

import ManualCityController from "./main/internal/ManualCityController";

/* ------------------------------
   Types
-------------------------------- */
type PreferenceRow = Partial<ProfileEnvironmentPreferences>;

/* ------------------------------
   Constants
-------------------------------- */
const DEFAULT_ENVIRONMENT_PREFERENCES: ProfileEnvironmentPreferences = {
    location_mode: "device",
    manual_city: null,
    location_precision: "city",
    weather_mode: "on",
    capture_mode: "off",
    sun_mode: "on",
    precipitation_mode: "on",
    air_quality_mode: "on",
    receipt_links_mode: "on",
    snapshots_mode: "on",
};

/* ------------------------------
   Page
-------------------------------- */
export default async function Page() {
    const supabase = await supabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <ManualCityController
                preferences={DEFAULT_ENVIRONMENT_PREFERENCES}
            />
        );
    }

    const { data } = await supabase
        .from("user_preferences")
        .select(
            [
                "location_mode",
                "manual_city",
                "location_precision",
                "weather_mode",
                "capture_mode",
                "sun_mode",
                "precipitation_mode",
                "air_quality_mode",
                "receipt_links_mode",
                "snapshots_mode",
            ].join(", ")
        )
        .eq("user_id", user.id)
        .maybeSingle<PreferenceRow>();

    return (
        <ManualCityController
            preferences={{
                ...DEFAULT_ENVIRONMENT_PREFERENCES,
                ...data,
            }}
        />
    );
}