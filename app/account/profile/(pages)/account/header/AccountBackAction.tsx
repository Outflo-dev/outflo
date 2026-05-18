"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT BACK ACTION
   File: app/account/profile/(pages)/account/header/AccountBackAction.tsx
   Scope: Render account drilldown return action
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: compose TextButton and Chevron primitives for account return action
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
type AccountBackActionProps = {
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
export default function AccountBackAction({ onBack }: AccountBackActionProps) {
    return (
        <TextButton
            onClick={onBack}
            ariaLabel="Return to profile"
            title="Return to profile"
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