/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL PAGE
   File: app/dev/environment/drill/page.tsx
   Scope: Server entry for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: pivot pings drill route to emitter event truth
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { redirect } from "next/navigation";

import { supabaseServer } from "@/lib/supabase/server";
import EnvironmentDrillController from "./main/internal/EnvironmentDrillController";
import type { EnvironmentDrillEmitterRow } from "./main/internal/environment-drill.types";

/* ------------------------------
   Page
-------------------------------- */
export const dynamic = "force-dynamic";

export default async function EnvironmentDrillPage() {
    const supabase = await supabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const nowMs = Date.now();

    const { data: epochRow } = await supabase
        .from("user_epochs")
        .select("epoch_ms")
        .eq("user_id", user.id)
        .maybeSingle();

    const beginMs =
        typeof epochRow?.epoch_ms === "number"
            ? epochRow.epoch_ms
            : Number(epochRow?.epoch_ms ?? nowMs);

    const { data: rows, error } = await supabase
        .from("environment_emitter_events")
        .select(
            `
            id,
            event_ms,
            received_ms,
            lat,
            lon,
            accuracy_m,
            battery_pct,
            battery_status,
            connection,
            trigger,
            tracker_id,
            raw
            `
        )
        .eq("user_id", user.id)
        .gte("event_ms", beginMs)
        .lte("event_ms", nowMs)
        .order("event_ms", { ascending: true });

    return (
        <EnvironmentDrillController
            beginMs={beginMs}
            nowMs={nowMs}
            rows={(rows ?? []) as EnvironmentDrillEmitterRow[]}
            errorMessage={error?.message ?? null}
        />
    );
}