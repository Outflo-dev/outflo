"use client";

/* ==========================================================
   OUTFLO — ACCOUNT SYSTEM SECTION
   File: app/account/profile/(pages)/account/view/sections/system/AccountSystemSection.tsx
   Scope: Render account system read-only rows
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: render system rows directly from account model
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { AccountViewModel } from "../../../internal/account.types";
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
    fontWeight: "var(--font-weight-bold)",
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
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="display" style={SECTION_TITLE_STYLE}>
                System
            </Text>

            <div style={ROW_STACK_STYLE}>
                {model.system.map((row, index) => (
                    <div key={row.label}>
                        <AccountInfoRow row={row} />

                        {index < model.system.length - 1 ? (
                            <div style={DIVIDER_STYLE} />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
}