/* ==========================================================
   OUTFLO — ENVIRONMENT PRECIPITATION TYPES
   File: app/account/profile/(pages)/environment/precipitation/main/internal/precipitation.types.ts
   Scope: Define precipitation control view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add precipitation control row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type PrecipitationControlRowData = {
    label: string;
    value: string;
    enabled: boolean;
};

export type PrecipitationViewModel = {
    controls: PrecipitationControlRowData[];
};