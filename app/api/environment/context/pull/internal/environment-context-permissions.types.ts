/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT PERMISSIONS TYPES
   File: app/api/environment/context/pull/internal/environment-context-permissions.types.ts
   Scope: Own Environment context persistence participation types
   Last Updated:
   - ms: 1781741862076
   - iso: 2026-06-18T00:17:42.076Z
   - note: split Environment runtime ownership while preserving behavior
   ========================================================== */

export type EnvironmentContextPersistenceParticipation = {
    weather: boolean;
    sun?: boolean;
    airQuality?: boolean;
    location?: boolean;
    altitude?: boolean;
    providerMetadata?: boolean;
};