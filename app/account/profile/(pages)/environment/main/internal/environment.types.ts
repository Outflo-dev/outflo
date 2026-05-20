/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT TYPES
   File: app/account/profile/(pages)/environment/main/internal/environment.types.ts
   Scope: Define profile environment setup view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add environment activation row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentInfoRowMarkKind =
    | "location"
    | "weather"
    | "capture"
    | "runtime"
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
    runtime: EnvironmentInfoRowData[];
    records: EnvironmentInfoRowData[];
};