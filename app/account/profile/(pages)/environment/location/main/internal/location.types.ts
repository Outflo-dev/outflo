/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION TYPES
   File: app/account/profile/(pages)/environment/location/main/internal/location.types.ts
   Scope: Define location control view model contracts
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: align location model with persisted environment preferences and drilldown controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ProfileEnvironmentPreferences } from "../../../main/internal/profile-environment.client";

/* ------------------------------
   Types
-------------------------------- */
export type LocationMasterData = {
    label: string;
    value: string;
    enabled: boolean;
};

export type LocationControlDrillData = {
    label: string;
    value: string;
    actionLabel: string;
    href: string | null;
    disabled: boolean;
};

export type LocationViewModel = {
    preferences: ProfileEnvironmentPreferences;
    master: LocationMasterData;
    source: LocationControlDrillData;
    manualCity: LocationControlDrillData;
    precision: LocationControlDrillData;
};