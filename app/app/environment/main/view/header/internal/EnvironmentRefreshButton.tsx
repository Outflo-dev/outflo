// app/app/environment/main/view/header/internal/EnvironmentRefreshButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentRefreshButton.tsx
   Scope: Own Environment refresh button visual and interaction
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract Environment refresh button ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRefreshButtonProps = {
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRefreshButton({
    onRefresh,
    refreshing,
}: EnvironmentRefreshButtonProps) {
    const BUTTON_STYLE: CSSProperties = {
        minHeight: 38,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "0 15px",
        border: "1px solid var(--border-soft)",
        borderRadius: 999,
        background: "var(--surface-soft)",
        color: "var(--text-primary)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
        font: "inherit",
        WebkitTapHighlightColor: "transparent",
    };

    const ICON_STYLE: CSSProperties = {
        display: "inline-block",
        transform: refreshing ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 180ms ease",
    };

    return (
        <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            style={BUTTON_STYLE}
        >
            <span>{refreshing ? "Refreshing" : "Refresh"}</span>
            <span aria-hidden="true" style={ICON_STYLE}>
                ↻
            </span>
        </button>
    );
}