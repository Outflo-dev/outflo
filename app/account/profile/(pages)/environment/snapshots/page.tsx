/* ==========================================================
   OUTFLO — ENVIRONMENT SNAPSHOTS PAGE
   File: app/account/profile/(pages)/environment/snapshots/page.tsx
   Scope: Server route entry for environment snapshot records
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add environment snapshots records route packet
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import SnapshotsController from "./main/internal/SnapshotsController";

/* ------------------------------
   Page
-------------------------------- */
export default function Page() {
    return <SnapshotsController />;
}