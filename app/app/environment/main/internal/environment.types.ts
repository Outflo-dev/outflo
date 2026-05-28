/* ==========================================================
   OUTFLO — ENVIRONMENT TYPES
   File: app/app/environment/main/internal/environment.types.ts
   Scope: Define Environment substrate landing page display contracts
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: recompose Environment model around landing page summaries
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentSnapshot = Record<string, unknown>;

export type EnvironmentHeroModel = {
    place: string;
    temperature: string;
    condition: string;
    feelsLike: string;
    updated: string;
    signal: string;
    background: string;
};

export type EnvironmentForecastItemModel = {
    label: string;
    value: string;
    detail: string;
};

export type EnvironmentForecastModel = {
    title: string;
    subtitle: string;
    items: EnvironmentForecastItemModel[];
};

export type EnvironmentSummaryTileModel = {
    title: string;
    eyebrow: string;
    value: string;
    detail: string;
    accent: string;
};

export type EnvironmentSummarySectionModel = {
    title: string;
    subtitle: string;
    tiles: EnvironmentSummaryTileModel[];
};

export type EnvironmentRecordModel = {
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
};

export type EnvironmentViewModel = {
    hero: EnvironmentHeroModel;
    forecast: EnvironmentForecastModel;
    summary: EnvironmentSummarySectionModel;
    record: EnvironmentRecordModel;
    hasSnapshot: boolean;
};

/* ------------------------------
   Legacy Field Types
-------------------------------- */
export type EnvironmentField = {
    label: string;
    value: string;
};

export type EnvironmentSectionModel = {
    title: string;
    fields: EnvironmentField[];
};