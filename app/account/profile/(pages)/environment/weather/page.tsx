/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER PAGE
   File: app/account/profile/(pages)/environment/weather/page.tsx
   Scope: Server route entry for environment weather controls
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add weather control drilldown route packet
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import WeatherController from "./main/internal/WeatherController";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
    return <WeatherController />;
}