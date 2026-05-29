// app/app/environment/main/view/header/internal/EnvironmentBackButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT BACK BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentBackButton.tsx
   Scope: Own Environment header back affordance
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract Environment back control ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

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
    const BUTTON_STYLE: CSSProperties = {
        width: 42,
        height: 42,
        display: "grid",
        placeItems: "center",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 999,
        background: "rgba(3,8,18,0.18)",
        color: "rgba(255,255,255,0.86)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.16)",
        WebkitTapHighlightColor: "transparent",
    };

    return (
        <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            style={BUTTON_STYLE}
        >
            <Chevron direction="left" />
        </button>
    );
}