/* ==========================================================
   OUTFLO — PROFILE FLOWS PAGE
   File: app/account/profile/(pages)/flows/page.tsx
   Scope: Render profile-owned doorway to user-facing flows
   Last Updated:
   - ms: 1778208600000
   - iso: 2026-05-08T02:50:00.000Z
   - note: add flows route for profile menu language
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import DrilldownPage from "../patterns/DrilldownPage";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
    return (
        <DrilldownPage
            title="Flows"
            description="Access Time / Place, Money, Environment, and Receipts from this page."
        />
    );
}