/* ==========================================================
   OUTFLO — PROFILE ACCOUNT TYPES
   File: app/account/profile/(pages)/account/internal/account.types.ts
   Scope: Define account drilldown data and view contracts
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: add account row mark contract for extracted account layout
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type AccountPageData = {
    accountName: string;
    username: string | null;
    email: string;
    accountNumber: string;
    epochMs: number;
    memberSince: string;
};

export type AccountHero = {
    label: string;
    value: string;
    detail: string;
};

export type AccountTile = {
    label: string;
    value: string;
    detail: string;
};

export type AccountViewModel = {
    hero: AccountHero;
    identity: AccountTile[];
    system: AccountTile[];
};

export type AccountMarkKind =
    | "person"
    | "handle"
    | "number"
    | "email"
    | "time"
    | "status";

export type AccountInfoRowData = AccountTile & {
    mark: AccountMarkKind;
};