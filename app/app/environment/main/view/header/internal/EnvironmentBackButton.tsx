// app/app/environment/main/view/header/internal/EnvironmentBackButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT BACK BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentBackButton.tsx
   Scope: Own Environment header back affordance
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: consume system icon button and chevron primitives
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentBackButtonProps = {
    onBack: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentBackButton({
    onBack,
}: EnvironmentBackButtonProps) {
    return (
        <IconButton
            ariaLabel="Back"
            onClick={onBack}
            size="lg"
            tone="glass"
        >
            <Chevron
                direction="left"
                role="nav"
                size="var(--chevron-size-lg)"
                strokeWidth="var(--chevron-stroke-menu)"
                color="currentColor"
                opacity={0.86}
            />
        </IconButton>
    );
}