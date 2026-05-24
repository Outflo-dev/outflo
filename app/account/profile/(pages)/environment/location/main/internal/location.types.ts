/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION TYPES
   File: app/account/profile/(pages)/environment/location/main/internal/location.types.ts
   Scope: Define location control view model contracts
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: rename manual city control model to active place
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
    activePlace: LocationControlDrillData | null;
    precision: LocationControlDrillData;
};
