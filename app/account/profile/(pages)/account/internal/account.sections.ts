/* ==========================================================
   OUTFLO — PROFILE ACCOUNT MODEL
   File: app/account/profile/(pages)/account/internal/account.sections.ts
   Scope: Derive account drilldown view model from account data
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: derive hero and tile account model
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { AccountPageData, AccountViewModel } from "./account.types";

/* ------------------------------
   Helpers
-------------------------------- */
function formatDate(value: string | number) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));
}

/* ------------------------------
   Model
-------------------------------- */
export function getAccountModel(data: AccountPageData): AccountViewModel {
    return {
        hero: {
            label: "Account number",
            value: data.accountNumber,
            detail: "Your stable Outflō account anchor.",
        },
        identity: [
            {
                label: "Account name",
                value: data.accountName,
                detail: "Visible profile identity.",
            },
            {
                label: "Username",
                value: data.username ?? "@outflo",
                detail: "Public profile handle.",
            },
        ],
        system: [
            {
                label: "Email",
                value: data.email,
                detail: "Authenticated access.",
            },
            {
                label: "Epoch",
                value: formatDate(data.epochMs),
                detail: "Begin anchor.",
            },
            {
                label: "Member since",
                value: formatDate(data.memberSince),
                detail: "Account creation.",
            },
            {
                label: "Status",
                value: "Active",
                detail: "Session verified.",
            },
        ],
    };
}