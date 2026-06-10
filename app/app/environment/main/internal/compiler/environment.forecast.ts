/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST COMPILER
   File: app/app/environment/main/internal/compiler/environment.forecast.ts
   Scope: Own Environment forecast section model compilation
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: restore forecast compilation from latest environment context payload
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentForecastItemModel,
    EnvironmentForecastModel,
    EnvironmentSnapshot,
} from "../environment.types";
import type { EnvironmentDisplayContext } from "./environment.display";
import { formatTemperatureC } from "./environment.display";
import {
    formatForecastHour,
    numberValue,
} from "./environment.compiler.utils";
import {
    getEnvironmentCondition,
    getEnvironmentSceneKey,
    getEnvironmentSceneKeyFromForecastRow,
    getEnvironmentSceneLabel,
} from "./environment.weather";

/* ------------------------------
   Public API
-------------------------------- */
export function compileEnvironmentForecast(
    snapshot: EnvironmentSnapshot,
    displayContext: EnvironmentDisplayContext
): EnvironmentForecastModel {
    const hourlyItems = getHourlyForecastItems(snapshot, displayContext);

    if (hourlyItems.length > 0) {
        return {
            title: "Forecast",
            subtitle: "Next 24 hours",
            items: hourlyItems,
        };
    }

    return {
        title: "Forecast",
        subtitle: "Hourly forecast pending",
        items: getPendingForecastItems(snapshot, displayContext),
    };
}

/* ------------------------------
   Helpers
-------------------------------- */
function getHourlyForecastItems(
    snapshot: EnvironmentSnapshot,
    displayContext: EnvironmentDisplayContext
): EnvironmentForecastItemModel[] {
    const context = snapshot.latest_environment_context;

    if (!context || typeof context !== "object") return [];

    const hourly = (context as Record<string, unknown>).hourly_forecast;

    if (!Array.isArray(hourly)) return [];

    const startMs = numberValue(
        snapshot.environment_context_pulled_at_ms ?? snapshot.moment_ms
    );
    const startDate = startMs ? new Date(startMs) : null;

    return hourly
        .filter((item) => {
            if (!item || typeof item !== "object") return false;
            if (!startDate) return true;

            const time = (item as Record<string, unknown>).time_local;
            if (typeof time !== "string") return false;

            return new Date(time).getTime() >= startDate.getTime() - 60 * 60 * 1000;
        })
        .slice(0, 24)
        .map((item, index) => {
            const row = item as Record<string, unknown>;
            const label = index === 0 ? "Now" : formatForecastHour(row.time_local);
            const sceneKey = getEnvironmentSceneKeyFromForecastRow(row);

            return forecastItem(
                label,
                row.temperature_c,
                getEnvironmentSceneLabel(sceneKey),
                sceneKey,
                displayContext
            );
        });
}

function getPendingForecastItems(
    snapshot: EnvironmentSnapshot,
    displayContext: EnvironmentDisplayContext
): EnvironmentForecastItemModel[] {
    const startMs = numberValue(
        snapshot.environment_context_pulled_at_ms ?? snapshot.moment_ms
    );
    const startDate = startMs ? new Date(startMs) : new Date();

    return Array.from({ length: 24 }, (_, index) => {
        const hourDate = new Date(startDate.getTime() + index * 60 * 60 * 1000);
        const label =
            index === 0 ? "Now" : formatForecastHour(hourDate.toISOString());

        if (index === 0) {
            return forecastItem(
                label,
                snapshot.temperature_c,
                getEnvironmentCondition(snapshot),
                getEnvironmentSceneKey(snapshot),
                displayContext
            );
        }

        return {
            label,
            value: "—",
            detail: "Pending",
            sceneKey: "empty",
        };
    });
}

function forecastItem(
    label: string,
    temperature: unknown,
    detail: string,
    sceneKey: EnvironmentForecastItemModel["sceneKey"],
    displayContext: EnvironmentDisplayContext
): EnvironmentForecastItemModel {
    return {
        label,
        value: formatTemperatureC(
            temperature,
            displayContext.temperatureUnit
        ),
        detail,
        sceneKey,
    };
}