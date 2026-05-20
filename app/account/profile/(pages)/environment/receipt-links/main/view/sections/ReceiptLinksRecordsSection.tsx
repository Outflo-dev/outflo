"use client";

/* ==========================================================
   OUTFLO — RECEIPT LINKS RECORDS SECTION
   File: app/account/profile/(pages)/environment/receipt-links/main/view/sections/ReceiptLinksRecordsSection.tsx
   Scope: Render receipt-linked environment record rows
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add receipt links records section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { ReceiptLinksViewModel } from "../../internal/receipt-links.types";
import ReceiptLinkRecordRow from "../rows/ReceiptLinkRecordRow";

/* ------------------------------
   Types
-------------------------------- */
type ReceiptLinksRecordsSectionProps = {
    model: ReceiptLinksViewModel;
};

/* ------------------------------
   Constants
-------------------------------- */
const SECTION_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 14,
};

const TITLE_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
};

const ROW_DIVIDER_STYLE: CSSProperties = {
    borderBottom: "1px solid var(--border-soft)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ReceiptLinksRecordsSection({
    model,
}: ReceiptLinksRecordsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Records
            </Text>

            <div>
                {model.records.map((row, index) => (
                    <ReceiptLinkRecordRow
                        key={row.label}
                        row={row}
                        style={
                            index < model.records.length - 1
                                ? ROW_DIVIDER_STYLE
                                : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
}