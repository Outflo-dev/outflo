/* ==========================================================
   OUTFLO — PROFILE FLOWS TYPES
   File: app/account/profile/(pages)/flows/main/internal/flows.types.ts
   Scope: Define profile flows view model contracts
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add account-derived flows row contracts
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type FlowsInfoRowMarkKind =
    | "money"
    | "time"
    | "environment"
    | "ingest";

export type FlowsInfoRowData = {
    mark: FlowsInfoRowMarkKind;
    label: string;
    value: string;
    href?: string;
    actionLabel?: string;
};

export type FlowsViewModel = {
    systems: FlowsInfoRowData[];
};