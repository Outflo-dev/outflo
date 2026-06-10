// app/app/environment/main/view/header/internal/EnvironmentMenuButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT MENU BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentMenuButton.tsx
   Scope: Own Environment header menu affordance inside header action group
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: consume system icon button primitive inside shared header pill
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import IconButton from "@/components/system/shell/buttons/types/icon/IconButton";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentMenuButtonProps = {
    onOpenMenu?: () => void;
};

/* ------------------------------
   Styles
-------------------------------- */
const DOTS_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
};

const DOT_STYLE: CSSProperties = {
    width: 3.5,
    height: 3.5,
    borderRadius: 999,
    background: "currentColor",
    opacity: 0.86,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentMenuButton({
    onOpenMenu,
}: EnvironmentMenuButtonProps) {
    return (
        <IconButton
            ariaLabel="Open Environment menu"
            onClick={onOpenMenu}
            size="lg"
            tone="plain"
        >
            <span aria-hidden="true" style={DOTS_STYLE}>
                <span style={DOT_STYLE} />
                <span style={DOT_STYLE} />
                <span style={DOT_STYLE} />
            </span>
        </IconButton>
    );
}