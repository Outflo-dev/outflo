"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT VIEW
   File: app/account/profile/(pages)/account/main/view/AccountView.tsx
   Scope: Compose account information surface sections
   Last Updated:
   - ms: 1779281968087
   - iso: 2026-05-20T12:59:28.087Z
   - note: normalize account view ownership with header and footer
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { AccountViewModel } from "../internal/account.types";
import AccountHeader from "./header/AccountHeader";
import AccountContactSection from "./sections/contact/AccountContactSection";
import AccountPersonalSection from "./sections/personal/AccountPersonalSection";
import AccountSystemSection from "./sections/system/AccountSystemSection";
import AccountFooter from "./footer/AccountFooter";

/* ------------------------------
   Types
-------------------------------- */
type AccountViewProps = {
    model: AccountViewModel;
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 38,
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountView({
    model,
    onBack,
}: AccountViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <AccountHeader onBack={onBack} />

            <AccountPersonalSection model={model} />

            <AccountContactSection model={model} />

            <AccountSystemSection model={model} />

            <AccountFooter />
        </section>
    );
}