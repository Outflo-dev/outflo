/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER COMPILER
   File: app/app/environment/main/internal/compiler/environment.weather.ts
   Scope: Own Environment weather condition, scene, and weather-code display rules
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: extract weather and scene compilation from environment.sections.ts
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentSceneKey,
    EnvironmentSceneModel,
    EnvironmentSnapshot,
} from "../environment.types";
import { numberValue } from "./environment.compiler.utils";

/* ------------------------------
   Public API
-------------------------------- */
export function compileEnvironmentScene(
    snapshot: EnvironmentSnapshot
): EnvironmentSceneModel {
    const key = getEnvironmentSceneKey(snapshot);

    return {
        key,
        label: getEnvironmentSceneLabel(key),
    };
}

export function getEnvironmentSceneKey(
    snapshot: EnvironmentSnapshot
): EnvironmentSceneKey {
    const code = String(snapshot.weather_code ?? "");
    const cloud = numberValue(snapshot.cloud_cover_pct);
    const rain = numberValue(snapshot.rain_mm);
    const snow = numberValue(snapshot.snowfall_mm);
    const isDay = snapshot.is_day === true;

    if (snow && snow > 0) return "snow";
    if (rain && rain > 0) return "rain";
    if (isThunderstormCode(code)) return "thunderstorm";

    if (!isDay) {
        if (cloud !== null && cloud > 20) return "partly-cloudy-night";

        return "clear-night";
    }

    if (cloud !== null && cloud > 60) return "cloudy-day";
    if (cloud !== null && cloud > 20) return "partly-cloudy-day";

    return "clear-day";
}

export function getEnvironmentSceneKeyFromForecastRow(
    row: Record<string, unknown>
): EnvironmentSceneKey {
    const code = String(row.weather_code ?? "");
    const cloud = numberValue(row.cloud_cover_pct);
    const rain = numberValue(row.rain_mm);
    const precipitation = numberValue(row.precipitation_mm);
    const snow = numberValue(row.snowfall_mm);
    const isDay = row.is_day === true;

    if (snow && snow > 0) return "snow";
    if ((rain && rain > 0) || (precipitation && precipitation > 0)) {
        return "rain";
    }
    if (isThunderstormCode(code)) return "thunderstorm";

    if (!isDay) {
        if (cloud !== null && cloud > 20) return "partly-cloudy-night";

        return "clear-night";
    }

    if (cloud !== null && cloud > 60) return "cloudy-day";
    if (cloud !== null && cloud > 20) return "partly-cloudy-day";

    return "clear-day";
}

export function getEnvironmentSceneLabel(key: EnvironmentSceneKey): string {
    if (key === "empty") return "No snapshot";
    if (key === "clear-day") return "Clear day";
    if (key === "partly-cloudy-day") return "Partly cloudy day";
    if (key === "cloudy-day") return "Cloudy day";
    if (key === "rain") return "Rain";
    if (key === "snow") return "Snow";
    if (key === "thunderstorm") return "Thunderstorm";
    if (key === "clear-night") return "Clear night";

    return "Partly cloudy night";
}

export function getEnvironmentCondition(
    snapshot: EnvironmentSnapshot
): string {
    const code = String(snapshot.weather_code ?? "");
    const cloud = numberValue(snapshot.cloud_cover_pct);
    const rain = numberValue(snapshot.rain_mm);
    const snow = numberValue(snapshot.snowfall_mm);

    if (snow && snow > 0) return "Snow";
    if (rain && rain > 0) return "Rain";
    if (isThunderstormCode(code)) return "Thunderstorm";
    if (code === "0" && cloud !== null && cloud < 15) return "Clear";
    if (cloud !== null && cloud > 60) return "Cloudy";
    if (cloud !== null && cloud > 20) return "Partly cloudy";

    return "Current conditions";
}

/* ------------------------------
   Helpers
-------------------------------- */
function isThunderstormCode(code: string): boolean {
    return code === "95" || code === "96" || code === "99";
}