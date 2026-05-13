/* ==========================================================
   OUTFLO — ACCOUNT PHONE PAGE
   File: app/account/profile/(pages)/account/phone/page.tsx
   Scope: Server route entry for account phone coming-soon drilldown
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add account phone future-system explainer route
   ========================================================== */

export const dynamic = "force-dynamic";

/* ------------------------------
   Imports
-------------------------------- */
import AccountPhoneController from "./internal/AccountPhoneController";

/* ------------------------------
   Component
-------------------------------- */
export default function Page() {
    return <AccountPhoneController />;
}