/* ==========================================================
   OUTFLO — ENVIRONMENT CAPTURE TYPES
   File: app/account/profile/(pages)/environment/capture/main/internal/capture.types.ts
   Scope: Define capture control view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add capture control row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type CaptureControlRowData = {
    label: string;
    value: string;
    enabled: boolean;
};

export type CaptureViewModel = {
    controls: CaptureControlRowData[];
};