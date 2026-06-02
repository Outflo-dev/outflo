/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL TYPES
   File: app/dev/environment/drill/main/internal/environment-drill.types.ts
   Scope: Types for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: pivot pings drill prototype to emitter event truth
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentDrillEmitterRow = {
    id: string;
    event_ms: number | null;
    received_ms: number | null;

    lat: number | null;
    lon: number | null;
    accuracy_m: number | null;

    battery_pct: number | null;
    battery_status: number | null;
    connection: string | null;
    trigger: string | null;
    tracker_id: string | null;

    raw: unknown;
};

export type EnvironmentPingsDrill = {
    beginMs: number | null;
    nowMs: number;
    windMs: number;
    pingCount: number;
    totalPingCount: number;
    firstPingMs: number | null;
    lastPingMs: number | null;
    sentence: string;
};

export type EnvironmentPingsProofRow = {
    id: string;
    eventMs: number | null;
    receivedMs: number | null;
    timeLabel: string;
    receivedLabel: string;
    accuracyLabel: string;
    batteryLabel: string;
    connectionLabel: string;
    triggerLabel: string;
    trackerLabel: string;
    latLngLabel: string;
};