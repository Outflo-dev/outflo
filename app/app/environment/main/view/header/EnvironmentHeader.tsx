// app/app/environment/main/view/header/EnvironmentHeader.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Compose Environment sticky header controls
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: normalize Environment preferences before menu handoff
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
    type EnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences";
import { GlassShell } from "@/components/system/shell/glass";

import EnvironmentHeaderFrame from "./internal/EnvironmentHeaderFrame";
import EnvironmentBackButton from "./internal/EnvironmentBackButton";
import EnvironmentRefreshButton from "./internal/EnvironmentRefreshButton";
import EnvironmentSubstrateSelector from "./internal/EnvironmentSubstrateSelector";
import EnvironmentSettingsMenu from "./menu/settings/EnvironmentSettingsMenu";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderProps = {
    onBack: () => void;
    onRefresh: () => void;
    refreshing: boolean;
    environmentPreferences?: EnvironmentPreferences;
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
    environmentPreferences,
}: EnvironmentHeaderProps) {
    const resolvedPreferences =
        environmentPreferences ?? DEFAULT_ENVIRONMENT_PREFERENCES;

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

                        <EnvironmentSettingsMenu
                            temperatureUnit={resolvedPreferences.temperature_unit}
                        />
                    </div>
                </GlassShell>
            }
        />
    );
}