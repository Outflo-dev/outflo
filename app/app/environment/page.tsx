// app/app/environment/page.tsx
/* ==========================================================
   OUTFLO — ENVIRONMENT PAGE
   File: app/app/environment/page.tsx
   Scope: Restore canonical Environment state for the substrate surface
   Last Updated:
   - iso: 2026-07-14
   - note: restore canonical Engagement state through shared server ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import AppFrame from "@/components/system/shell/app/AppFrame";

import {
    DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE,
} from "@/lib/app-state/environment/environment-engagement";
import {
    getEnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement.server";
import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
} from "@/lib/app-state/environment/environment-preferences";
import {
    getEnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences.server";
import { supabaseServer } from "@/lib/supabase/server";

import EnvironmentController from "./main/internal/EnvironmentController";
import type {
    EnvironmentSnapshot,
} from "./main/internal/environment.types";

/* ------------------------------
   Runtime
-------------------------------- */
export const dynamic = "force-dynamic";

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
            <AppFrame>
                <EnvironmentController
                    snapshot={null}
                    environmentEnabled={false}
                    environmentPreferences={
                        DEFAULT_ENVIRONMENT_PREFERENCES
                    }
                    engagementState={
                        DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE
                    }
                />
            </AppFrame>
        );
    }

    const [
        { data: snapshot },
        { data: preferences },
        environmentPreferences,
        engagementState,
    ] = await Promise.all([
        supabase
            .from("environment_snapshots")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle(),

        supabase
            .from("user_preferences")
            .select("location_mode")
            .eq("user_id", user.id)
            .maybeSingle(),

        getEnvironmentPreferences(),

        getEnvironmentEngagementState(),
    ]);

    const environmentEnabled =
        preferences?.location_mode !== "off";

    return (
        <AppFrame>
            <EnvironmentController
                snapshot={
                    (snapshot ?? null) as
                    EnvironmentSnapshot | null
                }
                environmentEnabled={
                    environmentEnabled
                }
                environmentPreferences={
                    environmentPreferences
                }
                engagementState={
                    engagementState
                }
            />
        </AppFrame>
    );
}