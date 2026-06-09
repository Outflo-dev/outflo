// app/app/environment/main/view/header/internal/EnvironmentBackButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT BACK BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentBackButton.tsx
   Scope: Own Environment header back affordance
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: refine back control using glass shell and chevron primitive tokens
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { GlassShell } from "@/components/system/shell/glass";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentBackButtonProps = {
    onBack: () => void;
};

/* ------------------------------
   Styles
-------------------------------- */
const SHELL_STYLE: CSSProperties = {
    width: 44,
    height: 44,
};

const BUTTON_STYLE: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    padding: 0,
    border: "none",
    borderRadius: 999,
    background: "transparent",
    color: "var(--text-primary)",
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
    WebkitTapHighlightColor: "transparent",
};

const CHEVRON_WRAP_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translateX(1px)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentBackButton({
    onBack,
}: EnvironmentBackButtonProps) {
    return (
        <GlassShell
            tone="soft"
            shape="pill"
            padding="none"
            style={SHELL_STYLE}
        >
            <button
                type="button"
                aria-label="Back"
                onClick={onBack}
                style={BUTTON_STYLE}
            >
                <span aria-hidden="true" style={CHEVRON_WRAP_STYLE}>
                    <Chevron
                        direction="left"
                        role="nav"
                        size="var(--chevron-size-lg)"
                        strokeWidth="var(--chevron-stroke-menu)"
                        color="currentColor"
                        opacity={0.86}
                    />
                </span>
            </button>
        </GlassShell>
    );
}