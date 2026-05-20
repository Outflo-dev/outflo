"use client";

/* ==========================================================
   OUTFLO — RECEIPT LINK RECORD ROW
   File: app/account/profile/(pages)/environment/receipt-links/main/view/rows/ReceiptLinkRecordRow.tsx
   Scope: Render one receipt-linked environment record row
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add receipt link record row
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { ReceiptLinkRecordRowData } from "../../internal/receipt-links.types";

/* ------------------------------
   Types
-------------------------------- */
type ReceiptLinkRecordRowProps = {
    row: ReceiptLinkRecordRowData;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROW_STYLE: CSSProperties = {
    minHeight: 78,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 18,
};

const TEXT_STACK_STYLE: CSSProperties = {
    minWidth: 0,
    display: "grid",
    rowGap: 5,
};

const VALUE_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
};

const DETAIL_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ReceiptLinkRecordRow({
    row,
    style,
}: ReceiptLinkRecordRowProps) {
    return (
        <div style={{ ...ROW_STYLE, ...style }}>
            <div style={TEXT_STACK_STYLE}>
                <Text as="h3" type="label">
                    {row.label}
                </Text>

                <Text as="p" type="meta" style={VALUE_STYLE}>
                    {row.value}
                </Text>
            </div>

            <Text as="span" type="meta" style={DETAIL_STYLE}>
                {row.detail}
            </Text>
        </div>
    );
}