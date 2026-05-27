/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PULL ROUTE
   File: app/api/environment/context/pull/route.ts
   Scope: Pull derived Environment context from current snapshot and record DB event
   ========================================================== */

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentSnapshotRow = {
    id: string;
    moment_ms: number | null;
    lat: number | string | null;
    lng: number | string | null;
};

type ProviderResult = {
    ok: boolean;
    status: number;
    url: string;
    json: any;
};

type NormalizedContext = {
    input: {
        snapshot_id: string;
        moment_ms: number | null;
        lat: number;
        lng: number;
    };
    provider: {
        name: "open-meteo";
        pulled_at_ms: number;

        forecast_ok: boolean;
        forecast_status: number;
        forecast_url: string;
        forecast_provider_lat: number | null;
        forecast_provider_lng: number | null;
        forecast_provider_elevation_m: number | null;

        air_quality_ok: boolean;
        air_quality_status: number;
        air_quality_url: string;
        air_provider_lat: number | null;
        air_provider_lng: number | null;
        air_provider_elevation_m: number | null;

        timezone: string | null;
        timezone_abbreviation: string | null;
        utc_offset_seconds: number | null;
    };
    weather: {
        temperature_c: number | null;
        apparent_temperature_c: number | null;
        humidity_pct: number | null;
        is_day: boolean | null;

        precipitation_mm: number | null;
        rain_mm: number | null;
        showers_mm: number | null;
        weather_code: number | null;
        cloud_cover_pct: number | null;

        pressure_msl_hpa: number | null;
        surface_pressure_hpa: number | null;

        wind_speed_kmh: number | null;
        wind_direction_deg: number | null;
        wind_gusts_kmh: number | null;
    };
    sun: {
        sunrise_local: string | null;
        sunset_local: string | null;
        daylight_duration_seconds: number | null;
    };
    air: {
        us_aqi: number | null;
        pm10: number | null;
        pm2_5: number | null;
        carbon_monoxide: number | null;
        nitrogen_dioxide: number | null;
        sulphur_dioxide: number | null;
        ozone: number | null;
        aerosol_optical_depth: number | null;
        dust: number | null;
        uv_index: number | null;
        uv_index_clear_sky: number | null;
    };
    units: {
        forecast: Record<string, unknown>;
        daily: Record<string, unknown>;
        air_quality: Record<string, unknown>;
    };
};

/* ------------------------------
   Helpers
-------------------------------- */
function toNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

function toInteger(value: unknown): number | null {
    const numberValue = toNumber(value);
    return numberValue === null ? null : Math.trunc(numberValue);
}

function toBooleanFromDay(value: unknown): boolean | null {
    if (value === 1) return true;
    if (value === 0) return false;
    if (value === true) return true;
    if (value === false) return false;
    return null;
}

function firstArrayValue(value: unknown): unknown {
    return Array.isArray(value) ? value[0] ?? null : null;
}

function kmhToMps(value: number | null): number | null {
    return value === null ? null : value / 3.6;
}

/* ------------------------------
   Provider URLs
-------------------------------- */
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

    url.searchParams.set(
        "daily",
        ["sunrise", "sunset", "daylight_duration"].join(","),
    );

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

/* ------------------------------
   Provider Client
-------------------------------- */
async function readJson(url: URL): Promise<ProviderResult> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
        cache: "no-store",
    });

    const text = await response.text();

    let json: any = null;

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

