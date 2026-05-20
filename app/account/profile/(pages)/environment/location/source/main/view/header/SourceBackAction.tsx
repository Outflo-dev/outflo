"use client";

/* ==========================================================
   OUTFLO — LOCATION SOURCE BACK ACTION
   File: app/account/profile/(pages)/environment/location/source/main/view/header/SourceBackAction.tsx
   Scope: Render location source return action
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: add location source return action
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
type SourceBackActionProps = {
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
export default function SourceBackAction({ onBack }: SourceBackActionProps) {
    return (
        <TextButton
            onClick={onBack}
            ariaLabel="Return to location"
            title="Return to location"
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