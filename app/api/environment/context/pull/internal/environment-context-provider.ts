/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROVIDER
   File: app/api/environment/context/pull/internal/environment-context-provider.ts
   Scope: Pull and normalize provider environment context
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add real hourly forecast normalization from provider payload
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
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

/* ------------------------------
   Helpers
-------------------------------- */
export function toNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

export function toInteger(value: unknown): number | null {
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

function arrayValue(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

export function kmhToMps(value: number | null): number | null {
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
function normalizeHourlyForecast(value: unknown): NormalizedHourlyForecastItem[] {
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

/* ------------------------------
   Provider Pull
-------------------------------- */
export async function pullEnvironmentProviderContext(args: {
    snapshotId: string;
    momentMs: number | null;
    lat: number;
    lng: number;
    pulledAtMs: number;
}) {
    const forecastUrl = buildForecastUrl(args.lat, args.lng);
    const airQualityUrl = buildAirQualityUrl(args.lat, args.lng);

    const [forecast, airQuality] = await Promise.all([
        readJson(forecastUrl),
        readJson(airQualityUrl),
    ]);

    const normalizedContext = normalizeContext({
        input: {
            snapshot_id: args.snapshotId,
            moment_ms: args.momentMs,
            lat: args.lat,
            lng: args.lng,
        },
        pulled_at_ms: args.pulledAtMs,
        forecast,
        airQuality,
    });

    return {
        forecast,
        airQuality,
        normalizedContext,
    };
}