/* ------------------------------
   Mapper
-------------------------------- */
function normalizeContext(args: {
    input: {
        snapshot_id: string;
        moment_ms: number | null;
        lat: number;
        lng: number;
    };
    pulled_at_ms: number;
    forecast: ProviderResult;
    airQuality: ProviderResult;
}): NormalizedContext {
    const forecastJson = args.forecast.json ?? {};
    const airJson = args.airQuality.json ?? {};

    const forecastCurrent = forecastJson.current ?? {};
    const forecastDaily = forecastJson.daily ?? {};
    const airCurrent = airJson.current ?? {};

    const weather = {
        temperature_c: toNumber(forecastCurrent.temperature_2m),
        apparent_temperature_c: toNumber(forecastCurrent.apparent_temperature),
        humidity_pct: toNumber(forecastCurrent.relative_humidity_2m),
        is_day: toBooleanFromDay(forecastCurrent.is_day),

        precipitation_mm: toNumber(forecastCurrent.precipitation),
        rain_mm: toNumber(forecastCurrent.rain),
        showers_mm: toNumber(forecastCurrent.showers),
        weather_code: toInteger(forecastCurrent.weather_code),
        cloud_cover_pct: toNumber(forecastCurrent.cloud_cover),

        pressure_msl_hpa: toNumber(forecastCurrent.pressure_msl),
        surface_pressure_hpa: toNumber(forecastCurrent.surface_pressure),

        wind_speed_kmh: toNumber(forecastCurrent.wind_speed_10m),
        wind_direction_deg: toNumber(forecastCurrent.wind_direction_10m),
        wind_gusts_kmh: toNumber(forecastCurrent.wind_gusts_10m),
    };

    const sunrise = firstArrayValue(forecastDaily.sunrise);
    const sunset = firstArrayValue(forecastDaily.sunset);

    const sun = {
        sunrise_local: typeof sunrise === "string" ? sunrise : null,
        sunset_local: typeof sunset === "string" ? sunset : null,
        daylight_duration_seconds: toNumber(
            firstArrayValue(forecastDaily.daylight_duration),
        ),
    };

    const air = {
        us_aqi: toNumber(airCurrent.us_aqi),
        pm10: toNumber(airCurrent.pm10),
        pm2_5: toNumber(airCurrent.pm2_5),
        carbon_monoxide: toNumber(airCurrent.carbon_monoxide),
        nitrogen_dioxide: toNumber(airCurrent.nitrogen_dioxide),
        sulphur_dioxide: toNumber(airCurrent.sulphur_dioxide),
        ozone: toNumber(airCurrent.ozone),
        aerosol_optical_depth: toNumber(airCurrent.aerosol_optical_depth),
        dust: toNumber(airCurrent.dust),
        uv_index: toNumber(airCurrent.uv_index),
        uv_index_clear_sky: toNumber(airCurrent.uv_index_clear_sky),
    };

    const provider = {
        name: "open-meteo" as const,
        pulled_at_ms: args.pulled_at_ms,

        forecast_ok: args.forecast.ok,
        forecast_status: args.forecast.status,
        forecast_url: args.forecast.url,
        forecast_provider_lat: toNumber(forecastJson.latitude),
        forecast_provider_lng: toNumber(forecastJson.longitude),
        forecast_provider_elevation_m: toNumber(forecastJson.elevation),

        air_quality_ok: args.airQuality.ok,
        air_quality_status: args.airQuality.status,
        air_quality_url: args.airQuality.url,
        air_provider_lat: toNumber(airJson.latitude),
        air_provider_lng: toNumber(airJson.longitude),
        air_provider_elevation_m: toNumber(airJson.elevation),

        timezone:
            typeof forecastJson.timezone === "string" ? forecastJson.timezone : null,
        timezone_abbreviation:
            typeof forecastJson.timezone_abbreviation === "string"
                ? forecastJson.timezone_abbreviation
                : null,
        utc_offset_seconds: toInteger(forecastJson.utc_offset_seconds),
    };

    return {
        input: args.input,
        provider,
        weather,
        sun,
        air,
        units: {
            forecast:
                forecastJson.current_units &&
                    typeof forecastJson.current_units === "object"
                    ? forecastJson.current_units
                    : {},
            daily:
                forecastJson.daily_units && typeof forecastJson.daily_units === "object"
                    ? forecastJson.daily_units
                    : {},
            air_quality:
                airJson.current_units && typeof airJson.current_units === "object"
                    ? airJson.current_units
                    : {},
        },
    };
}

