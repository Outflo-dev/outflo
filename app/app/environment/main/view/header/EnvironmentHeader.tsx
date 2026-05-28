"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Render Environment landing page navigation
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: compress Environment header for landing surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import EnvironmentBackAction from "./EnvironmentBackAction";
import EnvironmentRefreshAction from "./EnvironmentRefreshAction";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderProps = {
    onBack: () => void;
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeader({
    onBack,
    onRefresh,
    refreshing,
}: EnvironmentHeaderProps) {
    const HEADER_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        minHeight: 72,
        paddingTop: 8,
    };

    const ACTION_GROUP_STYLE: CSSProperties = {
        display: "grid",
        justifyItems: "end",
        rowGap: 6,
    };

    const UPDATED_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        paddingRight: 6,
    };

    return (
        <header style={HEADER_STYLE}>
            <EnvironmentBackAction onBack={onBack} />

            <div style={ACTION_GROUP_STYLE}>
                <EnvironmentRefreshAction
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />

                <Text as="p" type="meta" style={UPDATED_STYLE}>
                    Updated 4m ago
                </Text>
            </div>
        </header>
    );
}