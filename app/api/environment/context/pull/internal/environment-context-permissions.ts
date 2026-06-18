/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PERMISSIONS
   File: app/api/environment/context/pull/internal/environment-context-permissions.ts
   Scope: Filter Environment context persistence rows by participation state
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

import type { EnvironmentContextPersistenceParticipation } from "./environment-context-permissions.types";

/* ------------------------------
   Weather Fields
-------------------------------- */

const WEATHER_PERSISTENCE_FIELDS = [
   "weather_code",
   "temperature_c",
   "apparent_temperature_c",
   "dew_point_c",
   "precipitation_mm",
   "rain_mm",
   "showers_mm",
   "forecast_raw",
   "forecast_units",
] as const;

/* ------------------------------
   Public Filter
-------------------------------- */

export function filterEnvironmentContextPersistenceRow<
   Row extends Record<string, unknown>,
>(args: {
   row: Row;
   participation: EnvironmentContextPersistenceParticipation;
}): Partial<Row> {
   const next: Partial<Row> = { ...args.row };

   if (!args.participation.weather) {
      for (const field of WEATHER_PERSISTENCE_FIELDS) {
         delete next[field];
      }
   }

   return next;
}

/* ------------------------------
   Compatibility Filter
-------------------------------- */

export function filterWeatherPersistenceRow<Row extends Record<string, unknown>>(
   args: {
      row: Row;
      weatherEnabled: boolean;
   },
): Partial<Row> {
   return filterEnvironmentContextPersistenceRow({
      row: args.row,
      participation: {
         weather: args.weatherEnabled,
      },
   });
}