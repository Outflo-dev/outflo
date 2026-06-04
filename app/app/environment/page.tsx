// app/app/environment/page.tsx
/* ==========================================================
   OUTFLO — ENVIRONMENT PAGE
   File: app/app/environment/page.tsx
   Scope: Server route entry for Environment substrate surface
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment substrate consumer route packet
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
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
            <EnvironmentController
                snapshot={null}
                environmentEnabled={false}
            />
        );
    }

    const [{ data: snapshot }, { data: preferences }] = await Promise.all([
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
    ]);

    const environmentEnabled =
        preferences?.location_mode !== "off";

    return (
        <EnvironmentController
            snapshot={(snapshot ?? null) as EnvironmentSnapshot | null}
            environmentEnabled={environmentEnabled}
        />
    );
}