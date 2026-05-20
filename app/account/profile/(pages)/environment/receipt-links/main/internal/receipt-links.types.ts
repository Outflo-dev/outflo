/* ==========================================================
   OUTFLO — ENVIRONMENT RECEIPT LINKS TYPES
   File: app/account/profile/(pages)/environment/receipt-links/main/internal/receipt-links.types.ts
   Scope: Define environment receipt links view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add receipt links records contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type ReceiptLinkRecordRowData = {
    label: string;
    value: string;
    detail: string;
};

export type ReceiptLinksViewModel = {
    records: ReceiptLinkRecordRowData[];
};