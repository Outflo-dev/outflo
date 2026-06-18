/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROBE ROUTE
   File: app/api/environment/context/probe/route.ts
   Scope: Probe derived Environment context from current snapshot without DB mutation
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import { NextResponse } from "next/server";

import {
    pullEnvironmentProviderContext,
    toNumber,
} from "@/app/api/environment/context/pull/internal/environment-context-provider";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type EnvironmentSnapshotRow = {
    id: string;
    user_id: string;
    moment_ms: number | null;
    lat: number | string | null;
    lng: number | string | null;
};

export async function GET() {
    const supabase = await supabaseServer();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json(
            {
                ok: false,
                code: "UNAUTHORIZED",
            },
            { status: 401 },
        );
    }

    const { data: snapshot, error: snapshotError } = await supabase
        .from("environment_snapshots")
        .select("id,user_id,moment_ms,lat,lng")
        .eq("user_id", user.id)
        .maybeSingle<EnvironmentSnapshotRow>();

    if (snapshotError) {
        return NextResponse.json(
            {
                ok: false,
                code: "SNAPSHOT_READ_FAILED",
                error: snapshotError.message,
            },
            { status: 500 },
        );
    }

    if (!snapshot) {
        return NextResponse.json(
            {
                ok: false,
                code: "NO_ENVIRONMENT_SNAPSHOT",
            },
            { status: 404 },
        );
    }

    const lat = toNumber(snapshot.lat);
    const lng = toNumber(snapshot.lng);

    if (lat === null || lng === null) {
        return NextResponse.json(
            {
                ok: false,
                code: "NO_LOCATION",
                snapshot,
            },
            { status: 422 },
        );
    }

    const pulledAtMs = Date.now();

    const { forecast, airQuality, normalizedContext } =
        await pullEnvironmentProviderContext({
            snapshotId: snapshot.id,
            momentMs: snapshot.moment_ms,
            lat,
            lng,
            pulledAtMs,
        });

    return NextResponse.json({
        ok: true,
        input: {
            user_id: user.id,
            snapshot_id: snapshot.id,
            moment_ms: snapshot.moment_ms,
            lat,
            lng,
        },
        provider: {
            name: "open-meteo",
            pulled_at_ms: pulledAtMs,
        },
        forecast,
        air_quality: airQuality,
        normalized_context: normalizedContext,
    });
}