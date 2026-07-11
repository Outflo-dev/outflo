"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT REFRESH ACTION
   File: app/app/environment/main/view/context/EnvironmentContextRefreshAction.tsx
   Scope: Render the unbounded Context Card refresh action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { EnvironmentRefreshMark } from "../../../../../../components/system/primitives/marks/environment";
import { VISUAL } from "../../../../../../components/system/primitives/visuals";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextRefreshActionProps = {
    onRefresh: () => void;
    isRefreshing?: boolean;
};

/* ------------------------------
   Styles
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    appearance: "none",
    display: VISUAL.display[6],
    alignItems: "center",
    justifyContent: "center",
    width: VISUAL.spacing[12],
    height: VISUAL.spacing[12],
    margin: 0,
    padding: 0,
    border: 0,
    background: "transparent",
    color: VISUAL.text[10],
    cursor: "pointer",
};

const MARK_SIZE = VISUAL.spacing[10];

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextRefreshAction({
    onRefresh,
    isRefreshing = false,
}: EnvironmentContextRefreshActionProps) {
    return (
        <button
            type="button"
            style={BUTTON_STYLE}
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label={
                isRefreshing
                    ? "Refreshing environment context"
                    : "Refresh environment context"
            }
            aria-busy={isRefreshing}
        >
            <EnvironmentRefreshMark
                size={MARK_SIZE}
                color="currentColor"
                style={{
                    opacity: isRefreshing
                        ? VISUAL.opacity[10]
                        : VISUAL.opacity[20],
                }}
            />
        </button>
    );
}