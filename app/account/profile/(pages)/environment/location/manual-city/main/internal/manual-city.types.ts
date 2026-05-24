/* ==========================================================
   OUTFLO — MANUAL CITY TYPES
   File: app/account/profile/(pages)/environment/location/manual-city/main/internal/manual-city.types.ts
   Scope: Define manual city control view model contracts
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: add manual city control contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type ManualCityViewModel = {
    value: string;
    placeholder: string;
    currentLabel: string;
    currentValue: string;
    canSave: boolean;
};