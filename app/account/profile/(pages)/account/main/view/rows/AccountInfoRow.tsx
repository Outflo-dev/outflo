"use client";

/* ==========================================================
   OUTFLO — ACCOUNT INFO ROW
   File: app/account/profile/(pages)/account/view/rows/AccountInfoRow.tsx
   Scope: Render one account information row through shared system row grammar
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: consume SystemRow and MarkFrame primitives
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import SystemRow from "@/components/system/surfaces/rows/SystemRow";

import type { AccountInfoRowData } from "../../internal/account.types";
import AccountInfoRowMark from "./AccountInfoRowMark";

/* ------------------------------
   Types
-------------------------------- */
type AccountInfoRowProps = {
    row: AccountInfoRowData;
    valueNode?: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountInfoRow({
    row,
    valueNode,
}: AccountInfoRowProps) {
    return (
        <SystemRow
            mark={
                <MarkFrame>
                    <AccountInfoRowMark mark={row.mark} />
                </MarkFrame>
            }
            label={row.label}
            value={valueNode ?? row.value}
            right={row.detail}
        />
    );
}