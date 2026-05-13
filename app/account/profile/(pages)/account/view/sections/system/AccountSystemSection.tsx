"use client";

/* ==========================================================
   OUTFLO — ACCOUNT SYSTEM SECTION
   File: app/account/profile/(pages)/account/view/sections/system/AccountSystemSection.tsx
   Scope: Render account system anchor section
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: extract system account section from AccountView
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
type AccountSystemSectionProps = {
    model: AccountViewModel;
};

/* ------------------------------
   Constants
-------------------------------- */
const SECTION_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 18,
};

const SECTION_TITLE_STYLE: CSSProperties = {
    fontSize: "var(--header-md)",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    color: "var(--text-primary)",
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
export default function AccountSystemSection({
    model,
}: AccountSystemSectionProps) {
    const rows: AccountInfoRowData[] = [
        {
            mark: "time",
            ...model.system[1],
        },
        {
            mark: "time",
            ...model.system[2],
        },
        {
            mark: "status",
            ...model.system[3],
        },
    ];

    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="display" style={SECTION_TITLE_STYLE}>
                System
            </Text>

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