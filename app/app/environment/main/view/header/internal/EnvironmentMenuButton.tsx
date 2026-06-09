// app/app/environment/main/view/header/internal/EnvironmentMenuButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT MENU BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentMenuButton.tsx
   Scope: Own Environment header menu affordance inside header action group
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: remove local glass frame so header can own shared action pill
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentMenuButtonProps = {
    onOpenMenu?: () => void;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentMenuButton({
    onOpenMenu,
}: EnvironmentMenuButtonProps) {
    const BUTTON_STYLE: CSSProperties = {
        width: 40,
        height: 40,
        display: "grid",
        placeItems: "center",
        padding: 0,
        border: "none",
        borderRadius: 999,
        background: "transparent",
        color: "var(--text-primary)",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
    };

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

    return (
        <button
            type="button"
            aria-label="Open Environment menu"
            onClick={onOpenMenu}
            style={BUTTON_STYLE}
        >
            <span aria-hidden="true" style={DOTS_STYLE}>
                <span style={DOT_STYLE} />
                <span style={DOT_STYLE} />
                <span style={DOT_STYLE} />
            </span>
        </button>
    );
}