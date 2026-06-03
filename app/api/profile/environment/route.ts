/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT API
   File: app/api/profile/environment/route.ts
   Scope: Persist authenticated user environment preferences
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: allow partial environment preference patches
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
    DEFAULT_USER_PREFERENCES,
    type EnvironmentPreferences,
    isCaptureMode,
    isLocationMode,
    isLocationPrecision,
    isSignalMode,
    isWeatherMode,
    normalizeManualCity,
} from "@/lib/app-state/environment-preferences";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRequestBody = {
    location_mode?: unknown;
    manual_city?: unknown;
    location_precision?: unknown;
    weather_mode?: unknown;
    capture_mode?: unknown;
    sun_mode?: unknown;
    precipitation_mode?: unknown;
    air_quality_mode?: unknown;
    receipt_links_mode?: unknown;
    snapshots_mode?: unknown;
};

type PreferenceRow = EnvironmentPreferences & {
    user_id: string;
};

/* ------------------------------
   Helpers
-------------------------------- */
async function readEnvironmentRequestBody(
    req: Request
): Promise<EnvironmentRequestBody> {
    try {
        const body = await req.json();

        if (!body || typeof body !== "object") {
            return {};
        }

        return body as EnvironmentRequestBody;
    } catch {
        return {};
    }
}

function resolveEnvironmentPreferences(args: {
    body: EnvironmentRequestBody;
    existing: PreferenceRow | null;
}) {
    const { body, existing } = args;

    return {
        ...DEFAULT_ENVIRONMENT_PREFERENCES,
        ...(existing ?? {}),
        ...body,
    };
}

/* ------------------------------
   PATCH Handler
-------------------------------- */
export async function PATCH(req: Request) {
    const supabase = await supabaseServer();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json(
            {
                error: "Unauthorized",
                auth_error: userError?.message ?? null,
            },
            { status: 401 }
        );
    }

    const body = await readEnvironmentRequestBody(req);

    const { data: existingPreference, error: readError } = await supabase
        .from("user_preferences")
        .select(
            [
                "user_id",
                "location_mode",
                "manual_city",
                "location_precision",
                "weather_mode",
                "capture_mode",
                "sun_mode",
                "precipitation_mode",
                "air_quality_mode",
                "receipt_links_mode",
                "snapshots_mode",
            ].join(",")
        )
        .eq("user_id", user.id)
        .maybeSingle<PreferenceRow>();

    if (readError) {
        return NextResponse.json(
            { error: readError.message },
            { status: 500 }
        );
    }

    const resolved = resolveEnvironmentPreferences({
        body,
        existing: existingPreference ?? null,
    });

    const locationMode = resolved.location_mode;
    const locationPrecision = resolved.location_precision;
    const weatherMode = resolved.weather_mode;
    const captureMode = resolved.capture_mode;
    const sunMode = resolved.sun_mode;
    const precipitationMode = resolved.precipitation_mode;
    const airQualityMode = resolved.air_quality_mode;
    const receiptLinksMode = resolved.receipt_links_mode;
    const snapshotsMode = resolved.snapshots_mode;

    if (!isLocationMode(locationMode)) {
        return NextResponse.json(
            { error: "Invalid location_mode." },
            { status: 400 }
        );
    }

    if (!isLocationPrecision(locationPrecision)) {
        return NextResponse.json(
            { error: "Invalid location_precision." },
            { status: 400 }
        );
    }

    if (!isWeatherMode(weatherMode)) {
        return NextResponse.json(
            { error: "Invalid weather_mode." },
            { status: 400 }
        );
    }

    if (!isCaptureMode(captureMode)) {
        return NextResponse.json(
            { error: "Invalid capture_mode." },
            { status: 400 }
        );
    }

    if (
        !isSignalMode(sunMode) ||
        !isSignalMode(precipitationMode) ||
        !isSignalMode(airQualityMode) ||
        !isSignalMode(receiptLinksMode) ||
        !isSignalMode(snapshotsMode)
    ) {
        return NextResponse.json(
            { error: "Invalid environment mode." },
            { status: 400 }
        );
    }

    const manualCity = normalizeManualCity(resolved.manual_city);

    if (locationMode === "manual_city" && !manualCity) {
        return NextResponse.json(
            {
                error:
                    "Manual city is required when location_mode is manual_city.",
            },
            { status: 400 }
        );
    }

    const updatedAt = new Date().toISOString();

    const payload = {
        location_mode: locationMode,
        manual_city: manualCity,
        location_precision: locationPrecision,
        weather_mode: weatherMode,
        capture_mode: captureMode,
        sun_mode: sunMode,
        precipitation_mode: precipitationMode,
        air_quality_mode: airQualityMode,
        receipt_links_mode: receiptLinksMode,
        snapshots_mode: snapshotsMode,
        updated_at: updatedAt,
    };

    if (existingPreference) {
        const { error: updateError } = await supabase
            .from("user_preferences")
            .update(payload)
            .eq("user_id", user.id);

        if (updateError) {
            return NextResponse.json(
                { error: updateError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    }

    const { error: insertError } = await supabase
        .from("user_preferences")
        .insert({
            user_id: user.id,
            ...DEFAULT_USER_PREFERENCES,
            ...payload,
            updated_at: updatedAt,
        });

    if (insertError) {
        return NextResponse.json(
            { error: insertError.message },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true });
}