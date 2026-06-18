/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROVIDER NORMALIZE
   File: app/api/environment/context/pull/internal/environment-context-provider.normalize.ts
   Scope: Own provider payload normalization into Environment context
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import type {
    NormalizedContext,
    NormalizedHourlyForecastItem,
    ProviderResult,
} from "./environment-context-provider.types";
import {
    arrayValue,
    firstArrayValue,
    toBooleanFromDay,
    toInteger,
    toNumber,
} from "./environment-context-provider.utils";

export function normalizeHourlyForecast(
    value: unknown,
): NormalizedHourlyForecastItem[] {
    if (!value || typeof value !== "object") return [];

    const hourly = value as Record<string, unknown>;
    const times = arrayValue(hourly.time);

    return times
        .map((time, index) => {
            if (typeof time !== "string") return null;

            return {
                time_local: time,
                temperature_c: toNumber(arrayValue(hourly.temperature_2m)[index]),
                apparent_temperature_c: toNumber(
                    arrayValue(hourly.apparent_temperature)[index],
                ),
                precipitation_mm: toNumber(arrayValue(hourly.precipitation)[index]),
                rain_mm: toNumber(arrayValue(hourly.rain)[index]),
                showers_mm: toNumber(arrayValue(hourly.showers)[index]),
                snowfall_mm: toNumber(arrayValue(hourly.snowfall)[index]),
                weather_code: toInteger(arrayValue(hourly.weather_code)[index]),
                cloud_cover_pct: toNumber(arrayValue(hourly.cloud_cover)[index]),
                is_day: toBooleanFromDay(arrayValue(hourly.is_day)[index]),
            };
        })
        .filter((item): item is NormalizedHourlyForecastItem => item !== null);
}

export function normalizeContext(args: {
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
        hourly_forecast: normalizeHourlyForecast(forecastJson.hourly),
        sun,
        air,
        units: {
            forecast:
                forecastJson.current_units &&
                    typeof forecastJson.current_units === "object"
                    ? forecastJson.current_units
                    : {},
            hourly:
                forecastJson.hourly_units &&
                    typeof forecastJson.hourly_units === "object"
                    ? forecastJson.hourly_units
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