"use client";

/* ==========================================================
   OUTFLO — ACCOUNT PERSONAL SECTION
   File: app/account/profile/(pages)/account/view/sections/personal/AccountPersonalSection.tsx
   Scope: Render account personal identity section
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: extract personal account section from AccountView
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
type AccountPersonalSectionProps = {
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

const DIVIDER_STYLE: CSSProperties = {
    height: 1,
    background: "var(--border-soft)",
    opacity: 0.82,
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountPersonalSection({
    model,
}: AccountPersonalSectionProps) {
    const rows: AccountInfoRowData[] = [
        {
            mark: "person",
            ...model.identity[0],
        },
        {
            mark: "handle",
            ...model.identity[1],
        },
        {
            mark: "number",
            ...model.hero,
        },
    ];

    return (
        <section style={SECTION_STYLE}>
            <div style={SECTION_HEADER_STYLE}>
                <Text as="h2" type="display" style={SECTION_TITLE_STYLE}>
                    Personal
                </Text>

                <Text as="p" type="label" style={SECTION_COPY_STYLE}>
                    These details identify your account inside Outflō.
                </Text>
            </div>

            <div style={ROW_STACK_STYLE}>
                {rows.map((row, index) => (
                    <div key={row.label}>
                        <AccountInfoRow row={row} />

                        {index < rows.length - 1 ? <div style={DIVIDER_STYLE} /> : null}
                    </div>
                ))}
            </div>
        </section>
    );
}