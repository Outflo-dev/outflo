"use client";

/* ==========================================================
   OUTFLO — ACCOUNT PERSONAL SECTION
   File: app/account/profile/(pages)/account/view/sections/personal/AccountPersonalSection.tsx
   Scope: Render account personal identity section
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
export default function AccountPersonalSection({
    model,
}: AccountPersonalSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <div style={SECTION_HEADER_STYLE}>
                <Text as="h2" type="display" style={SECTION_TITLE_STYLE}>
                    Personal
                </Text>

                <Text as="p" type="label" style={SECTION_COPY_STYLE}>
                    Details that identify how Outflō recognizes you.
                </Text>
            </div>

            <div style={ROW_STACK_STYLE}>
                {model.personal.map((row, index) => (
                    <div key={row.label}>
                        <AccountActionRow row={row} />

                        {index < model.personal.length - 1 ? (
                            <div style={DIVIDER_STYLE} />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
}