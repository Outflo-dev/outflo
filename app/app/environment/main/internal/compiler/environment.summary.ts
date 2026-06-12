/* ==========================================================
   OUTFLO — ENVIRONMENT SUMMARY COMPILER
   File: app/app/environment/main/internal/compiler/environment.summary.ts
   Scope: Own Environment summary section and tile model compilation
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: lock live Environment tiles to Weather plus Atmosphere taxonomy
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentSnapshot,
    EnvironmentSummarySectionModel,
    EnvironmentSummaryTileModel,
} from "../environment.types";
import type { EnvironmentDisplayContext } from "./environment.display";
import { formatTemperatureC } from "./environment.display";
import { displayValue } from "./environment.compiler.utils";
import {
    getEnvironmentCoordinates,
    getEnvironmentPlace,
} from "./environment.location";
import { getEnvironmentCondition } from "./environment.weather";

/* ------------------------------
   Public API
-------------------------------- */
export function compileEnvironmentSummary(
    snapshot: EnvironmentSnapshot,
    displayContext: EnvironmentDisplayContext
): EnvironmentSummarySectionModel {
    return {
        title: "Environment Details",
        subtitle: "Current resolved environment signals.",
        tiles: [
            getPlaceTile(snapshot),
            getWeatherTile(snapshot, displayContext),
            getAtmosphereTile(snapshot),
            getSunTile(snapshot),
            getAirQualityTile(snapshot),
            getAltitudeTile(snapshot),
        ],
    };
}

/* ------------------------------
   Tiles
-------------------------------- */
function getPlaceTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const coordinates = getEnvironmentCoordinates(snapshot);
    const precision = displayValue(snapshot.location_precision);

    return tile(
        "Place",
        "Location",
        getEnvironmentPlace(snapshot),
        coordinates !== "Coordinates pending"
            ? compactJoin([precision, coordinates])
            : precision,
        "rgba(140,215,255,0.68)"
    );
}

function getWeatherTile(
    snapshot: EnvironmentSnapshot,
    displayContext: EnvironmentDisplayContext
): EnvironmentSummaryTileModel {
    const temperature = formatTemperatureC(
        snapshot.temperature_c,
        displayContext.temperatureUnit
    );
    const feelsLike = formatTemperatureC(
        snapshot.apparent_temperature_c,
        displayContext.temperatureUnit
    );
    const precipitation = displayValue(snapshot.precipitation_mm, " mm");
    const rain = displayValue(snapshot.rain_mm, " mm");
    const snow = displayValue(snapshot.snowfall_mm, " mm");
    const probability = displayValue(snapshot.precipitation_probability_pct, "%");

    return tile(
        "Weather",
        "Condition",
        getEnvironmentCondition(snapshot),
        compactJoin([
            `${temperature} · feels ${feelsLike}`,
            precipitation !== "—" ? `precip ${precipitation}` : null,
            rain !== "—" ? `rain ${rain}` : null,
            snow !== "—" ? `snow ${snow}` : null,
            probability !== "—" ? `chance ${probability}` : null,
        ]),
        "rgba(255,196,118,0.72)"
    );
}

function getAtmosphereTile(
    snapshot: EnvironmentSnapshot
): EnvironmentSummaryTileModel {
    const humidity = displayValue(snapshot.humidity_pct, "%");
    const pressure = displayValue(snapshot.pressure_hpa, " hPa");
    const wind = displayValue(snapshot.wind_speed_mps, " m/s");
    const gust = displayValue(snapshot.wind_gust_mps, " m/s");
    const visibility = displayValue(snapshot.visibility_m, " m");
    const cloud = displayValue(snapshot.cloud_cover_pct, "%");

    const primary =
        humidity !== "—"
            ? `Humidity ${humidity}`
            : pressure !== "—"
                ? `Pressure ${pressure}`
                : wind !== "—"
                    ? `Wind ${wind}`
                    : "Atmosphere pending";

    return tile(
        "Atmosphere",
        "Air state",
        primary,
        compactJoin([
            pressure !== "—" ? `pressure ${pressure}` : null,
            wind !== "—" ? `wind ${wind}` : null,
            gust !== "—" ? `gust ${gust}` : null,
            visibility !== "—" ? `visibility ${visibility}` : null,
            cloud !== "—" ? `cloud ${cloud}` : null,
        ]),
        "rgba(174,214,255,0.72)"
    );
}

function getSunTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const daylight = snapshot.is_day === true ? "Daylight" : "Night";
    const uv = displayValue(snapshot.uv_index);
    const sunset = displayValue(snapshot.sunset_local);
    const altitude = displayValue(snapshot.sun_altitude_deg, "°");
    const azimuth = displayValue(snapshot.sun_azimuth_deg, "°");

    return tile(
        "Sun",
        "Light",
        daylight,
        compactJoin([
            uv !== "—" ? `UV ${uv}` : null,
            sunset !== "—" ? `sunset ${sunset}` : null,
            altitude !== "—" ? `alt ${altitude}` : null,
            azimuth !== "—" ? `az ${azimuth}` : null,
        ]),
        "rgba(255,203,122,0.78)"
    );
}

function getAirQualityTile(
    snapshot: EnvironmentSnapshot
): EnvironmentSummaryTileModel {
    const aqi = displayValue(snapshot.us_aqi ?? snapshot.aqi);
    const pm25 = displayValue(snapshot.pm2_5, " μg/m³");
    const pm10 = displayValue(snapshot.pm10, " μg/m³");
    const ozone = displayValue(snapshot.ozone_ppb, " ppb");

    return tile(
        "Air quality",
        "Outdoor air",
        aqi === "—" ? "No AQI" : `AQI ${aqi}`,
        compactJoin([
            pm25 !== "—" ? `PM2.5 ${pm25}` : null,
            pm10 !== "—" ? `PM10 ${pm10}` : null,
            ozone !== "—" ? `O₃ ${ozone}` : null,
        ]),
        "rgba(126,231,181,0.72)"
    );
}

function getAltitudeTile(
    snapshot: EnvironmentSnapshot
): EnvironmentSummaryTileModel {
    const elevation = displayValue(snapshot.elevation_m, " m");
    const altitude = displayValue(snapshot.altitude_m, " m");
    const accuracy = displayValue(snapshot.vertical_accuracy_m, " m");

    return tile(
        "Altitude",
        "Elevation",
        elevation !== "—" ? elevation : altitude,
        accuracy !== "—" ? `Vertical accuracy ${accuracy}` : "Accuracy pending",
        "rgba(196,173,255,0.72)"
    );
}

/* ------------------------------
   Helpers
-------------------------------- */
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

function compactJoin(values: Array<string | null>): string {
    const clean = values.filter((value): value is string => {
        return Boolean(value && value !== "—");
    });

    if (clean.length === 0) {
        return "—";
    }

    return clean.join(" · ");
}