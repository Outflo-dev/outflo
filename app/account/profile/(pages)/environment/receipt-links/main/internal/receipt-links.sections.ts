/* ==========================================================
   OUTFLO — ENVIRONMENT RECEIPT LINKS MODEL
   File: app/account/profile/(pages)/environment/receipt-links/main/internal/receipt-links.sections.ts
   Scope: Build environment receipt links records view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define placeholder receipt-linked environment records
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReceiptLinksViewModel } from "./receipt-links.types";

/* ------------------------------
   Model
-------------------------------- */
export function getReceiptLinksModel(): ReceiptLinksViewModel {
    return {
        records: [
            {
                label: "No receipt links yet",
                value: "Receipt-linked environment context will appear here after receipts and environment records connect.",
                detail: "Empty",
            },
        ],
    };
}