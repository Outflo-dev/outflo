"use client";

/* ==========================================================
   OUTFLO — PROFILE FLOWS BACK ACTION
   File: app/account/profile/(pages)/flows/main/header/FlowsBackAction.tsx
   Scope: Render flows drilldown return action
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add flows return action from account grammar
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
type FlowsBackActionProps = {
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
export default function FlowsBackAction({ onBack }: FlowsBackActionProps) {
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