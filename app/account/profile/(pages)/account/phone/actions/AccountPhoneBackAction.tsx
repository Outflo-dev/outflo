"use client";

/* ==========================================================
   OUTFLO — ACCOUNT PHONE BACK ACTION
   File: app/account/profile/(pages)/account/phone/header/AccountPhoneBackAction.tsx
   Scope: Render account phone drilldown return action
   Last Updated:
   - ms: 1778701972789
   - iso: 2026-05-13T19:52:52.789Z
   - note: add phone-owned chevron return action
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
type AccountPhoneBackActionProps = {
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
export default function AccountPhoneBackAction({
    onBack,
}: AccountPhoneBackActionProps) {
    return (
        <TextButton
            onClick={onBack}
            ariaLabel="Return to account"
            title="Return to account"
            style={ACTION_STYLE}
        >
            <Chevron
                direction="left"
                size="var(--chevron-size-md)"
                color="var(--text-primary)"
                strokeWidth={1.8}
            />
        </TextButton>
    );
}