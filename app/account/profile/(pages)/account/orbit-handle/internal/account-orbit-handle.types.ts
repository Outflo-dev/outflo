/* ==========================================================
   OUTFLO — ACCOUNT ORBIT HANDLE TYPES
   File: app/account/profile/(pages)/account/orbithandle/internal/account-orbit-handle.types.ts
   Scope: Define account Orbit handle drilldown data and save contracts
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add isolated Orbit handle drilldown types
   ========================================================== */

export type AccountOrbitHandlePageData = {
    orbitHandle: string;
};

export type SaveAccountOrbitHandleInput = {
    orbitHandle: string;
};

export type SaveAccountOrbitHandleResult =
    | { ok: true }
    | {
        ok: false;
        status: number;
        message: string;
        diagnostics?: unknown;
    };