/* ------------------------------
   Row Builders
-------------------------------- */
function buildContextEventRow(args: {
    userId: string;
    snapshot: EnvironmentSnapshotRow;
    normalizedContext: NormalizedContext;
    forecast: ProviderResult;
    airQuality: ProviderResult;
}) {
    const { userId, snapshot, normalizedContext, forecast, airQuality } = args;

    return {
        user_id: userId,

        input_snapshot_id: snapshot.id,
        input_moment_ms: snapshot.moment_ms,
        input_lat: normalizedContext.input.lat,
        input_lng: normalizedContext.input.lng,

        provider: "open-meteo",
        pulled_at_ms: normalizedContext.provider.pulled_at_ms,

        forecast_ok: normalizedContext.provider.forecast_ok,
        forecast_status: normalizedContext.provider.forecast_status,
        forecast_url: normalizedContext.provider.forecast_url,

        air_quality_ok: normalizedContext.provider.air_quality_ok,
        air_quality_status: normalizedContext.provider.air_quality_status,
        air_quality_url: normalizedContext.provider.air_quality_url,

        forecast_provider_lat: normalizedContext.provider.forecast_provider_lat,
        forecast_provider_lng: normalizedContext.provider.forecast_provider_lng,
        forecast_provider_elevation_m:
            normalizedContext.provider.forecast_provider_elevation_m,

        air_provider_lat: normalizedContext.provider.air_provider_lat,
        air_provider_lng: normalizedContext.provider.air_provider_lng,
        air_provider_elevation_m:
            normalizedContext.provider.air_provider_elevation_m,

        timezone: normalizedContext.provider.timezone,
        timezone_abbreviation: normalizedContext.provider.timezone_abbreviation,
        utc_offset_seconds: normalizedContext.provider.utc_offset_seconds,

        temperature_c: normalizedContext.weather.temperature_c,
        apparent_temperature_c: normalizedContext.weather.apparent_temperature_c,
        humidity_pct: normalizedContext.weather.humidity_pct,
        is_day: normalizedContext.weather.is_day,

        precipitation_mm: normalizedContext.weather.precipitation_mm,
        rain_mm: normalizedContext.weather.rain_mm,
        showers_mm: normalizedContext.weather.showers_mm,
        weather_code: normalizedContext.weather.weather_code,
        cloud_cover_pct: normalizedContext.weather.cloud_cover_pct,

        pressure_msl_hpa: normalizedContext.weather.pressure_msl_hpa,
        surface_pressure_hpa: normalizedContext.weather.surface_pressure_hpa,

        wind_speed_kmh: normalizedContext.weather.wind_speed_kmh,
        wind_direction_deg: normalizedContext.weather.wind_direction_deg,
        wind_gusts_kmh: normalizedContext.weather.wind_gusts_kmh,

        sunrise_local: normalizedContext.sun.sunrise_local,
        sunset_local: normalizedContext.sun.sunset_local,
        daylight_duration_seconds:
            normalizedContext.sun.daylight_duration_seconds,

        us_aqi: normalizedContext.air.us_aqi,
        pm10: normalizedContext.air.pm10,
        pm2_5: normalizedContext.air.pm2_5,
        carbon_monoxide: normalizedContext.air.carbon_monoxide,
        nitrogen_dioxide: normalizedContext.air.nitrogen_dioxide,
        sulphur_dioxide: normalizedContext.air.sulphur_dioxide,
        ozone: normalizedContext.air.ozone,
        aerosol_optical_depth: normalizedContext.air.aerosol_optical_depth,
        dust: normalizedContext.air.dust,
        uv_index: normalizedContext.air.uv_index,
        uv_index_clear_sky: normalizedContext.air.uv_index_clear_sky,

        forecast_units: {
            current: normalizedContext.units.forecast,
            daily: normalizedContext.units.daily,
        },
        air_quality_units: normalizedContext.units.air_quality,

        normalized_context: normalizedContext,
        forecast_raw: forecast.json ?? {},
        air_quality_raw: airQuality.json ?? {},
    };
}

