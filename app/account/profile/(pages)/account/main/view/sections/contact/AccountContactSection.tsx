"use client";

/* ==========================================================
   OUTFLO — ACCOUNT CONTACT SECTION
   File: app/account/profile/(pages)/account/view/sections/contact/AccountContactSection.tsx
   Scope: Render account contact action rows
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: render contact rows from account model as actionable edit/add rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { AccountViewModel } from "../../../internal/account.types";
import AccountActionRow from "../../rows/AccountActionRow";

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
    fontWeight: "var(--font-weight-bold)",
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

const DIVIDER_STYLE: CSSProperties = {
    height: 1,
    background: "var(--border-soft)",
    opacity: 0.82,
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountContactSection({
    model,
}: AccountContactSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <div style={SECTION_HEADER_STYLE}>
                <Text as="h2" type="display" style={SECTION_TITLE_STYLE}>
                    Contact
                </Text>

                <Text as="p" type="label" style={SECTION_COPY_STYLE}>
                    Used for login, recovery, and important account activity.
                </Text>
            </div>

            <div style={ROW_STACK_STYLE}>
                {model.contact.map((row, index) => (
                    <div key={row.label}>
                        <AccountActionRow row={row} />

                        {index < model.contact.length - 1 ? (
                            <div style={DIVIDER_STYLE} />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
}