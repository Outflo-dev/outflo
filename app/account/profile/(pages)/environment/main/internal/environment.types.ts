/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT TYPES
   File: app/account/profile/(pages)/environment/main/internal/environment.types.ts
   Scope: Define profile environment setup view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define environment category doorway rows
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentInfoRowMarkKind =
    | "environment"
    | "location"
    | "capture"
    | "sun"
    | "precipitation"
    | "weather"
    | "air"
    | "altitude"
    | "snapshot"
    | "receipt";

export type EnvironmentInfoRowData = {
    mark: EnvironmentInfoRowMarkKind;
    label: string;
    value: string;
    href?: string;
    actionLabel?: string;
};

export type EnvironmentViewModel = {
    participation: EnvironmentInfoRowData[];
    signals: EnvironmentInfoRowData[];
    records: EnvironmentInfoRowData[];
};