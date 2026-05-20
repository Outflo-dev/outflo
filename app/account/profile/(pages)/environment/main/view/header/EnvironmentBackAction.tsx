"use client";

/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT BACK ACTION
   File: app/account/profile/(pages)/environment/main/header/EnvironmentBackAction.tsx
   Scope: Render environment drilldown return action
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add environment return action from account grammar
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
type EnvironmentBackActionProps = {
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
export default function EnvironmentBackAction({
    onBack,
}: EnvironmentBackActionProps) {
    return (
        <TextButton
            onClick={onBack}
            ariaLabel="Return to flows"
            title="Return to flows"
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