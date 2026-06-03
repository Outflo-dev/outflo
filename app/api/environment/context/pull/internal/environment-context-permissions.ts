/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PERMISSIONS
   File: app/api/environment/context/pull/internal/environment-context-permissions.ts
   Scope: Filter environment context persistence rows by user participation controls
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: extract weather persistence filtering from context pull route
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
type JsonRecord = Record<string, unknown>;

/* ------------------------------
   Weather
-------------------------------- */
export function filterWeatherPersistenceRow<T extends JsonRecord>(args: {
    row: T;
    weatherEnabled: boolean;
}) {
    const { row, weatherEnabled } = args;

    if (weatherEnabled) return row;

    const filtered = { ...row };

    delete filtered.weather_code;
    delete filtered.temperature_c;
    delete filtered.apparent_temperature_c;
    delete filtered.dew_point_c;
    delete filtered.precipitation_mm;
    delete filtered.rain_mm;
    delete filtered.showers_mm;
    delete filtered.forecast_raw;
    delete filtered.forecast_units;

    return filtered;
}