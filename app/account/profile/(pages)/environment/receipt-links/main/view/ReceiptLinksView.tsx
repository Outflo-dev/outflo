"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECEIPT LINKS VIEW
   File: app/account/profile/(pages)/environment/receipt-links/main/view/ReceiptLinksView.tsx
   Scope: Compose receipt-linked environment records surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add receipt links records view with header footer packet shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { ReceiptLinksViewModel } from "../internal/receipt-links.types";
import ReceiptLinksHeader from "./header/ReceiptLinksHeader";
import ReceiptLinksRecordsSection from "./sections/ReceiptLinksRecordsSection";
import ReceiptLinksFooter from "./footer/ReceiptLinksFooter";

/* ------------------------------
   Types
-------------------------------- */
type ReceiptLinksViewProps = {
    model: ReceiptLinksViewModel;
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 38,
};

/* ------------------------------
   Component
-------------------------------- */
export default function ReceiptLinksView({
    model,
    onBack,
}: ReceiptLinksViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <ReceiptLinksHeader onBack={onBack} />

            <ReceiptLinksRecordsSection model={model} />

            <ReceiptLinksFooter />
        </section>
    );
}
