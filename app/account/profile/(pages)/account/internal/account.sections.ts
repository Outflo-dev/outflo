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
                mark: "verification",
                label: "Identity verification",
                value: "Not started",
                detail: "Confirm your account identity.",
                href: "/account/profile/account/verification",
                actionLabel: "Continue",
            },
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
                detail: "Used for recovery and future text alerts.",
                href: "/account/profile/account/phone",
                actionLabel: data.phone ? "Edit" : "Add",
            },
            {
                mark: "email",
                label: "Email",
                value: data.email,
                detail: "Used for login and account access.",
                href: "/account/profile/account/email",
                actionLabel: "Edit",
            },
        ],

        system: [
            {
                mark: "number",
                label: "Account number",
                value: data.accountNumber,
                detail: "Stable Outflō account anchor.",
            },
            {
                mark: "time",
                label: "Begin anchor",
                value: formatDate(data.epochMs),
                detail: "Your Outflō start point.",
            },
            {
                mark: "time",
                label: "Member since",
                value: formatDate(data.memberSince),
                detail: "Account creation.",
            },
            {
                mark: "status",
                label: "Status",
                value: "Active",
                detail: "Session verified.",
            },
        ],
    };
}