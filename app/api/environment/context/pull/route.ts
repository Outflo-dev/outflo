/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PULL ROUTE
   File: app/api/environment/context/pull/route.ts
   Scope: Pull derived Environment context from current snapshot and record DB event
   ========================================================== */

import { NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabase/server";

import {
    pullEnvironmentProviderContext,
    toNumber,
} from "./internal/environment-context-provider";
import {
    buildContextEventRow,
    buildSnapshotUpdate,
    type EnvironmentSnapshotRow,
} from "./internal/environment-context-rows";
import { filterWeatherPersistenceRow } from "./internal/environment-context-permissions";

export const dynamic = "force-dynamic";

/* ------------------------------
   Route
-------------------------------- */
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
        .select("id,moment_ms,lat,lng")
        .eq("user_id", user.id)
        .maybeSingle();

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

    const typedSnapshot = snapshot as EnvironmentSnapshotRow;

    const lat = toNumber(typedSnapshot.lat);
    const lng = toNumber(typedSnapshot.lng);

    if (lat === null || lng === null) {
        return NextResponse.json(
            {
                ok: false,
                code: "NO_LOCATION",
                snapshot: typedSnapshot,
            },
            { status: 422 },
        );
    }

    const { data: preferences, error: preferencesError } = await supabase
        .from("user_preferences")
        .select("weather_mode")
        .eq("user_id", user.id)
        .maybeSingle();

    if (preferencesError) {
        return NextResponse.json(
            {
                ok: false,
                code: "ENVIRONMENT_PREFERENCES_READ_FAILED",
                error: preferencesError.message,
            },
            { status: 500 },
        );
    }

    const weatherEnabled = preferences?.weather_mode === "on";
    const pulledAtMs = Date.now();

    const { forecast, airQuality, normalizedContext } =
        await pullEnvironmentProviderContext({
            snapshotId: typedSnapshot.id,
            momentMs: typedSnapshot.moment_ms,
            lat,
            lng,
            pulledAtMs,
        });

    const rawInsertRow = buildContextEventRow({
        userId: user.id,
        snapshot: typedSnapshot,
        normalizedContext,
        forecast,
        airQuality,
    });

    const insertRow = filterWeatherPersistenceRow({
        row: rawInsertRow,
        weatherEnabled,
    });

    const { data: inserted, error: insertError } = await supabase
        .from("environment_context_events")
        .insert(insertRow)
        .select("id,pulled_at_ms,input_lat,input_lng,temperature_c,us_aqi")
        .single();

    if (insertError) {
        return NextResponse.json(
            {
                ok: false,
                code: "CONTEXT_INSERT_FAILED",
                error: insertError.message,
                normalized_context: normalizedContext,
            },
            { status: 500 },
        );
    }

    const rawSnapshotUpdate = buildSnapshotUpdate({
        insertedEventId: inserted.id,
        insertedPulledAtMs: inserted.pulled_at_ms,
        normalizedContext,
    });

    const snapshotUpdate = filterWeatherPersistenceRow({
        row: rawSnapshotUpdate,
        weatherEnabled,
    });

    const { data: updatedSnapshot, error: snapshotUpdateError } = await supabase
        .from("environment_snapshots")
        .update(snapshotUpdate)
        .eq("id", typedSnapshot.id)
        .eq("user_id", user.id)
        .select(
            [
                "id",
                "temperature_c",
                "apparent_temperature_c",
                "humidity_pct",
                "is_day",
                "pressure_hpa",
                "pressure_msl_hpa",
                "surface_pressure_hpa",
                "wind_speed_mps",
                "wind_speed_kmh",
                "cloud_cover_pct",
                "aqi",
                "us_aqi",
                "pm2_5",
                "carbon_monoxide",
                "nitrogen_dioxide",
                "sulphur_dioxide",
                "ozone_ug_m3",
                "uv_index",
                "sunrise_local",
                "sunset_local",
                "environment_context_event_id",
                "environment_context_pulled_at_ms",
                "environment_context_provider",
            ].join(","),
        )
        .maybeSingle();

    if (snapshotUpdateError) {
        return NextResponse.json(
            {
                ok: false,
                code: "SNAPSHOT_CONTEXT_UPDATE_FAILED",
                error: snapshotUpdateError.message,
                event: inserted,
                normalized_context: normalizedContext,
            },
            { status: 500 },
        );
    }

    if (!updatedSnapshot) {
        return NextResponse.json(
            {
                ok: false,
                code: "SNAPSHOT_CONTEXT_UPDATE_NO_ROW",
                event: inserted,
                snapshot_id: typedSnapshot.id,
                user_id: user.id,
                normalized_context: normalizedContext,
            },
            { status: 500 },
        );
    }

    return NextResponse.json({
        ok: true,
        event: inserted,
        snapshot_updated: true,
        updated_snapshot: updatedSnapshot,
        normalized_context: normalizedContext,
    });
}