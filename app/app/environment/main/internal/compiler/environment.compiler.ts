/* ==========================================================
   OUTFLO — ENVIRONMENT MODEL COMPILER
   File: app/app/environment/main/internal/compiler/environment.compiler.ts
   Scope: Own Environment view model compilation from snapshot truth
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: consume persisted Environment preferences during model compilation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

import type {
    EnvironmentForecastModel,
    EnvironmentHeroModel,
    EnvironmentRecordModel,
    EnvironmentSceneModel,
    EnvironmentSnapshot,
    EnvironmentSummarySectionModel,
    EnvironmentViewModel,
} from "../environment.types";
import {
    formatTemperatureC,
    getEnvironmentDisplayContext,
} from "./environment.display";
import { compileEnvironmentForecast } from "./environment.forecast";
import {
    getEnvironmentPlace,
    getEnvironmentSignal,
} from "./environment.location";
import { compileEnvironmentRecord } from "./environment.record";
import { compileEnvironmentSummary } from "./environment.summary";
import {
    compileEnvironmentScene,
    getEnvironmentCondition,
} from "./environment.weather";
import { formatHeroTime } from "./environment.compiler.utils";

/* ------------------------------
   Public API
-------------------------------- */
export function compileEnvironmentModel(
    snapshot: EnvironmentSnapshot | null,
    environmentEnabled: boolean,
    environmentPreferences: EnvironmentPreferences
): EnvironmentViewModel {
    if (!environmentEnabled) {
        return getDisabledEnvironmentModel();
    }

    if (!snapshot) {
        return getEmptyEnvironmentModel();
    }

    const displayContext = getEnvironmentDisplayContext(
        snapshot,
        environmentPreferences
    );

    return {
        hasSnapshot: true,
        scene: compileEnvironmentScene(snapshot),
        hero: compileEnvironmentHero(snapshot, displayContext),
        forecast: compileEnvironmentForecast(snapshot, displayContext),
        summary: compileEnvironmentSummary(snapshot, displayContext),
        record: compileEnvironmentRecord(snapshot),
    };
}

/* ------------------------------
   Hero
-------------------------------- */
function compileEnvironmentHero(
    snapshot: EnvironmentSnapshot,
    displayContext: ReturnType<typeof getEnvironmentDisplayContext>
): EnvironmentHeroModel {
    const temperature = formatTemperatureC(
        snapshot.temperature_c,
        displayContext.temperatureUnit
    );
    const feelsLike = formatTemperatureC(
        snapshot.apparent_temperature_c,
        displayContext.temperatureUnit
    );

    return {
        place: getEnvironmentPlace(snapshot),
        temperature,
        condition: getEnvironmentCondition(snapshot),
        feelsLike: `Feels like ${feelsLike}`,
        updated: `Updated ${formatHeroTime(
            snapshot.environment_context_pulled_at_ms ?? snapshot.moment_ms
        )}`,
        signal: getEnvironmentSignal(snapshot),
    };
}

/* ------------------------------
   Empty States
-------------------------------- */
function getEmptyEnvironmentModel(): EnvironmentViewModel {
    return {
        hasSnapshot: false,
        scene: getEmptyScene(),
        hero: getEmptyHero(),
        forecast: getEmptyForecast(),
        summary: getEmptySummary(),
        record: getEmptyRecord(),
    };
}

function getDisabledEnvironmentModel(): EnvironmentViewModel {
    return {
        hasSnapshot: false,
        scene: getEmptyScene(),
        hero: {
            ...getEmptyHero(),
            place: "Environment off",
            condition: "Environment is disabled",
            signal: "Enable Environment to resume signals",
        },
        forecast: getEmptyForecast(),
        summary: {
            title: "Environment Details",
            subtitle: "Environment is currently disabled.",
            tiles: [],
        },
        record: {
            title: "Latest Record",
            subtitle: "Environment disabled.",
            primary: "Off",
            secondary: "No active environment snapshot.",
        },
    };
}

/* ------------------------------
   Empty Model Parts
-------------------------------- */
function getEmptyScene(): EnvironmentSceneModel {
    return {
        key: "empty",
        label: "No snapshot",
    };
}

function getEmptyHero(): EnvironmentHeroModel {
    return {
        place: "Current location",
        temperature: "—",
        condition: "Waiting for Environment",
        feelsLike: "Feels like —",
        updated: "Updated —",
        signal: "Signal pending",
    };
}

function getEmptyForecast(): EnvironmentForecastModel {
    return {
        title: "Forecast",
        subtitle: "Hourly forecast pending",
        items: [],
    };
}

function getEmptySummary(): EnvironmentSummarySectionModel {
    return {
        title: "Environment Details",
        subtitle: "Waiting for resolved environment signals.",
        tiles: [],
    };
}

function getEmptyRecord(): EnvironmentRecordModel {
    return {
        title: "Latest Record",
        subtitle: "Current snapshot proof.",
        primary: "No snapshot",
        secondary: "No environment record has been resolved yet.",
    };
}