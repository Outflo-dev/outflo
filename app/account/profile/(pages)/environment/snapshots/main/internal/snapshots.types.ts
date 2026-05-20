/* ==========================================================
   OUTFLO — ENVIRONMENT SNAPSHOTS TYPES
   File: app/account/profile/(pages)/environment/snapshots/main/internal/snapshots.types.ts
   Scope: Define environment snapshot records view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add snapshots records contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type SnapshotRecordRowData = {
    label: string;
    value: string;
    detail: string;
};

export type SnapshotsViewModel = {
    records: SnapshotRecordRowData[];
};