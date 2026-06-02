/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL COMPUTE
   File: app/dev/environment/drill/main/internal/environment-drill.compute.ts
   Scope: Pure computation for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: pivot pings drill prototype compute to emitter event truth
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentDrillEmitterRow,
    EnvironmentPingsDrill,
    EnvironmentPingsProofRow,
} from "./environment-drill.types";

/* ------------------------------
   Helpers
-------------------------------- */
function isFiniteNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function sortByEventMs(rows: EnvironmentDrillEmitterRow[]) {
    return [...rows].sort((a, b) => {
        const aMs = a.event_ms ?? 0;
        const bMs = b.event_ms ?? 0;

        return aMs - bMs;
    });
}

function formatMs(ms: number | null) {
    if (!isFiniteNumber(ms)) return "—";

    return new Date(ms).toLocaleString();
}

function formatMeters(value: number | null) {
    if (!isFiniteNumber(value)) return "—";

    return `${Math.round(value)}m`;
}

function formatPercent(value: number | null) {
    if (!isFiniteNumber(value)) return "—";

    return `${Math.round(value)}%`;
}

function formatLatLon(row: EnvironmentDrillEmitterRow) {
    if (!isFiniteNumber(row.lat) || !isFiniteNumber(row.lon)) return "—";

    return `${row.lat.toFixed(5)}, ${row.lon.toFixed(5)}`;
}

function buildProofRows(rows: EnvironmentDrillEmitterRow[]): EnvironmentPingsProofRow[] {
    return rows.map((row) => ({
        id: row.id,
        eventMs: row.event_ms,
        receivedMs: row.received_ms,
        timeLabel: formatMs(row.event_ms),
        receivedLabel: formatMs(row.received_ms),
        accuracyLabel: formatMeters(row.accuracy_m),
        batteryLabel: formatPercent(row.battery_pct),
        connectionLabel: row.connection ?? "—",
        triggerLabel: row.trigger ?? "—",
        trackerLabel: row.tracker_id ?? "—",
        latLngLabel: formatLatLon(row),
    }));
}

/* ------------------------------
   Compute
-------------------------------- */
export function getWindMs(params: {
    beginMs: number | null;
    nowMs: number;
    windPercent: number;
}) {
    if (!isFiniteNumber(params.beginMs)) return params.nowMs;

    const safePercent = clamp(params.windPercent, 0, 100);
    const spanMs = Math.max(0, params.nowMs - params.beginMs);

    return Math.round(params.beginMs + spanMs * (safePercent / 100));
}

export function computeEnvironmentPingsDrill(params: {
    beginMs: number | null;
    nowMs: number;
    windPercent: number;
    rows: EnvironmentDrillEmitterRow[];
}): EnvironmentPingsDrill {
    const windMs = getWindMs({
        beginMs: params.beginMs,
        nowMs: params.nowMs,
        windPercent: params.windPercent,
    });

    const sorted = sortByEventMs(params.rows).filter((row) =>
        isFiniteNumber(row.event_ms)
    );

    const woundRows = sorted.filter((row) => {
        if (!isFiniteNumber(row.event_ms)) return false;
        if (isFiniteNumber(params.beginMs) && row.event_ms < params.beginMs) {
            return false;
        }

        return row.event_ms <= windMs;
    });

    const first = woundRows[0] ?? null;
    const last = woundRows[woundRows.length - 1] ?? null;

    const pingCount = woundRows.length;
    const totalPingCount = sorted.length;

    return {
        beginMs: params.beginMs,
        nowMs: params.nowMs,
        windMs,
        pingCount,
        totalPingCount,
        firstPingMs: first?.event_ms ?? null,
        lastPingMs: last?.event_ms ?? null,
        sentence: `At this point in the wind, Environment heard ${pingCount} of ${totalPingCount} pings.`,
    };
}

export function computeEnvironmentPingsProofRows(params: {
    beginMs: number | null;
    windMs: number;
    rows: EnvironmentDrillEmitterRow[];
}) {
    const sorted = sortByEventMs(params.rows).filter((row) =>
        isFiniteNumber(row.event_ms)
    );

    const woundRows = sorted.filter((row) => {
        if (!isFiniteNumber(row.event_ms)) return false;
        if (isFiniteNumber(params.beginMs) && row.event_ms < params.beginMs) {
            return false;
        }

        return row.event_ms <= params.windMs;
    });

    return buildProofRows(woundRows);
}