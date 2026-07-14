/* ==========================================================
   OUTFLO — ENVIRONMENT TYPES
   File: app/app/environment/main/internal/environment.types.ts
   Scope: Define Environment substrate landing page display contracts
   Last Updated:
   - iso: 2026-07-14
   - note: add Environment-facing Engagement projection
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentSnapshot =
    Record<string, unknown>;

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

export type EnvironmentAirQualityStatus =
    | "good"
    | "moderate"
    | "elevated"
    | "unknown";

export type EnvironmentEngagementMode =
    | "precise"
    | "capture";

export type EnvironmentEngagementModel = {
    enabled: boolean;
    selectedMode:
    EnvironmentEngagementMode | null;
};

export type EnvironmentAirTileModel = {
    title: string;
    eyebrow: string;
    aqi: string;
    status: EnvironmentAirQualityStatus;
    statusLabel: string;
    updated: string;
};

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

export type EnvironmentLocationModel = {
    latitude?: number;
    longitude?: number;
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
    location: EnvironmentLocationModel;
    engagement: EnvironmentEngagementModel;
    tiles: EnvironmentTilesModel;
    forecast: EnvironmentForecastModel;
    summary: EnvironmentSummarySectionModel;
    record: EnvironmentRecordModel;
    hasSnapshot: boolean;
};

export type EnvironmentTilesModel = {
    air: EnvironmentAirTileModel;
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