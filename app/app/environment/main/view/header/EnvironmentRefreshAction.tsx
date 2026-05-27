// app/app/environment/main/view/header/EnvironmentRefreshAction.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH ACTION
   File: app/app/environment/main/view/header/EnvironmentRefreshAction.tsx
   Scope: Render Environment context refresh action
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: align Environment refresh action with header action packet grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import TextButton from "@/components/system/shell/buttons/types/text/TextButton";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRefreshActionProps = {
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const ACTION_STYLE: CSSProperties = {
    minWidth: 84,
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRefreshAction({
    onRefresh,
    refreshing,
}: EnvironmentRefreshActionProps) {
    return (
        <TextButton
            onClick={onRefresh}
            disabled={refreshing}
            ariaLabel="Refresh environment"
            title="Refresh environment"
            style={ACTION_STYLE}
        >
            {refreshing ? "Pulling" : "Refresh"}
        </TextButton>
    );
}