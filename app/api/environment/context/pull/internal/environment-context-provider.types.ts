/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROVIDER TYPES
   File: app/api/environment/context/pull/internal/environment-context-provider.types.ts
   Scope: Own Open-Meteo provider result and normalized context types
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

export type ProviderResult = {
    ok: boolean;
    status: number;
    url: string;
    json: any;
};

export type NormalizedHourlyForecastItem = {
    time_local: string;
    temperature_c: number | null;
    apparent_temperature_c: number | null;
    precipitation_mm: number | null;
    rain_mm: number | null;
    showers_mm: number | null;
    snowfall_mm: number | null;
    weather_code: number | null;
    cloud_cover_pct: number | null;
    is_day: boolean | null;
};

export type NormalizedContext = {
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
    hourly_forecast: NormalizedHourlyForecastItem[];
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
        hourly: Record<string, unknown>;
        daily: Record<string, unknown>;
        air_quality: Record<string, unknown>;
    };
};