function buildSnapshotUpdate(args: {
    insertedEventId: string;
    insertedPulledAtMs: number;
    normalizedContext: NormalizedContext;
}) {
    const { insertedEventId, insertedPulledAtMs, normalizedContext } = args;

    return {
        temperature_c: normalizedContext.weather.temperature_c,
        apparent_temperature_c: normalizedContext.weather.apparent_temperature_c,
        humidity_pct: normalizedContext.weather.humidity_pct,
        is_day: normalizedContext.weather.is_day,

        precipitation_mm: normalizedContext.weather.precipitation_mm,
        rain_mm: normalizedContext.weather.rain_mm,
        showers_mm: normalizedContext.weather.showers_mm,

        weather_code:
            normalizedContext.weather.weather_code === null
                ? null
                : String(normalizedContext.weather.weather_code),

        cloud_cover_pct: normalizedContext.weather.cloud_cover_pct,

        pressure_hpa: normalizedContext.weather.pressure_msl_hpa,
        pressure_msl_hpa: normalizedContext.weather.pressure_msl_hpa,
        surface_pressure_hpa: normalizedContext.weather.surface_pressure_hpa,

        wind_speed_mps: kmhToMps(normalizedContext.weather.wind_speed_kmh),
        wind_gust_mps: kmhToMps(normalizedContext.weather.wind_gusts_kmh),
        wind_dir_deg: normalizedContext.weather.wind_direction_deg,

        wind_speed_kmh: normalizedContext.weather.wind_speed_kmh,
        wind_gusts_kmh: normalizedContext.weather.wind_gusts_kmh,
        wind_direction_deg: normalizedContext.weather.wind_direction_deg,

        uv_index: normalizedContext.air.uv_index,
        uv_index_clear_sky: normalizedContext.air.uv_index_clear_sky,

        aqi: normalizedContext.air.us_aqi,
        us_aqi: normalizedContext.air.us_aqi,
        pm2_5: normalizedContext.air.pm2_5,
        pm10: normalizedContext.air.pm10,

        ozone_ppb: normalizedContext.air.ozone,
        ozone_ug_m3: normalizedContext.air.ozone,

        carbon_monoxide: normalizedContext.air.carbon_monoxide,
        nitrogen_dioxide: normalizedContext.air.nitrogen_dioxide,
        sulphur_dioxide: normalizedContext.air.sulphur_dioxide,
        aerosol_optical_depth: normalizedContext.air.aerosol_optical_depth,
        dust: normalizedContext.air.dust,

        sunrise_local: normalizedContext.sun.sunrise_local,
        sunset_local: normalizedContext.sun.sunset_local,
        daylight_duration_seconds:
            normalizedContext.sun.daylight_duration_seconds,

        environment_context_event_id: insertedEventId,
        environment_context_pulled_at_ms: insertedPulledAtMs,
        environment_context_provider: "open-meteo",

        forecast_provider_lat: normalizedContext.provider.forecast_provider_lat,
        forecast_provider_lng: normalizedContext.provider.forecast_provider_lng,
        forecast_provider_elevation_m:
            normalizedContext.provider.forecast_provider_elevation_m,

        air_provider_lat: normalizedContext.provider.air_provider_lat,
        air_provider_lng: normalizedContext.provider.air_provider_lng,
        air_provider_elevation_m:
            normalizedContext.provider.air_provider_elevation_m,

        environment_timezone: normalizedContext.provider.timezone,
        environment_timezone_abbreviation:
            normalizedContext.provider.timezone_abbreviation,
        environment_utc_offset_seconds:
            normalizedContext.provider.utc_offset_seconds,

        forecast_units: {
            current: normalizedContext.units.forecast,
            daily: normalizedContext.units.daily,
        },

        air_quality_units: normalizedContext.units.air_quality,
        latest_environment_context: normalizedContext,
    };
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

    const pulledAtMs = Date.now();

    const forecastUrl = buildForecastUrl(lat, lng);
    const airQualityUrl = buildAirQualityUrl(lat, lng);

    const [forecast, airQuality] = await Promise.all([
        readJson(forecastUrl),
        readJson(airQualityUrl),
    ]);

    const normalizedContext = normalizeContext({
        input: {
            snapshot_id: typedSnapshot.id,
            moment_ms: typedSnapshot.moment_ms,
            lat,
            lng,
        },
        pulled_at_ms: pulledAtMs,
        forecast,
        airQuality,
    });

    const insertRow = buildContextEventRow({
        userId: user.id,
        snapshot: typedSnapshot,
        normalizedContext,
        forecast,
        airQuality,
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

    const snapshotUpdate = buildSnapshotUpdate({
        insertedEventId: inserted.id,
        insertedPulledAtMs: inserted.pulled_at_ms,
        normalizedContext,
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