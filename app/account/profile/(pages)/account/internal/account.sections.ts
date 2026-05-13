/* ==========================================================
  OUTFLO — ACCOUNT MODEL
  File: app/account/profile/(pages)/account/internal/account.sections.ts
  Scope: Build account information view model
  Last Updated:
  - ms: 1778701972789
  - iso: 2026-05-13T19:52:52.789Z
  - note: rename username row to Orbit handle and route to isolated handle drilldown
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
        epochMs: data.epochMs,
        personal: [
            {
                mark: "person",
                label: "Account name",
                value: data.accountName,
                detail: "Visible profile identity.",
                href: "/account/profile/account/name",
                actionLabel: "Edit",
            },
            {
                mark: "handle",
                label: "Orbit handle",
                value: data.username ?? "Set handle",
                detail: "Required Outflō identity handle.",
                href: "/account/profile/account/orbit-handle",
                actionLabel: "Edit",
            },
        ],

        contact: [
            {
                mark: "phone",
                label: "Phone",
                value: data.phone ?? "Not added",
                detail: "Recovery and future text alerts.",
                href: "/account/profile/account/phone",
                actionLabel: data.phone ? "Edit" : "Add",
            },
            {
                mark: "email",
                label: "Email",
                value: data.email,
                detail: "Login and account access.",
                href: "/account/profile/account/email",
                actionLabel: "Edit",
            },
        ],

        system: [
            {
                mark: "number",
                label: "Account number",
                value: data.accountNumber,
                detail: "",
            },
            {
                mark: "time",
                label: "Outflō time",
                value: "Running soon",
                detail: "",
            },
            {
                mark: "time",
                label: "Begin anchor",
                value: formatDate(data.epochMs),
                detail: "",
            },
        ],

        systemActions: [
            {
                mark: "status",
                label: "Status",
                value: "Not verified",
                detail: "Verification unlocks higher-trust systems.",
                href: "/account/profile/account/verification",
                actionLabel: "Verify",
            },
        ],
    };
}