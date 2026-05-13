"use client";

/* ==========================================================
   OUTFLO — PROFILE ACCOUNT BACK ACTION
   File: app/account/profile/(pages)/account/actions/AccountBackAction.tsx
   Scope: Render account drilldown return action
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: replace pill back action with clean account-style arrow action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";

/* ------------------------------
   Types
-------------------------------- */
type AccountBackActionProps = {
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    width: 44,
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: 999,
    background: "transparent",
    color: "var(--text-primary)",
    padding: 0,
    cursor: "pointer",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AccountBackAction({
    onBack,
}: AccountBackActionProps) {
    return (
        <button
            type="button"
            aria-label="Return to profile"
            onClick={onBack}
            style={BUTTON_STYLE}
        >
            <Chevron direction="left" />
        </button>
    );
}