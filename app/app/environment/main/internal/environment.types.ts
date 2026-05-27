// app/app/environment/main/internal/environment.types.ts
/* ==========================================================
   OUTFLO — ENVIRONMENT TYPES
   File: app/app/environment/main/internal/environment.types.ts
   Scope: Define Environment substrate display model contracts
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment substrate display types
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentSnapshot = Record<string, unknown>;

export type EnvironmentField = {
    label: string;
    value: string;
};

export type EnvironmentSectionModel = {
    title: string;
    fields: EnvironmentField[];
};

export type EnvironmentHeroModel = {
    place: string;
    temperature: string;
    condition: string;
    feelsLike: string;
    updated: string;
    signal: string;
    background: string;
};

export type EnvironmentViewModel = {
    hero: EnvironmentHeroModel;
    sections: EnvironmentSectionModel[];
    hasSnapshot: boolean;
};