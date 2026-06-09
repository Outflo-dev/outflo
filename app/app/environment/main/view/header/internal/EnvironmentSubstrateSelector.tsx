// app/app/environment/main/view/header/internal/EnvironmentSubstrateSelector.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SUBSTRATE SELECTOR
   File: app/app/environment/main/view/header/internal/EnvironmentSubstrateSelector.tsx
   Scope: Own Environment header substrate selector affordance
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: simplify selector pill to label-only affordance
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { GlassShell } from "@/components/system/shell/glass";
import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Styles
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    minHeight: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 18px",
    border: 0,
    borderRadius: 999,
    background: "transparent",
    color: "var(--text-primary)",
    font: "inherit",
    lineHeight: 1,
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
    WebkitTapHighlightColor: "transparent",
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,
    color: "currentColor",
    lineHeight: 1,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentSubstrateSelector() {
    return (
        <GlassShell
            tone="soft"
            shape="pill"
            padding="none"
            style={{ minHeight: 44 }}
        >
            <button
                type="button"
                aria-label="Select substrate"
                style={BUTTON_STYLE}
            >
                <Text as="span" type="label" style={LABEL_STYLE}>
                    Environment
                </Text>
            </button>
        </GlassShell>
    );
}