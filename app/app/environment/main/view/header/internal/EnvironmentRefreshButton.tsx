// app/app/environment/main/view/header/internal/EnvironmentRefreshButton.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH BUTTON
   File: app/app/environment/main/view/header/internal/EnvironmentRefreshButton.tsx
   Scope: Own Environment refresh interaction inside header action group
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
    const ICON_STYLE: CSSProperties = {
        display: "inline-block",
        fontSize: 18,
        lineHeight: 1,
        transform: refreshing ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 180ms ease",
    };

    return (
        <IconButton
            ariaLabel={refreshing ? "Refreshing environment" : "Refresh environment"}
            onClick={onRefresh}
            size="lg"
            tone="plain"
            disabled={refreshing}
        >
            <span aria-hidden="true" style={ICON_STYLE}>
                ↻
            </span>
        </IconButton>
    );
}