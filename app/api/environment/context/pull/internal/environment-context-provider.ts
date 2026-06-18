/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PROVIDER
   File: app/api/environment/context/pull/internal/environment-context-provider.ts
   Scope: Pull and normalize provider environment context
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import { readJson } from "./environment-context-provider.client";
import { normalizeContext } from "./environment-context-provider.normalize";
import {
    buildAirQualityUrl,
    buildForecastUrl,
} from "./environment-context-provider.urls";

export type {
    NormalizedContext,
    NormalizedHourlyForecastItem,
    ProviderResult,
} from "./environment-context-provider.types";

export {
    kmhToMps,
    toInteger,
    toNumber,
} from "./environment-context-provider.utils";

export async function pullEnvironmentProviderContext(args: {
    snapshotId: string;
    momentMs: number | null;
    lat: number;
    lng: number;
    pulledAtMs: number;
}) {
    const forecastUrl = buildForecastUrl(args.lat, args.lng);
    const airQualityUrl = buildAirQualityUrl(args.lat, args.lng);

    const [forecast, airQuality] = await Promise.all([
        readJson(forecastUrl),
        readJson(airQualityUrl),
    ]);

    const normalizedContext = normalizeContext({
        input: {
            snapshot_id: args.snapshotId,
            moment_ms: args.momentMs,
            lat: args.lat,
            lng: args.lng,
        },
        pulled_at_ms: args.pulledAtMs,
        forecast,
        airQuality,
    });

    return {
        forecast,
        airQuality,
        normalizedContext,
    };
}