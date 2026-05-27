// app/app/environment/main/internal/environment.sections.ts
/* ==========================================================
   OUTFLO — ENVIRONMENT SECTIONS
   File: app/app/environment/main/internal/environment.sections.ts
   Scope: Build Environment substrate display model from current snapshot
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create rich Environment snapshot grouping model
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentField,
    EnvironmentHeroModel,
    EnvironmentSectionModel,
    EnvironmentSnapshot,
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
                signal: "Silent",
                background: "empty",
            },
            sections: [],
        };
    }

    return {
        hasSnapshot: true,
        hero: getHero(snapshot),
        sections: [
            section("Place", [
                field("Precision", snapshot.location_precision),
                field("Latitude", snapshot.lat),
                field("Longitude", snapshot.lng),
                field("Elevation", snapshot.elevation_m, "m"),
                field("Timezone", snapshot.environment_timezone),
                field("UTC offset", snapshot.environment_utc_offset_seconds, "s"),
            ]),
            section("Weather", [
                field("Temperature", snapshot.temperature_c, "°C"),
                field("Feels like", snapshot.apparent_temperature_c, "°C"),
                field("Humidity", snapshot.humidity_pct, "%"),
                field("Cloud cover", snapshot.cloud_cover_pct, "%"),
                field("Rain", snapshot.rain_mm, "mm"),
                field("Showers", snapshot.showers_mm, "mm"),
                field("Pressure", snapshot.pressure_msl_hpa ?? snapshot.pressure_hpa, "hPa"),
                field("Surface pressure", snapshot.surface_pressure_hpa, "hPa"),
                field("Wind", snapshot.wind_speed_kmh, "km/h"),
                field("Gusts", snapshot.wind_gusts_kmh, "km/h"),
                field("Direction", snapshot.wind_direction_deg ?? snapshot.wind_dir_deg, "°"),
                field("Weather code", snapshot.weather_code),
            ]),
            section("Sun", [
                field("Daylight", snapshot.is_day),
                field("Sunrise", snapshot.sunrise_local),
                field("Sunset", snapshot.sunset_local),
                field("Daylight duration", formatDuration(snapshot.daylight_duration_seconds)),
                field("UV index", snapshot.uv_index),
                field("Clear sky UV", snapshot.uv_index_clear_sky),
            ]),
            section("Air", [
                field("AQI", snapshot.us_aqi ?? snapshot.aqi),
                field("PM2.5", snapshot.pm2_5, "μg/m³"),
                field("PM10", snapshot.pm10, "μg/m³"),
                field("Ozone", snapshot.ozone_ug_m3 ?? snapshot.ozone_ppb, "μg/m³"),
                field("CO", snapshot.carbon_monoxide, "μg/m³"),
                field("NO₂", snapshot.nitrogen_dioxide, "μg/m³"),
                field("SO₂", snapshot.sulphur_dioxide, "μg/m³"),
                field("Dust", snapshot.dust, "μg/m³"),
                field("Aerosol depth", snapshot.aerosol_optical_depth),
            ]),
            section("Signal", [
                field("Source", snapshot.source_mode),
                field("Capture", snapshot.capture_mode),
                field("Observation", snapshot.observation_type),
                field("Accuracy", snapshot.accuracy_m, "m"),
                field("Vertical accuracy", snapshot.vertical_accuracy_m, "m"),
                field("Device", snapshot.emitter_device_id),
                field("Tracker", snapshot.emitter_tracker_id),
                field("Battery", snapshot.emitter_battery_pct, "%"),
                field("Connection", snapshot.emitter_connection),
                field("Motion", formatArray(snapshot.emitter_motion)),
            ]),
            section("Proof", [
                field("Snapshot", snapshot.id),
                field("Moment", formatMs(snapshot.moment_ms)),
                field("Emitter event", snapshot.source_payload_ref),
                field("Context event", snapshot.environment_context_event_id),
                field("Context pulled", formatMs(snapshot.environment_context_pulled_at_ms)),
                field("Provider", snapshot.environment_context_provider),
                field("Forecast provider lat", snapshot.forecast_provider_lat),
                field("Forecast provider lng", snapshot.forecast_provider_lng),
                field("Air provider lat", snapshot.air_provider_lat),
                field("Air provider lng", snapshot.air_provider_lng),
            ]),
        ],
    };
}

/* ------------------------------
   Helpers
-------------------------------- */
function getHero(snapshot: EnvironmentSnapshot): EnvironmentHeroModel {
    const temperature = display(snapshot.temperature_c, "°C");
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
        updated: `Updated ${formatMs(snapshot.environment_context_pulled_at_ms ?? snapshot.moment_ms)}`,
        signal: getSignal(snapshot),
        background: rain && rain > 0 ? "rain" : isDay ? (cloud && cloud > 40 ? "cloud" : "day") : "night",
    };
}

function getPlace(snapshot: EnvironmentSnapshot): string {
    if (typeof snapshot.manual_city === "string" && snapshot.manual_city.trim()) {
        return snapshot.manual_city;
    }

    if (snapshot.lat && snapshot.lng) {
        return "Current location";
    }

    return "Environment";
}

function getSignal(snapshot: EnvironmentSnapshot): string {
    const accuracy = display(snapshot.accuracy_m, "m");
    const connection = display(snapshot.emitter_connection);
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

function section(title: string, fields: EnvironmentField[]): EnvironmentSectionModel {
    return {
        title,
        fields: fields.filter((item) => item.value !== "—"),
    };
}

function field(label: string, value: unknown, suffix = ""): EnvironmentField {
    return {
        label,
        value: display(value, suffix),
    };
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

function formatDuration(value: unknown): string {
    const seconds = numberValue(value);
    if (!seconds) return "—";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
}