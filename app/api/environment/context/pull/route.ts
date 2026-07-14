/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PULL ROUTE
   File: app/api/environment/context/pull/route.ts
   Scope: Resolve current Environment context and conditionally admit it to persistence
   Last Updated:
   - iso: 2026-07-14
   - note: keep Engagement Off resolutions entirely ephemeral
   ========================================================== */

import { NextResponse } from "next/server";

import {
    isEnvironmentEngagementSelectableMode,
    type EnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement";
import {
    getEnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement.server";
import {
    getEnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences.server";
import { supabaseServer } from "@/lib/supabase/server";

import {
    buildEnvironmentContextLiveProjection,
} from "./internal/environment-context-live-projection";
import {
    pullEnvironmentProviderContext,
    toNumber,
} from "./internal/environment-context-provider";
import {
    buildContextEventRow,
    buildSnapshotUpdate,
    type EnvironmentSnapshotRow,
} from "./internal/environment-context-rows";
import {
    filterWeatherPersistenceRow,
} from "./internal/environment-context-permissions";

export const dynamic = "force-dynamic";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentSnapshotRecord =
    EnvironmentSnapshotRow &
    Record<string, unknown>;

/* ------------------------------
   Engagement
-------------------------------- */
function shouldRecordContextEvent(
    engagementState: EnvironmentEngagementState,
): boolean {
    return (
        engagementState.enabled &&
        isEnvironmentEngagementSelectableMode(
            engagementState.mode,
        )
    );
}

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

    const {
        data: snapshot,
        error: snapshotError,
    } = await supabase
        .from("environment_snapshots")
        .select("*")
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

    const typedSnapshot =
        snapshot as EnvironmentSnapshotRecord;

    const lat = toNumber(
        typedSnapshot.lat,
    );

    const lng = toNumber(
        typedSnapshot.lng,
    );

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

    let environmentPreferences;

    try {
        environmentPreferences =
            await getEnvironmentPreferences();
    } catch (preferencesReadError) {
        return NextResponse.json(
            {
                ok: false,
                code:
                    "ENVIRONMENT_PREFERENCES_READ_FAILED",
                error:
                    preferencesReadError instanceof Error
                        ? preferencesReadError.message
                        : "Environment preferences could not be read.",
            },
            { status: 500 },
        );
    }

    let engagementState:
        EnvironmentEngagementState;

    try {
        engagementState =
            await getEnvironmentEngagementState();
    } catch (engagementReadError) {
        return NextResponse.json(
            {
                ok: false,
                code:
                    "ENVIRONMENT_ENGAGEMENT_READ_FAILED",
                error:
                    engagementReadError instanceof Error
                        ? engagementReadError.message
                        : "Environment Engagement could not be read.",
            },
            { status: 500 },
        );
    }

    const weatherEnabled =
        environmentPreferences.weather_mode ===
        "on";

    const recordingRequested =
        shouldRecordContextEvent(
            engagementState,
        );

    const pulledAtMs = Date.now();

    const {
        forecast,
        airQuality,
        normalizedContext,
    } = await pullEnvironmentProviderContext({
        snapshotId: typedSnapshot.id,
        momentMs: typedSnapshot.moment_ms,
        lat,
        lng,
        pulledAtMs,
    });

    /*
     * Resolve the current Environment independently from
     * participation persistence and Engagement recording.
     */
    const liveProjection =
        buildEnvironmentContextLiveProjection({
            normalizedContext,
        });

    const resolvedSnapshot = {
        ...typedSnapshot,
        ...liveProjection,
    };

    /*
     * Engagement Off:
     *
     * Return the resolved Environment to the active browser
     * surface without writing an event or updating the
     * canonical snapshot.
     */
    if (!recordingRequested) {
        return NextResponse.json({
            ok: true,

            engagement:
                engagementState,

            recording_requested: false,
            event_recorded: false,
            event: null,

            snapshot_persisted: false,
            resolved_snapshot:
                resolvedSnapshot,
        });
    }

    /*
     * Capture / Precise:
     *
     * The event must be admitted before canonical current
     * state may advance.
     */
    const rawInsertRow =
        buildContextEventRow({
            userId: user.id,
            snapshot: typedSnapshot,
            normalizedContext,
            forecast,
            airQuality,
        });

    const insertRow =
        filterWeatherPersistenceRow({
            row: rawInsertRow,
            weatherEnabled,
        });

    const {
        data: insertedEvent,
        error: insertError,
    } = await supabase
        .from("environment_context_events")
        .insert(insertRow)
        .select(
            "id,pulled_at_ms,input_lat,input_lng,temperature_c,us_aqi",
        )
        .single();

    if (insertError) {
        return NextResponse.json(
            {
                ok: false,
                code:
                    "CONTEXT_INSERT_FAILED",
                error:
                    insertError.message,
            },
            { status: 500 },
        );
    }

    const snapshotUpdate =
        filterWeatherPersistenceRow({
            row: buildSnapshotUpdate({
                contextEventId:
                    insertedEvent.id,
                pulledAtMs:
                    insertedEvent.pulled_at_ms,
                normalizedContext,
            }),
            weatherEnabled,
        });

    const {
        data: updatedSnapshot,
        error: snapshotUpdateError,
    } = await supabase
        .from("environment_snapshots")
        .update(snapshotUpdate)
        .eq("id", typedSnapshot.id)
        .eq("user_id", user.id)
        .select("*")
        .maybeSingle();

    if (snapshotUpdateError) {
        return NextResponse.json(
            {
                ok: false,
                code:
                    "SNAPSHOT_CONTEXT_UPDATE_FAILED",
                error:
                    snapshotUpdateError.message,
                event:
                    insertedEvent,
                event_recorded: true,
            },
            { status: 500 },
        );
    }

    if (!updatedSnapshot) {
        return NextResponse.json(
            {
                ok: false,
                code:
                    "SNAPSHOT_CONTEXT_UPDATE_NO_ROW",
                event:
                    insertedEvent,
                event_recorded: true,
                snapshot_id:
                    typedSnapshot.id,
                user_id:
                    user.id,
            },
            { status: 500 },
        );
    }

    return NextResponse.json({
        ok: true,

        engagement:
            engagementState,

        recording_requested: true,
        event_recorded: true,
        event:
            insertedEvent,

        snapshot_persisted: true,
        resolved_snapshot:
            updatedSnapshot,
    });
}