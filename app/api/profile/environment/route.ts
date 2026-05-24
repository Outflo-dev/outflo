/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT API
   File: app/api/profile/environment/route.ts
   Scope: Persist authenticated user environment preferences
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: preserve inactive manual place and harden environment defaults
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { NextResponse } from "next/server";

import { DEFAULT_THEME_PREFERENCE } from "@/lib/app-state/theme-preference";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------
   Types
-------------------------------- */
type LocationMode = "off" | "device" | "manual_city";
type WeatherMode = "off" | "on";
type LocationPrecision = "city" | "approximate" | "precise";
type CaptureMode = "off" | "moment" | "continuous";
type SignalMode = "off" | "on";

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

type PreferenceRow = {
    user_id: string;
};

/* ------------------------------
   Constants
-------------------------------- */
const LOCATION_MODES = ["off", "device", "manual_city"] as const;
const WEATHER_MODES = ["off", "on"] as const;
const LOCATION_PRECISIONS = ["city", "approximate", "precise"] as const;
const CAPTURE_MODES = ["off", "moment", "continuous"] as const;
const SIGNAL_MODES = ["off", "on"] as const;

const DEFAULT_USER_PREFERENCES = {
    base_currency: "USD",
    time_display: "auto",
    location_mode: "off",
    manual_city: null,
    weather_mode: "off",
    theme_preference: DEFAULT_THEME_PREFERENCE,
    text_scale: "compact",
    glow_preference: "soft",
    location_precision: "city",
    capture_mode: "off",
    sun_mode: "off",
    precipitation_mode: "off",
    air_quality_mode: "off",
    receipt_links_mode: "off",
    snapshots_mode: "off",
} as const;

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

function isLocationMode(value: unknown): value is LocationMode {
    return (
        typeof value === "string" &&
        LOCATION_MODES.includes(value as LocationMode)
    );
}

function isWeatherMode(value: unknown): value is WeatherMode {
    return (
        typeof value === "string" &&
        WEATHER_MODES.includes(value as WeatherMode)
    );
}

function isLocationPrecision(value: unknown): value is LocationPrecision {
    return (
        typeof value === "string" &&
        LOCATION_PRECISIONS.includes(value as LocationPrecision)
    );
}

function isCaptureMode(value: unknown): value is CaptureMode {
    return (
        typeof value === "string" &&
        CAPTURE_MODES.includes(value as CaptureMode)
    );
}

function isSignalMode(value: unknown): value is SignalMode {
    return (
        typeof value === "string" &&
        SIGNAL_MODES.includes(value as SignalMode)
    );
}

function normalizeManualCity(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const clean = value.trim();

    return clean ? clean : null;
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

    const locationMode = body.location_mode;
    const locationPrecision = body.location_precision;
    const weatherMode = body.weather_mode;
    const captureMode = body.capture_mode;
    const sunMode = body.sun_mode;
    const precipitationMode = body.precipitation_mode;
    const airQualityMode = body.air_quality_mode;
    const receiptLinksMode = body.receipt_links_mode;
    const snapshotsMode = body.snapshots_mode;

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

    const manualCity = normalizeManualCity(body.manual_city);

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

    const { data: existingPreference, error: readError } = await supabase
        .from("user_preferences")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle<PreferenceRow>();

    if (readError) {
        return NextResponse.json(
            { error: readError.message },
            { status: 500 }
        );
    }

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