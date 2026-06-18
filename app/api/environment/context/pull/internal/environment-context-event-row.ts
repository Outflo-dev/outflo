/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT EVENT ROW
   File: app/api/environment/context/pull/internal/environment-context-event-row.ts
   Scope: Build environment_context_events persistence row
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import type {
    NormalizedContext,
    ProviderResult,
} from "./environment-context-provider";
import type { EnvironmentSnapshotRow } from "./environment-context-rows.types";

export function buildContextEventRow(args: {
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