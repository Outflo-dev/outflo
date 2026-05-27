// app/app/environment/main/view/header/EnvironmentBackAction.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT BACK ACTION
   File: app/app/environment/main/view/header/EnvironmentBackAction.tsx
   Scope: Render Environment return action
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: add Environment header back action
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
            ariaLabel="Return to systems"
            title="Return to systems"
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