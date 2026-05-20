/* ==========================================================
   OUTFLO — ENVIRONMENT SNAPSHOTS MODEL
   File: app/account/profile/(pages)/environment/snapshots/main/internal/snapshots.sections.ts
   Scope: Build environment snapshot records view model
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: define placeholder snapshot records
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { SnapshotsViewModel } from "./snapshots.types";

/* ------------------------------
   Model
-------------------------------- */
export function getSnapshotsModel(): SnapshotsViewModel {
    return {
        records: [
            {
                label: "No snapshots yet",
                value: "Environment records will appear here after capture is enabled.",
                detail: "Empty",
            },
        ],
    };
}