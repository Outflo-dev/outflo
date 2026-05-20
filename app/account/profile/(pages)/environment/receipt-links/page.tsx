/* ==========================================================
   OUTFLO — ENVIRONMENT RECEIPT LINKS PAGE
   File: app/account/profile/(pages)/environment/receipt-links/page.tsx
   Scope: Server route entry for environment receipt-linked records
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add environment receipt links records route packet
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ReceiptLinksController from "./main/internal/ReceiptLinksController";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
    return <ReceiptLinksController />;
}