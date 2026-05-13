/* ==========================================================
   OUTFLO — ACCOUNT NAME TYPES
   File: app/account/profile/(pages)/account/name/internal/account-name.types.ts
   Scope: Define account name drilldown data and save contracts
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add isolated account name drilldown types
   ========================================================== */

export type AccountNamePageData = {
    firstName: string;
    lastName: string | null;
};

export type SaveAccountNameInput = {
    firstName: string;
    lastName: string;
};

export type SaveAccountNameResult =
    | { ok: true }
    | {
        ok: false;
        status: number;
        message: string;
        diagnostics?: unknown;
    };