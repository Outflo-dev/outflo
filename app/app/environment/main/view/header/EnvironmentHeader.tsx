// app/app/environment/main/view/header/EnvironmentHeader.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Render Environment page navigation and refresh affordance
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment substrate header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderProps = {
    onBack: () => void;
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 14,
};

const BUTTON_STYLE: CSSProperties = {
    border: "1px solid var(--border-subtle)",
    borderRadius: 999,
    padding: "9px 13px",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
};

const TITLE_STACK_STYLE: CSSProperties = {
    minWidth: 0,
    display: "grid",
    rowGap: 2,
};

const META_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeader({
    onBack,
    onRefresh,
    refreshing,
}: EnvironmentHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            <button type="button" style={BUTTON_STYLE} onClick={onBack}>
                Back
            </button>

            <div style={TITLE_STACK_STYLE}>
                <Text as="h1" type="title">
                    Environment
                </Text>

                <Text as="p" type="meta" style={META_STYLE}>
                    Current external truth
                </Text>
            </div>

            <button
                type="button"
                style={BUTTON_STYLE}
                disabled={refreshing}
                onClick={onRefresh}
            >
                {refreshing ? "Pulling" : "Refresh"}
            </button>
        </header>
    );
}