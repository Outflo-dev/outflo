/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT SERVER
   File: lib/app-state/environment/environment-engagement.server.ts
   Scope: Read persisted Guide Environment engagement state on the server
   Last Updated:
   - iso: 2026-07-14
   - note: centralize canonical server-side Engagement restoration
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { supabaseServer } from "@/lib/supabase/server";

import {
    DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE,
    isEnvironmentEngagementState,
    type EnvironmentEngagementState,
} from "./environment-engagement";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentEngagementRow = {
    engagement_enabled: unknown;
    engagement_mode: unknown;
};

/* ------------------------------
   Public API
-------------------------------- */
export async function getEnvironmentEngagementState():
    Promise<EnvironmentEngagementState> {
    const supabase = await supabaseServer();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE;
    }

    const { data, error } = await supabase
        .from("user_preferences")
        .select(
            "engagement_enabled,engagement_mode",
        )
        .eq("user_id", user.id)
        .maybeSingle<EnvironmentEngagementRow>();

    if (error) {
        throw new Error(
            `Failed to read Environment engagement: ${error.message}`,
        );
    }

    if (!data) {
        return DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE;
    }

    const engagementState = {
        enabled: data.engagement_enabled,
        mode: data.engagement_mode,
    };

    if (
        !isEnvironmentEngagementState(
            engagementState,
        )
    ) {
        return DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE;
    }

    return engagementState;
}