/* ==========================================================
   OUTFLO — ENVIRONMENT TYPES
   File: app/app/environment/main/internal/environment.types.ts
   Scope: Define Environment substrate landing page display contracts
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: add Environment scene model and remove hero background ownership
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentSnapshot = Record<string, unknown>;

export type EnvironmentSceneKey =
    | "empty"
    | "clear-day"
    | "partly-cloudy-day"
    | "cloudy-day"
    | "rain"
    | "snow"
    | "thunderstorm"
    | "clear-night"
    | "partly-cloudy-night";

export type EnvironmentSceneModel = {
    key: EnvironmentSceneKey;
    label: string;
};

export type EnvironmentHeroModel = {
    place: string;
    temperature: string;
    condition: string;
    feelsLike: string;
    updated: string;
    signal: string;
};

export type EnvironmentForecastItemModel = {
    label: string;
    value: string;
    detail: string;
    sceneKey: EnvironmentSceneKey;
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
    scene: EnvironmentSceneModel;
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