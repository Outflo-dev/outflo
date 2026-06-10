/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION COMPILER
   File: app/app/environment/main/internal/compiler/environment.location.ts
   Scope: Own Environment place, source, and signal display rules
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: extract location and signal compilation from environment.sections.ts
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentSnapshot } from "../environment.types";
import { displayValue, numberValue } from "./environment.compiler.utils";

/* ------------------------------
   Public API
-------------------------------- */
export function getEnvironmentPlace(snapshot: EnvironmentSnapshot): string {
    const manualCity = readString(snapshot.manual_city);
    const city = readString(snapshot.city);
    const place = readString(snapshot.place);
    const providerPlace = readString(snapshot.provider_place);

    return manualCity ?? city ?? place ?? providerPlace ?? "Current location";
}

export function getEnvironmentSignal(snapshot: EnvironmentSnapshot): string {
    const source = readString(snapshot.source);
    const trigger = readString(snapshot.trigger);
    const accuracy = numberValue(snapshot.accuracy_m);

    if (source && trigger && accuracy !== null) {
        return `${source} · ${trigger} · ±${Math.round(accuracy)}m`;
    }

    if (source && accuracy !== null) {
        return `${source} · ±${Math.round(accuracy)}m`;
    }

    if (source) {
        return source;
    }

    if (accuracy !== null) {
        return `±${Math.round(accuracy)}m`;
    }

    return "Signal pending";
}

export function getEnvironmentSource(snapshot: EnvironmentSnapshot): string {
    const source = readString(snapshot.source);
    const provider = readString(snapshot.provider);
    const emitter = readString(snapshot.emitter_key);

    return source ?? provider ?? emitter ?? "Environment";
}

export function getEnvironmentAltitude(snapshot: EnvironmentSnapshot): string {
    return displayValue(snapshot.altitude_m, "m");
}

export function getEnvironmentCoordinates(snapshot: EnvironmentSnapshot): string {
    const lat = numberValue(snapshot.lat);
    const lon = numberValue(snapshot.lon);

    if (lat === null || lon === null) {
        return "Coordinates pending";
    }

    return `${roundCoordinate(lat)}, ${roundCoordinate(lon)}`;
}

/* ------------------------------
   Helpers
-------------------------------- */
function readString(value: unknown): string | null {
    if (typeof value !== "string") return null;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : null;
}

function roundCoordinate(value: number): string {
    return String(Math.round(value * 10000) / 10000);
}