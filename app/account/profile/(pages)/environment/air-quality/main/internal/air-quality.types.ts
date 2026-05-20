/* ==========================================================
   OUTFLO — ENVIRONMENT AIR QUALITY TYPES
   File: app/account/profile/(pages)/environment/air-quality/main/internal/air-quality.types.ts
   Scope: Define air quality control view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add air quality control row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type AirQualityControlRowData = {
    label: string;
    value: string;
    enabled: boolean;
};

export type AirQualityViewModel = {
    controls: AirQualityControlRowData[];
};