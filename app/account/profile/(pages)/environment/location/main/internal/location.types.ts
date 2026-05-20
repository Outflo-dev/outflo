/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION TYPES
   File: app/account/profile/(pages)/environment/location/main/internal/location.types.ts
   Scope: Define location control view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add location control row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type LocationControlRowData = {
    label: string;
    value: string;
    enabled: boolean;
};

export type LocationViewModel = {
    controls: LocationControlRowData[];
};