/* ==========================================================
   OUTFLO — ENVIRONMENT AIR QUALITY PAGE
   File: app/account/profile/(pages)/environment/air-quality/page.tsx
   Scope: Server route entry for environment air quality controls
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add air quality control drilldown route packet
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import AirQualityController from "./main/internal/AirQualityController";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
    return <AirQualityController />;
}
