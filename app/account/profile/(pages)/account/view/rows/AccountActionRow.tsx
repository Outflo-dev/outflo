"use client";

/* ==========================================================
   OUTFLO — ACCOUNT ACTION ROW
   File: app/account/profile/(pages)/account/view/rows/AccountActionRow.tsx
   Scope: Render one account editable/actionable row with pill affordance
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: use PillButtonFrame as visual affordance inside row link
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Link from "next/link";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import PillButtonFrame from "@/components/system/shell/buttons/types/pill/PillButtonFrame";

import type { AccountActionRowData } from "../../internal/account.types";
import AccountInfoRowMark from "./AccountInfoRowMark";

/* ------------------------------
   Types
-------------------------------- */
type AccountActionRowProps = {
    row: AccountActionRowData;
};

/* ------------------------------
   Constants
-------------------------------- */
const LINK_STYLE: CSSProperties = {
    minHeight: 78,
    display: "grid",
    gridTemplateColumns: "52px 1fr auto",
    alignItems: "center",
    columnGap: 20,
    textDecoration: "none",
    color: "inherit",
};

const ICON_STYLE: CSSProperties = {
    width: 34,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-primary)",
};

const TEXT_STYLE: CSSProperties = {
    minWidth: 0,
    display: "grid",
    rowGap: 5,
};

const LABEL_STYLE: CSSProperties = {
    color: "var(--text-primary)",
};

const VALUE_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
    overflowWrap: "anywhere",
};

const PILL_STYLE: CSSProperties = {
    minHeight: 34,
    gap: 10,
    padding: "0 13px 0 15px",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountActionRow({ row }: AccountActionRowProps) {
    const pillVariant = row.actionLabel === "Add" ? "soft" : "muted";

    return (
        <Link href={row.href} style={LINK_STYLE}>
            <div style={ICON_STYLE}>
                <AccountInfoRowMark mark={row.mark} />
            </div>

            <div style={TEXT_STYLE}>
                <Text as="h3" type="label" style={LABEL_STYLE}>
                    {row.label}
                </Text>

                <Text as="p" type="meta" style={VALUE_STYLE}>
                    {row.value}
                </Text>
            </div>

            <PillButtonFrame variant={pillVariant} style={PILL_STYLE}>
                <Text as="span" type="pill">
                    {row.actionLabel}
                </Text>

                <Chevron
                    direction="right"
                    color="currentColor"
                    strokeWidth={1.7}
                />
            </PillButtonFrame>
        </Link>
    );
}