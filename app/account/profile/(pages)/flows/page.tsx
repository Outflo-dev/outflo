/* ==========================================================
   OUTFLO — PROFILE FLOWS PAGE
   File: app/account/profile/(pages)/flows/page.tsx
   Scope: Server route entry for profile flows surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: normalize flows route packet architecture
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import FlowsController from "./main/internal/FlowsController";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
   return <FlowsController />;
}