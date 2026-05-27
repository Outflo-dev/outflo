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
        return <EnvironmentController snapshot={null} />;
    }

    const { data } = await supabase
        .from("environment_snapshots")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    return <EnvironmentController snapshot={(data ?? null) as EnvironmentSnapshot | null} />;
}