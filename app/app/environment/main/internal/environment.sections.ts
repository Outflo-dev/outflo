// app/app/environment/main/internal/environment.sections.ts
/* ==========================================================
   OUTFLO — ENVIRONMENT SECTIONS
   File: app/app/environment/main/internal/environment.sections.ts
   Scope: Build Environment substrate landing page model from current snapshot
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: tighten Environment North Star model copy and tile density
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentForecastItemModel,
    EnvironmentForecastModel,
    EnvironmentHeroModel,
    EnvironmentRecordModel,
    EnvironmentSnapshot,
    EnvironmentSummarySectionModel,
    EnvironmentSummaryTileModel,
    EnvironmentViewModel,
} from "./environment.types";

/* ------------------------------
   Model
-------------------------------- */
export function getEnvironmentModel(
    snapshot: EnvironmentSnapshot | null
): EnvironmentViewModel {
    if (!snapshot) {
        return {
            hasSnapshot: false,
            hero: {
                place: "Environment",
                temperature: "—",
                condition: "No snapshot",
                feelsLike: "Open OwnTracks to emit location.",
                updated: "No current truth",
                signal: "Emitter silent",
                background: "empty",
            },
            forecast: getEmptyForecast(),
            summary: getEmptySummary(),
            record: {
                title: "No record yet",
                subtitle: "Environment has not landed a current snapshot.",
                primary: "Open the emitter, then refresh Environment.",
                secondary: "Snapshot truth will appear here once resolved.",
            },
        };
    }

    return {
        hasSnapshot: true,
        hero: getHero(snapshot),
        forecast: getForecast(snapshot),
        summary: getSummary(snapshot),
        record: getRecord(snapshot),
    };
}

/* ------------------------------
   Hero
-------------------------------- */
function getHero(snapshot: EnvironmentSnapshot): EnvironmentHeroModel {
    const temperature = display(snapshot.temperature_c, "°");
    const feelsLike = display(snapshot.apparent_temperature_c, "°C");
    const cloud = numberValue(snapshot.cloud_cover_pct);
    const rain = numberValue(snapshot.rain_mm);
    const isDay = snapshot.is_day === true;
    const condition = getCondition(snapshot);

    return {
        place: getPlace(snapshot),
        temperature,
        condition,
        feelsLike: `Feels like ${feelsLike}`,
        updated: `Updated ${formatHeroTime(snapshot.environment_context_pulled_at_ms ?? snapshot.moment_ms)}`,
        signal: getSignal(snapshot),
        background: rain && rain > 0 ? "rain" : isDay ? (cloud && cloud > 40 ? "cloud" : "day") : "night",
    };
}

/* ------------------------------
   Forecast
-------------------------------- */
function getForecast(snapshot: EnvironmentSnapshot): EnvironmentForecastModel {
    const nowTemp = numberValue(snapshot.temperature_c);
    const baseTemp = nowTemp ?? 29;

    return {
        title: "Forecast",
        subtitle: "Next 24 hours",
        items: [
            forecastItem("Now", baseTemp, getCondition(snapshot)),
            forecastItem("9 PM", baseTemp - 1, "Clouds"),
            forecastItem("10 PM", baseTemp - 2, "Clouds"),
            forecastItem("11 PM", baseTemp - 2, "Clouds"),
            forecastItem("12 AM", baseTemp - 3, "Clouds"),
            forecastItem("1 AM", baseTemp - 3, "Clouds"),
            forecastItem("2 AM", baseTemp - 4, "Clouds"),
        ],
    };
}

function forecastItem(
    label: string,
    temperature: number,
    detail: string
): EnvironmentForecastItemModel {
    return {
        label,
        value: `${Math.round(temperature)}°`,
        detail,
    };
}

function getEmptyForecast(): EnvironmentForecastModel {
    return {
        title: "Forecast",
        subtitle: "No forecast context available yet.",
        items: [
            {
                label: "Now",
                value: "—",
                detail: "No snapshot",
            },
            {
                label: "Feels",
                value: "—",
                detail: "Waiting",
            },
            {
                label: "Cloud",
                value: "—",
                detail: "Waiting",
            },
            {
                label: "Rain",
                value: "—",
                detail: "Waiting",
            },
        ],
    };
}

/* ------------------------------
   Summary
-------------------------------- */
function getSummary(snapshot: EnvironmentSnapshot): EnvironmentSummarySectionModel {
    return {
        title: "Environment Details",
        subtitle: "Current resolved environment signals.",
        tiles: [
            getPlaceTile(snapshot),
            getWeatherTile(snapshot),
            getSunTile(snapshot),
            getAirTile(snapshot),
            getAltitudeTile(snapshot),
            getSourceTile(snapshot),
        ],
    };
}

function getEmptySummary(): EnvironmentSummarySectionModel {
    return {
        title: "Environment Details",
        subtitle: "Snapshot summaries will appear once Environment resolves.",
        tiles: [
            tile("Place", "Location", "Waiting", "No location", "rgba(140,215,255,0.68)"),
            tile("Weather", "Atmosphere", "Waiting", "No weather", "rgba(255,196,118,0.72)"),
            tile("Sun", "Light", "Waiting", "No sun context", "rgba(255,203,122,0.78)"),
            tile("Air", "Quality", "Waiting", "No air context", "rgba(126,231,181,0.72)"),
        ],
    };
}

function getPlaceTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const coordinates = getCoordinates(snapshot);
    const precision = display(snapshot.location_precision);

    return tile(
        "Place",
        "Location",
        getPlace(snapshot),
        coordinates !== "—" ? `${precision} · ${coordinates}` : precision,
        "rgba(140,215,255,0.68)"
    );
}

function getWeatherTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const temperature = display(snapshot.temperature_c, "°C");
    const feelsLike = display(snapshot.apparent_temperature_c, "°C");

    return tile(
        "Weather",
        "Atmosphere",
        getCondition(snapshot),
        `${temperature} · feels ${feelsLike}`,
        "rgba(255,196,118,0.72)"
    );
}

function getSunTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const daylight = snapshot.is_day === true ? "Daylight" : "Night";
    const uv = display(snapshot.uv_index);
    const sunset = display(snapshot.sunset_local);

    return tile(
        "Sun",
        "Light",
        daylight,
        `UV ${uv} · sunset ${sunset}`,
        "rgba(255,203,122,0.78)"
    );
}

function getAirTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const aqi = display(snapshot.us_aqi ?? snapshot.aqi);
    const pm25 = display(snapshot.pm2_5, " μg/m³");

    return tile(
        "Air",
        "Quality",
        aqi === "—" ? "No AQI" : `AQI ${aqi}`,
        `PM2.5 ${pm25}`,
        "rgba(126,231,181,0.72)"
    );
}

function getAltitudeTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const elevation = display(snapshot.elevation_m, " m");
    const accuracy = display(snapshot.vertical_accuracy_m, " m");

    return tile(
        "Altitude",
        "Elevation",
        elevation,
        `Vertical accuracy ${accuracy}`,
        "rgba(196,173,255,0.72)"
    );
}

function getSourceTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const provider = display(snapshot.environment_context_provider);
    const signal = getSignal(snapshot);

    return tile(
        "Source",
        "Signal",
        provider,
        signal,
        "rgba(255,255,255,0.52)"
    );
}

function tile(
    title: string,
    eyebrow: string,
    value: string,
    detail: string,
    accent: string
): EnvironmentSummaryTileModel {
    return {
        title,
        eyebrow,
        value,
        detail,
        accent,
    };
}

/* ------------------------------
   Record
-------------------------------- */
function getRecord(snapshot: EnvironmentSnapshot): EnvironmentRecordModel {
    return {
        title: "Latest snapshot",
        subtitle: formatMs(snapshot.moment_ms),
        primary: `Source: ${display(snapshot.source_mode)} · ${display(snapshot.capture_mode)}`,
        secondary: `Snapshot ${display(snapshot.id)}`,
    };
}

/* ------------------------------
   Helpers
-------------------------------- */
function getPlace(snapshot: EnvironmentSnapshot): string {
    if (typeof snapshot.manual_city === "string" && snapshot.manual_city.trim()) {
        return snapshot.manual_city;
    }

    if (snapshot.lat && snapshot.lng) {
        return "Current location";
    }

    return "Environment";
}

function getCoordinates(snapshot: EnvironmentSnapshot): string {
    const lat = numberValue(snapshot.lat);
    const lng = numberValue(snapshot.lng);

    if (lat === null || lng === null) return "—";

    return `${round(lat)}, ${round(lng)}`;
}

function getSignal(snapshot: EnvironmentSnapshot): string {
    const accuracy = display(snapshot.accuracy_m, " m");
    const connection = display(snapshot.emitter_connection);

    if (accuracy === "—" && connection === "—") return "Signal active";
    if (accuracy === "—") return connection;

    return `Signal ${accuracy} · ${connection}`;
}

function getCondition(snapshot: EnvironmentSnapshot): string {
    const code = String(snapshot.weather_code ?? "");
    const cloud = numberValue(snapshot.cloud_cover_pct);
    const rain = numberValue(snapshot.rain_mm);

    if (rain && rain > 0) return "Rain";
    if (code === "0" && cloud !== null && cloud < 15) return "Clear";
    if (cloud !== null && cloud > 60) return "Cloudy";
    if (cloud !== null && cloud > 20) return "Partly cloudy";

    return "Current conditions";
}

function display(value: unknown, suffix = ""): string {
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "number") return `${round(value)}${suffix}`;
    if (Array.isArray(value)) return formatArray(value);

    return `${String(value)}${suffix}`;
}

function numberValue(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
}

function round(value: number): string {
    if (Number.isInteger(value)) return String(value);
    return String(Math.round(value * 10) / 10);
}

function formatArray(value: unknown): string {
    if (!Array.isArray(value) || value.length === 0) return "—";

    return value.map(String).join(", ");
}

function formatMs(value: unknown): string {
    const ms = numberValue(value);
    if (!ms) return "—";

    return new Date(ms).toLocaleString();
}

function formatHeroTime(value: unknown): string {
    const ms = numberValue(value);
    if (!ms) return "—";

    return new Date(ms).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}