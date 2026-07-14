/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT PAGE
   File: app/account/profile/(pages)/environment/capture/page.tsx
   Scope: Server route entry for Environment engagement controls
   Last Updated:
   - iso: 2026-07-13
   - note: surface Engagement while the legacy capture route remains temporarily
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import CaptureController from "./main/internal/CaptureController";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
   return <CaptureController />;
}