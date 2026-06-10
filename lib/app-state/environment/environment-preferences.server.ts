/* ==========================================================
   OUTFLO — ENVIRONMENT PREFERENCES SERVER
   File: lib/app-state/environment/environment-preferences.server.ts
   Scope: Own server-side reads and writes for persisted Environment preferences
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: surface persisted Environment preference read/write failures
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseServer } from "@/lib/supabase/server";

import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
    type EnvironmentPreferences,
} from "./environment-preferences";
import {
    isTemperatureUnit,
    type TemperatureUnit,
} from "./environment-units";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentUserSettingsRow = {
    temperature_unit: unknown;
};

/* ------------------------------
   Public API
-------------------------------- */
export async function getEnvironmentPreferences(): Promise<EnvironmentPreferences> {
    const supabase = await supabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return DEFAULT_ENVIRONMENT_PREFERENCES;
    }

    const { data, error } = await supabase
        .from("environment_user_settings")
        .select("temperature_unit")
        .eq("user_id", user.id)
        .maybeSingle<EnvironmentUserSettingsRow>();

    if (error) {
        throw new Error(
            `Failed to read Environment preferences: ${error.message}`
        );
    }

    return {
        ...DEFAULT_ENVIRONMENT_PREFERENCES,
        temperature_unit: normalizeTemperatureUnit(data?.temperature_unit),
    };
}

export async function updateEnvironmentTemperatureUnit(
    temperatureUnit: TemperatureUnit
): Promise<EnvironmentPreferences> {
    const supabase = await supabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Cannot update Environment preferences without a user.");
    }

    const normalizedTemperatureUnit =
        normalizeTemperatureUnit(temperatureUnit);

    const { error } = await supabase
        .from("environment_user_settings")
        .upsert(
            {
                user_id: user.id,
                temperature_unit: normalizedTemperatureUnit,
                updated_at: new Date().toISOString(),
            },
            {
                onConflict: "user_id",
            }
        );

    if (error) {
        throw new Error(
            `Failed to update Environment temperature unit: ${error.message}`
        );
    }

    return {
        ...DEFAULT_ENVIRONMENT_PREFERENCES,
        temperature_unit: normalizedTemperatureUnit,
    };
}

/* ------------------------------
   Helpers
-------------------------------- */
function normalizeTemperatureUnit(value: unknown): TemperatureUnit {
    if (isTemperatureUnit(value)) {
        return value;
    }

    return DEFAULT_ENVIRONMENT_PREFERENCES.temperature_unit;
}