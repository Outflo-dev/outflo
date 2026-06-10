/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION PAGE
   File: app/account/profile/(pages)/environment/location/page.tsx
   Scope: Server route entry for environment location controls
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: read environment preferences before rendering location controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ProfileEnvironmentPreferences } from "../main/internal/profile-environment.client";
import { supabaseServer } from "@/lib/supabase/server";

import LocationController from "./main/internal/LocationController";

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
   temperature_unit: "system",
   wind_unit: "system",
   precipitation_unit: "system",
   pressure_unit: "system",
   distance_unit: "system",
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
      return <LocationController preferences={DEFAULT_ENVIRONMENT_PREFERENCES} />;
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
      <LocationController
         preferences={{
            ...DEFAULT_ENVIRONMENT_PREFERENCES,
            ...data,
         }}
      />
   );
}