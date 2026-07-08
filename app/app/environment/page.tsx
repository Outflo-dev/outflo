// app/app/environment/page.tsx
/* ==========================================================
   OUTFLO — ENVIRONMENT PAGE
   File: app/app/environment/page.tsx
   Scope: Server route entry for Environment substrate surface
   Last Updated:
   - ms:
   - iso:
   - note: route applies AppFrame directly for Environment
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import AppFrame from "@/components/system/shell/app/AppFrame";
import { DEFAULT_ENVIRONMENT_PREFERENCES } from "@/lib/app-state/environment/environment-preferences";
import { getEnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences.server";
import { supabaseServer } from "@/lib/supabase/server";

import EnvironmentController from "./main/internal/EnvironmentController";
import type { EnvironmentSnapshot } from "./main/internal/environment.types";

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
                    environmentPreferences={DEFAULT_ENVIRONMENT_PREFERENCES}
                />
            </AppFrame>
        );
    }

    const [
        { data: snapshot },
        { data: preferences },
        environmentPreferences,
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
    ]);

    const environmentEnabled =
        preferences?.location_mode !== "off";

    return (
        <AppFrame>
            <EnvironmentController
                snapshot={(snapshot ?? null) as EnvironmentSnapshot | null}
                environmentEnabled={environmentEnabled}
                environmentPreferences={environmentPreferences}
            />
        </AppFrame>
    );
}