"use client";

/* ==========================================================
   OUTFLO — ACCOUNT INFO ROW
   File: app/account/profile/(pages)/account/view/rows/AccountInfoRow.tsx
   Scope: Render one account information row with mark, label, value, and detail
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: extract account row layout from AccountView
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import AccountEmailMark from "@/components/system/primitives/marks/account/AccountEmailMark";
import AccountHandleMark from "@/components/system/primitives/marks/account/AccountHandleMark";
import AccountNumberMark from "@/components/system/primitives/marks/account/AccountNumberMark";
import AccountPersonMark from "@/components/system/primitives/marks/account/AccountPersonMark";
import AccountStatusMark from "@/components/system/primitives/marks/account/AccountStatusMark";
import AccountTimeMark from "@/components/system/primitives/marks/account/AccountTimeMark";

import type {
    AccountInfoRowData,
    AccountMarkKind,
} from "../../internal/account.types";

/* ------------------------------
   Types
-------------------------------- */
type AccountInfoRowProps = {
    row: AccountInfoRowData;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROW_STYLE: CSSProperties = {
    minHeight: 78,
    display: "grid",
    gridTemplateColumns: "52px 1fr auto",
    alignItems: "center",
    columnGap: 20,
};

const ICON_STYLE: CSSProperties = {
    width: 34,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-primary)",
};

const ROW_TEXT_STYLE: CSSProperties = {
    minWidth: 0,
    display: "grid",
    rowGap: 5,
};

const ROW_LABEL_STYLE: CSSProperties = {
    color: "var(--text-primary)",
};

const ROW_VALUE_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
    overflowWrap: "anywhere",
};

const ROW_DETAIL_STYLE: CSSProperties = {
    maxWidth: 112,
    textAlign: "right",
    color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountInfoRow({ row }: AccountInfoRowProps) {
    return (
        <article style={ROW_STYLE}>
            <div style={ICON_STYLE}>
                <AccountRowMark mark={row.mark} />
            </div>

            <div style={ROW_TEXT_STYLE}>
                <Text as="h3" type="label" style={ROW_LABEL_STYLE}>
                    {row.label}
                </Text>

                <Text as="p" type="meta" style={ROW_VALUE_STYLE}>
                    {row.value}
                </Text>
            </div>

            {row.detail ? (
                <Text as="p" type="meta" style={ROW_DETAIL_STYLE}>
                    {row.detail}
                </Text>
            ) : null}
        </article>
    );
}

/* ------------------------------
   Row Mark
-------------------------------- */
function AccountRowMark({ mark }: { mark: AccountMarkKind }) {
    if (mark === "person") return <AccountPersonMark />;
    if (mark === "handle") return <AccountHandleMark />;
    if (mark === "number") return <AccountNumberMark />;
    if (mark === "email") return <AccountEmailMark />;
    if (mark === "time") return <AccountTimeMark />;

    return <AccountStatusMark />;
}