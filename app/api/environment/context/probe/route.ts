/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROBE ROUTE
   File: app/api/environment/context/probe/route.ts
   Scope: Probe derived Environment context from current snapshot without DB mutation
   ========================================================== */

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type EnvironmentSnapshotRow = {
    user_id: string;
    moment_ms: number | null;
    lat: number | string | null;
    lng: number | string | null;
};

function toNumber(value: number | string | null): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

function buildForecastUrl(lat: number, lng: number) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lng));
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "1");

    url.searchParams.set(
        "current",
        [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "precipitation",
            "rain",
            "showers",
            "weather_code",
            "cloud_cover",
            "pressure_msl",
            "surface_pressure",
            "wind_speed_10m",
            "wind_direction_10m",
            "wind_gusts_10m",
        ].join(","),
    );

    url.searchParams.set("daily", ["sunrise", "sunset", "daylight_duration"].join(","));

    return url;
}

function buildAirQualityUrl(lat: number, lng: number) {
    const url = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");

    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lng));
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "1");

    url.searchParams.set(
        "current",
        [
            "us_aqi",
            "pm10",
            "pm2_5",
            "carbon_monoxide",
            "nitrogen_dioxide",
            "sulphur_dioxide",
            "ozone",
            "aerosol_optical_depth",
            "dust",
            "uv_index",
            "uv_index_clear_sky",
        ].join(","),
    );

    return url;
}

async function readJson(url: URL) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
        cache: "no-store",
    });

    const text = await response.text();

    let json: unknown = null;

    try {
        json = text.length > 0 ? JSON.parse(text) : null;
    } catch {
        json = {
            parse_error: true,
            body: text,
        };
    }

    return {
        ok: response.ok,
        status: response.status,
        url: url.toString(),
        json,
    };
}

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
        .select("user_id,moment_ms,lat,lng")
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

    const forecastUrl = buildForecastUrl(lat, lng);
    const airQualityUrl = buildAirQualityUrl(lat, lng);

    const [forecast, air_quality] = await Promise.all([
        readJson(forecastUrl),
        readJson(airQualityUrl),
    ]);

    return NextResponse.json({
        ok: true,
        input: {
            user_id: user.id,
            moment_ms: snapshot.moment_ms,
            lat,
            lng,
        },
        provider: {
            name: "open-meteo",
            pulled_at_ms: Date.now(),
        },
        forecast,
        air_quality,
    });
}