/* ==========================================================
   OUTFLO — ENVIRONMENT MODEL COMPILER
   File: app/app/environment/main/internal/compiler/environment.compiler.ts
   Scope: Compile live Environment state separately from persisted record proof
   Last Updated:
   - iso: 2026-07-14
   - note: preserve ephemeral Environment resolution without presenting it as recorded truth
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement";
import type {
    EnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences";

import type {
    EnvironmentEngagementModel,
    EnvironmentForecastModel,
    EnvironmentHeroModel,
    EnvironmentLocationModel,
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
import {
    compileEnvironmentForecast,
} from "./environment.forecast";
import {
    getEnvironmentPlace,
    getEnvironmentSignal,
} from "./environment.location";
import {
    compileEnvironmentRecord,
} from "./environment.record";
import {
    compileEnvironmentSummary,
} from "./environment.summary";
import {
    compileEnvironmentScene,
    getEnvironmentCondition,
} from "./environment.weather";
import {
    formatHeroTime,
} from "./environment.compiler.utils";
import {
    compileEnvironmentTiles,
    getEmptyEnvironmentTiles,
} from "./environment.tiles";

/* ------------------------------
   Public API
-------------------------------- */
export function compileEnvironmentModel(
    liveSnapshot: EnvironmentSnapshot | null,
    recordedSnapshot: EnvironmentSnapshot | null,
    environmentEnabled: boolean,
    environmentPreferences: EnvironmentPreferences,
    engagementState: EnvironmentEngagementState,
): EnvironmentViewModel {
    const engagement =
        compileEnvironmentEngagement(
            engagementState,
        );

    if (!environmentEnabled) {
        return getDisabledEnvironmentModel(
            engagement,
        );
    }

    const record =
        compileRecordedEnvironment(
            recordedSnapshot,
        );

    if (!liveSnapshot) {
        return getEmptyEnvironmentModel(
            engagement,
            record,
        );
    }

    const displayContext =
        getEnvironmentDisplayContext(
            liveSnapshot,
            environmentPreferences,
        );

    return {
        hasSnapshot: true,

        scene:
            compileEnvironmentScene(
                liveSnapshot,
            ),

        hero: compileEnvironmentHero(
            liveSnapshot,
            displayContext,
        ),

        location:
            compileEnvironmentLocation(
                liveSnapshot,
            ),

        engagement,

        tiles:
            compileEnvironmentTiles(
                liveSnapshot,
            ),

        forecast:
            compileEnvironmentForecast(
                liveSnapshot,
                displayContext,
            ),

        summary:
            compileEnvironmentSummary(
                liveSnapshot,
                displayContext,
            ),

        record,
    };
}

/* ------------------------------
   Engagement
-------------------------------- */
function compileEnvironmentEngagement(
    state: EnvironmentEngagementState,
): EnvironmentEngagementModel {
    const selectedMode =
        state.enabled &&
            (
                state.mode === "precise" ||
                state.mode === "capture"
            )
            ? state.mode
            : null;

    return {
        enabled: state.enabled,
        selectedMode,
    };
}

/* ------------------------------
   Hero
-------------------------------- */
function compileEnvironmentHero(
    snapshot: EnvironmentSnapshot,
    displayContext: ReturnType<
        typeof getEnvironmentDisplayContext
    >,
): EnvironmentHeroModel {
    const temperature =
        formatTemperatureC(
            snapshot.temperature_c,
            displayContext.temperatureUnit,
        );

    const feelsLike =
        formatTemperatureC(
            snapshot.apparent_temperature_c,
            displayContext.temperatureUnit,
        );

    return {
        place:
            getEnvironmentPlace(snapshot),

        temperature,

        condition:
            getEnvironmentCondition(snapshot),

        feelsLike:
            `Feels like ${feelsLike}`,

        updated:
            `Updated ${formatHeroTime(
                snapshot
                    .environment_context_pulled_at_ms ??
                snapshot.moment_ms,
            )}`,

        signal:
            getEnvironmentSignal(snapshot),
    };
}

/* ------------------------------
   Location
-------------------------------- */
function compileEnvironmentLocation(
    snapshot: EnvironmentSnapshot,
): EnvironmentLocationModel {
    const latitude =
        snapshot.latitude;

    const longitude =
        snapshot.longitude;

    return {
        latitude:
            typeof latitude === "number"
                ? latitude
                : undefined,

        longitude:
            typeof longitude === "number"
                ? longitude
                : undefined,
    };
}

/* ------------------------------
   Recorded Environment
-------------------------------- */
function compileRecordedEnvironment(
    snapshot: EnvironmentSnapshot | null,
): EnvironmentRecordModel {
    if (!snapshot) {
        return getEmptyRecord();
    }

    return compileEnvironmentRecord(
        snapshot,
    );
}

/* ------------------------------
   Empty States
-------------------------------- */
function getEmptyEnvironmentModel(
    engagement: EnvironmentEngagementModel,
    record: EnvironmentRecordModel,
): EnvironmentViewModel {
    return {
        hasSnapshot: false,
        scene: getEmptyScene(),
        hero: getEmptyHero(),
        location: getEmptyLocation(),
        engagement,
        tiles: getEmptyEnvironmentTiles(),
        forecast: getEmptyForecast(),
        summary: getEmptySummary(),
        record,
    };
}

function getDisabledEnvironmentModel(
    engagement: EnvironmentEngagementModel,
): EnvironmentViewModel {
    return {
        hasSnapshot: false,

        scene: getEmptyScene(),

        hero: {
            ...getEmptyHero(),
            place: "Environment off",
            condition:
                "Environment is disabled",
            signal:
                "Enable Environment to resume signals",
        },

        location: getEmptyLocation(),

        engagement,

        tiles: getEmptyEnvironmentTiles(),

        forecast: getEmptyForecast(),

        summary: {
            title: "Environment Details",
            subtitle:
                "Environment is currently disabled.",
            tiles: [],
        },

        record: {
            title: "Latest Record",
            subtitle:
                "Environment disabled.",
            primary: "Off",
            secondary:
                "No active environment snapshot.",
        },
    };
}

/* ------------------------------
   Empty Model Parts
-------------------------------- */
function getEmptyScene():
    EnvironmentSceneModel {
    return {
        key: "empty",
        label: "No snapshot",
    };
}

function getEmptyHero():
    EnvironmentHeroModel {
    return {
        place: "Current location",
        temperature: "—",
        condition:
            "Waiting for Environment",
        feelsLike: "Feels like —",
        updated: "Updated —",
        signal: "Signal pending",
    };
}

function getEmptyLocation():
    EnvironmentLocationModel {
    return {};
}

function getEmptyForecast():
    EnvironmentForecastModel {
    return {
        title: "Forecast",
        subtitle:
            "Hourly forecast pending",
        items: [],
    };
}

function getEmptySummary():
    EnvironmentSummarySectionModel {
    return {
        title: "Environment Details",
        subtitle:
            "Waiting for resolved environment signals.",
        tiles: [],
    };
}

function getEmptyRecord():
    EnvironmentRecordModel {
    return {
        title: "Latest Record",
        subtitle:
            "Current snapshot proof.",
        primary: "No snapshot",
        secondary:
            "No environment record has been resolved yet.",
    };
}