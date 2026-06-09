// app/app/environment/main/view/header/EnvironmentHeader.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Compose Environment sticky header controls
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: compose Environment header with shared right action pill
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { GlassShell } from "@/components/system/shell/glass";

import EnvironmentHeaderFrame from "./internal/EnvironmentHeaderFrame";
import EnvironmentBackButton from "./internal/EnvironmentBackButton";
import EnvironmentMenuButton from "./internal/EnvironmentMenuButton";
import EnvironmentRefreshButton from "./internal/EnvironmentRefreshButton";
import EnvironmentSubstrateSelector from "./internal/EnvironmentSubstrateSelector";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderProps = {
    onBack: () => void;
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Styles
-------------------------------- */
const ACTION_PILL_INNER_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    padding: 2,
};

const ACTION_DIVIDER_STYLE: CSSProperties = {
    width: 1,
    height: 18,
    background: "color-mix(in srgb, var(--text-primary) 14%, transparent)",
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
        <EnvironmentHeaderFrame
            left={
                <>
                    <EnvironmentBackButton onBack={onBack} />
                    <EnvironmentSubstrateSelector />
                </>
            }
            right={
                <GlassShell tone="soft" shape="pill" padding="none">
                    <div style={ACTION_PILL_INNER_STYLE}>
                        <EnvironmentRefreshButton
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                        />

                        <div style={ACTION_DIVIDER_STYLE} />

                        <EnvironmentMenuButton />
                    </div>
                </GlassShell>
            }
        />
    );
}