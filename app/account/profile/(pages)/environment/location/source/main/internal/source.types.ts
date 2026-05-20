/* ==========================================================
   OUTFLO — LOCATION SOURCE TYPES
   File: app/account/profile/(pages)/environment/location/source/main/internal/source.types.ts
   Scope: Define location source control view model contracts
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: include off source and disabled source option state
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type SourceOptionKind = "device" | "manual_city" | "off";

export type SourceOptionData = {
    label: string;
    value: string;
    selected: boolean;
    disabled: boolean;
    kind: SourceOptionKind;
};

export type SourceViewModel = {
    options: SourceOptionData[];
};