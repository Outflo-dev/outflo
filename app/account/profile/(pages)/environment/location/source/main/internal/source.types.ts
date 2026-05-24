/* ==========================================================
   OUTFLO — LOCATION SOURCE TYPES
   File: app/account/profile/(pages)/environment/location/source/main/internal/source.types.ts
   Scope: Define location source choice view model contracts
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: recast source controls as off/device/city choices
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type SourceOptionKind = "off" | "device" | "manual_city";

export type SourceOptionData = {
    label: string;
    value: string;
    selected: boolean;
    disabled: boolean;
    kind: SourceOptionKind;
    actionLabel: string;
};

export type SourceViewModel = {
    options: SourceOptionData[];
};