/* ==========================================================
   OUTFLO — ACCOUNT MODEL
   File: app/account/profile/(pages)/account/internal/account.sections.ts
   Scope: Build account information view model
   ========================================================== */

import type { AccountPageData, AccountViewModel } from "./account.types";

function formatDate(value: string | number) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));
}

export function getAccountModel(data: AccountPageData): AccountViewModel {
    return {
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
                label: "Username",
                value: data.username ?? "@outflo",
                detail: "Public profile handle.",
                href: "/account/profile/account/username",
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