/* ==========================================================
   OUTFLO — ACCOUNT TYPES
   File: app/account/profile/(pages)/account/internal/account.types.ts
   Scope: Define account information page data and view model
   ========================================================== */

export type AccountPageData = {
    accountName: string;
    username: string | null;
    email: string;
    phone?: string | null;
    accountNumber: string;
    epochMs: number;
    memberSince: string;
};

export type AccountTile = {
    label: string;
    value: string;
    detail: string;
};

export type AccountActionTile = AccountTile & {
    href: string;
    actionLabel: "Add" | "Edit" | "Continue";
};

export type AccountMarkKind =
    | "person"
    | "handle"
    | "number"
    | "email"
    | "phone"
    | "time"
    | "status"
    | "verification";

export type AccountInfoRowData = AccountTile & {
    mark: AccountMarkKind;
};

export type AccountActionRowData = AccountActionTile & {
    mark: AccountMarkKind;
};

export type AccountViewModel = {
    personal: AccountActionRowData[];
    contact: AccountActionRowData[];
    system: AccountInfoRowData[];
};