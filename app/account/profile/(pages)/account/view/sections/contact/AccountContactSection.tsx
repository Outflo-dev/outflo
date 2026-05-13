"use client";

/* ==========================================================
   OUTFLO — ACCOUNT CONTACT SECTION
   File: app/account/profile/(pages)/account/view/sections/contact/AccountContactSection.tsx
   Scope: Render account contact section
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: extract contact account section from AccountView
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type {
    AccountInfoRowData,
    AccountViewModel,
} from "../../../internal/account.types";
import AccountInfoRow from "../../rows/AccountInfoRow";

/* ------------------------------
   Types
-------------------------------- */
type AccountContactSectionProps = {
    model: AccountViewModel;
};

/* ------------------------------
   Constants
-------------------------------- */
const SECTION_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 18,
};

const SECTION_HEADER_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 10,
};

const SECTION_TITLE_STYLE: CSSProperties = {
    fontSize: "var(--header-md)",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    color: "var(--text-primary)",
};

const SECTION_COPY_STYLE: CSSProperties = {
    maxWidth: 540,
    color: "var(--text-secondary)",
};

const ROW_STACK_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountContactSection({
    model,
}: AccountContactSectionProps) {
    const rows: AccountInfoRowData[] = [
        {
            mark: "email",
            ...model.system[0],
        },
    ];

    return (
        <section style={SECTION_STYLE}>
            <div style={SECTION_HEADER_STYLE}>
                <Text as="h2" type="display" style={SECTION_TITLE_STYLE}>
                    Contact
                </Text>

                <Text as="p" type="label" style={SECTION_COPY_STYLE}>
                    Used for login and account access.
                </Text>
            </div>

            <div style={ROW_STACK_STYLE}>
                {rows.map((row) => (
                    <AccountInfoRow key={row.label} row={row} />
                ))}
            </div>
        </section>
    );
}