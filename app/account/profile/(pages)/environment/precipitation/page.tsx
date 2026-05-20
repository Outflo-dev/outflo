/* ==========================================================
   OUTFLO — ENVIRONMENT PRECIPITATION PAGE
   File: app/account/profile/(pages)/environment/precipitation/page.tsx
   Scope: Server route entry for environment precipitation controls
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add precipitation control drilldown route packet
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import PrecipitationController from "./main/internal/PrecipitationController";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
    return <PrecipitationController />;
}