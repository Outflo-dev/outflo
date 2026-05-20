"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CAPTURE BACK ACTION
   File: app/account/profile/(pages)/environment/capture/main/view/header/CaptureBackAction.tsx
   Scope: Render capture controls return action
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add capture control return action
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
type CaptureBackActionProps = {
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
export default function CaptureBackAction({ onBack }: CaptureBackActionProps) {
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