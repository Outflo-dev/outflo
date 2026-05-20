"use client";

/* ==========================================================
   OUTFLO — ACCOUNT ACTION ROW
   File: app/account/profile/(pages)/account/view/rows/AccountActionRow.tsx
   Scope: Render one account actionable row through shared system row grammar
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: consume SystemRow, MarkFrame, and menu Chevron role
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import PillButtonFrame from "@/components/system/shell/buttons/types/pill/PillButtonFrame";
import SystemRow from "@/components/system/surfaces/rows/SystemRow";

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
        <SystemRow
            href={row.href}
            mark={
                <MarkFrame>
                    <AccountInfoRowMark mark={row.mark} />
                </MarkFrame>
            }
            label={row.label}
            value={row.value}
            right={
                <PillButtonFrame variant={pillVariant} style={PILL_STYLE}>
                    <Text as="span" type="pill">
                        {row.actionLabel}
                    </Text>

                    <Chevron
                        direction="right"
                        role="menu"
                        color="currentColor"
                    />
                </PillButtonFrame>
            }
        />
    );
}