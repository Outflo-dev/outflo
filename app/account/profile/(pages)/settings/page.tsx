/* ==========================================================
   OUTFLO — PROFILE SETTINGS PAGE
   File: app/account/profile/(pages)/settings/page.tsx
   Scope: Render profile-owned settings route
   Last Updated:
   - ms: 1778208600000
   - iso: 2026-05-08T02:50:00.000Z
   - note: add settings route for profile menu language
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
            title="Settings"
            description="Manage app preferences, display controls, location behavior, and notification settings from this page."
        />
    );
}