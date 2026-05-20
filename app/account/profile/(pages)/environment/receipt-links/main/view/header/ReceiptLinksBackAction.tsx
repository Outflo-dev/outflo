"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECEIPT LINKS BACK ACTION
   File: app/account/profile/(pages)/environment/receipt-links/main/view/header/ReceiptLinksBackAction.tsx
   Scope: Render receipt links records return action
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add receipt links records return action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import TextButton from "@/components/system/shell/buttons/types/text/TextButton";

/* ------------------------------
   Types
-------------------------------- */
type ReceiptLinksBackActionProps = {
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const ACTION_STYLE: CSSProperties = {
    width: 44,
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ReceiptLinksBackAction({
    onBack,
}: ReceiptLinksBackActionProps) {
    return (
        <TextButton
            onClick={onBack}
            ariaLabel="Return to environment"
            title="Return to environment"
            style={ACTION_STYLE}
        >
            <Chevron
                direction="left"
                size="var(--chevron-size-md)"
                color="var(--text-primary)"
            />
        </TextButton>
    );
}