/* ==========================================================
   OUTFLO — ENVIRONMENT SUMMARY COMPILER
   File: app/app/environment/main/internal/compiler/environment.summary.ts
   Scope: Own Environment summary section and tile model compilation
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: restore summary tiles against current snapshot field ownership
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
    getEnvironmentSignal,
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
            getSunTile(snapshot),
            getAirTile(snapshot),
            getAltitudeTile(snapshot),
            getSourceTile(snapshot),
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
            ? `${precision} · ${coordinates}`
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

    return tile(
        "Weather",
        "Atmosphere",
        getEnvironmentCondition(snapshot),
        `${temperature} · feels ${feelsLike}`,
        "rgba(255,196,118,0.72)"
    );
}

function getSunTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const daylight = snapshot.is_day === true ? "Daylight" : "Night";
    const uv = displayValue(snapshot.uv_index);
    const sunset = displayValue(snapshot.sunset_local);

    return tile(
        "Sun",
        "Light",
        daylight,
        `UV ${uv} · sunset ${sunset}`,
        "rgba(255,203,122,0.78)"
    );
}

function getAirTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const aqi = displayValue(snapshot.us_aqi ?? snapshot.aqi);
    const pm25 = displayValue(snapshot.pm2_5, " μg/m³");

    return tile(
        "Air",
        "Quality",
        aqi === "—" ? "No AQI" : `AQI ${aqi}`,
        `PM2.5 ${pm25}`,
        "rgba(126,231,181,0.72)"
    );
}

function getAltitudeTile(
    snapshot: EnvironmentSnapshot
): EnvironmentSummaryTileModel {
    const elevation = displayValue(snapshot.elevation_m, " m");
    const accuracy = displayValue(snapshot.vertical_accuracy_m, " m");

    return tile(
        "Altitude",
        "Elevation",
        elevation,
        `Vertical accuracy ${accuracy}`,
        "rgba(196,173,255,0.72)"
    );
}

function getSourceTile(snapshot: EnvironmentSnapshot): EnvironmentSummaryTileModel {
    const provider = displayValue(snapshot.environment_context_provider);
    const signal = getEnvironmentSignal(snapshot);

    return tile(
        "Source",
        "Signal",
        provider,
        signal,
        "rgba(255,255,255,0.52)"
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