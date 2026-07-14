/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT LIVE PROJECTION
   File: app/api/environment/context/pull/internal/environment-context-live-projection.ts
   Scope: Project resolved provider context for the active Environment surface
   Last Updated:
   - iso: 2026-07-14
   - note: preserve resolved Environment context without crossing persistence
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    kmhToMps,
    type NormalizedContext,
} from "./environment-context-provider";

/* ------------------------------
   Types
-------------------------------- */
type BuildEnvironmentContextLiveProjectionArgs = {
    normalizedContext: NormalizedContext;
};

/* ------------------------------
   Public API
-------------------------------- */
export function buildEnvironmentContextLiveProjection({
    normalizedContext,
}: BuildEnvironmentContextLiveProjectionArgs): Record<
    string,
    unknown
> {
    return {
        temperature_c:
            normalizedContext.weather.temperature_c,

        apparent_temperature_c:
            normalizedContext.weather
                .apparent_temperature_c,

        humidity_pct:
            normalizedContext.weather.humidity_pct,

        is_day:
            normalizedContext.weather.is_day,

        precipitation_mm:
            normalizedContext.weather
                .precipitation_mm,

        rain_mm:
            normalizedContext.weather.rain_mm,

        showers_mm:
            normalizedContext.weather.showers_mm,

        weather_code:
            normalizedContext.weather.weather_code ===
                null
                ? null
                : String(
                    normalizedContext.weather
                        .weather_code,
                ),

        cloud_cover_pct:
            normalizedContext.weather
                .cloud_cover_pct,

        pressure_hpa:
            normalizedContext.weather
                .pressure_msl_hpa,

        pressure_msl_hpa:
            normalizedContext.weather
                .pressure_msl_hpa,

        surface_pressure_hpa:
            normalizedContext.weather
                .surface_pressure_hpa,

        wind_speed_mps:
            kmhToMps(
                normalizedContext.weather
                    .wind_speed_kmh,
            ),

        wind_gust_mps:
            kmhToMps(
                normalizedContext.weather
                    .wind_gusts_kmh,
            ),

        wind_dir_deg:
            normalizedContext.weather
                .wind_direction_deg,

        wind_speed_kmh:
            normalizedContext.weather
                .wind_speed_kmh,

        wind_gusts_kmh:
            normalizedContext.weather
                .wind_gusts_kmh,

        wind_direction_deg:
            normalizedContext.weather
                .wind_direction_deg,

        sunrise_local:
            normalizedContext.sun.sunrise_local,

        sunset_local:
            normalizedContext.sun.sunset_local,

        daylight_duration_seconds:
            normalizedContext.sun
                .daylight_duration_seconds,

        aqi:
            normalizedContext.air.us_aqi,

        us_aqi:
            normalizedContext.air.us_aqi,

        pm2_5:
            normalizedContext.air.pm2_5,

        pm10:
            normalizedContext.air.pm10,

        ozone_ppb:
            normalizedContext.air.ozone,

        ozone_ug_m3:
            normalizedContext.air.ozone,

        carbon_monoxide:
            normalizedContext.air
                .carbon_monoxide,

        nitrogen_dioxide:
            normalizedContext.air
                .nitrogen_dioxide,

        sulphur_dioxide:
            normalizedContext.air
                .sulphur_dioxide,

        aerosol_optical_depth:
            normalizedContext.air
                .aerosol_optical_depth,

        dust:
            normalizedContext.air.dust,

        uv_index:
            normalizedContext.air.uv_index,

        uv_index_clear_sky:
            normalizedContext.air
                .uv_index_clear_sky,

        environment_context_event_id:
            null,

        environment_context_pulled_at_ms:
            normalizedContext.provider
                .pulled_at_ms,

        environment_context_provider:
            normalizedContext.provider.name,

        forecast_provider_lat:
            normalizedContext.provider
                .forecast_provider_lat,

        forecast_provider_lng:
            normalizedContext.provider
                .forecast_provider_lng,

        forecast_provider_elevation_m:
            normalizedContext.provider
                .forecast_provider_elevation_m,

        air_provider_lat:
            normalizedContext.provider
                .air_provider_lat,

        air_provider_lng:
            normalizedContext.provider
                .air_provider_lng,

        air_provider_elevation_m:
            normalizedContext.provider
                .air_provider_elevation_m,

        environment_timezone:
            normalizedContext.provider.timezone,

        environment_timezone_abbreviation:
            normalizedContext.provider
                .timezone_abbreviation,

        environment_utc_offset_seconds:
            normalizedContext.provider
                .utc_offset_seconds,

        forecast_units: {
            current:
                normalizedContext.units.forecast,

            daily:
                normalizedContext.units.daily,
        },

        air_quality_units:
            normalizedContext.units.air_quality,

        latest_environment_context:
            normalizedContext,
    };
}