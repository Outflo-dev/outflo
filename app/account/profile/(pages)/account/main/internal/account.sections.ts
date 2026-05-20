/* ==========================================================
  OUTFLO — ACCOUNT MODEL
  File: app/account/profile/(pages)/account/main/internal/account.sections.ts
  Scope: Build account information view model
  Last Updated:
  - ms: 1779281968087
  - iso: 2026-05-20T12:59:28.087Z
  - note: normalize account model path and guard invalid epoch date
  ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { AccountPageData, AccountViewModel } from "./account.types";

/* ------------------------------
   Helpers
-------------------------------- */
function formatDate(value: string | number | null | undefined) {
    if (value === null || value === undefined || value === "") {
        return "Not set";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Not set";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
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
                value: "Coming soon",
                detail: "Phone support is coming soon.",
                href: "/account/profile/account/phone",
                actionLabel: "Soon",
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