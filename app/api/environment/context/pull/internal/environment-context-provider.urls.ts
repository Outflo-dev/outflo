/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROVIDER URLS
   File: app/api/environment/context/pull/internal/environment-context-provider.urls.ts
   Scope: Own Open-Meteo provider URL construction
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

export function buildForecastUrl(lat: number, lng: number) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", String(lat));
    url.searchParams.set("longitude", String(lng));
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "2");

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
        "hourly",
        [
            "temperature_2m",
            "apparent_temperature",
            "precipitation",
            "rain",
            "showers",
            "snowfall",
            "weather_code",
            "cloud_cover",
            "is_day",
        ].join(","),
    );

    url.searchParams.set(
        "daily",
        ["sunrise", "sunset", "daylight_duration"].join(","),
    );

    return url;
}

export function buildAirQualityUrl(lat: number, lng: number) {
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