/* ==========================================================
   OUTFLO — ENVIRONMENT TILES COMPILER
   File: app/app/environment/main/internal/compiler/environment.tiles.ts
   Scope: Own Environment tile model compilation from snapshot truth
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentAirQualityStatus,
    EnvironmentSnapshot,
    EnvironmentTilesModel,
} from "../environment.types";

import {
    displayValue,
    formatHeroTime,
} from "./environment.compiler.utils";

/* ------------------------------
   Public API
-------------------------------- */
export function compileEnvironmentTiles(
    snapshot: EnvironmentSnapshot
): EnvironmentTilesModel {
    return {
        air: compileEnvironmentAirTile(snapshot),
    };
}

export function getEmptyEnvironmentTiles(): EnvironmentTilesModel {
    return {
        air: {
            title: "Air Quality",
            eyebrow: "Outdoor air",
            aqi: "—",
            status: "unknown",
            statusLabel: "Unknown",
            updated: "Updated —",
        },
    };
}

/* ------------------------------
   Air Quality
-------------------------------- */
function compileEnvironmentAirTile(
    snapshot: EnvironmentSnapshot
): EnvironmentTilesModel["air"] {
    const rawAqi = snapshot.us_aqi ?? snapshot.aqi;
    const aqi = displayValue(rawAqi);
    const status = getAirQualityStatus(rawAqi);

    return {
        title: "Air Quality",
        eyebrow: "Outdoor air",
        aqi,
        status,
        statusLabel: getAirQualityStatusLabel(status),
        updated: `Updated ${formatHeroTime(
            snapshot.environment_context_pulled_at_ms ?? snapshot.moment_ms
        )}`,
    };
}

/* ------------------------------
   Helpers
-------------------------------- */
function getAirQualityStatus(value: unknown): EnvironmentAirQualityStatus {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        return "unknown";
    }

    if (value <= 50) {
        return "good";
    }

    if (value <= 100) {
        return "moderate";
    }

    return "elevated";
}

function getAirQualityStatusLabel(
    status: EnvironmentAirQualityStatus
): string {
    if (status === "good") return "Good";
    if (status === "moderate") return "Moderate";
    if (status === "elevated") return "Elevated";

    return "Unknown";
}