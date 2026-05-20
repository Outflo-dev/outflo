/* ==========================================================
   OUTFLO — ENVIRONMENT SUN TYPES
   File: app/account/profile/(pages)/environment/sun/main/internal/sun.types.ts
   Scope: Define sun control view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add sun control row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type SunControlRowData = {
    label: string;
    value: string;
    enabled: boolean;
};

export type SunViewModel = {
    controls: SunControlRowData[];
};