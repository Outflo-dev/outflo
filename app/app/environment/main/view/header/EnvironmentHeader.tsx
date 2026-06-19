// app/app/environment/main/view/header/EnvironmentHeader.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Compose Environment Kelvin header controls
   Last Updated:
   - note: compose local header primitives toward Kelvin mock
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
    type EnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences";

import EnvironmentHeaderFrame from "./internal/EnvironmentHeaderFrame";
import EnvironmentHeaderOrb from "./primitives/EnvironmentHeaderOrb";
import EnvironmentHeaderWordmark from "./primitives/EnvironmentHeaderWordmark";
import EnvironmentHeaderLiveStatus from "./primitives/EnvironmentHeaderLiveStatus";
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
   Component
-------------------------------- */
export default function EnvironmentHeader({
    onBack,
    environmentPreferences,
}: EnvironmentHeaderProps) {
    const resolvedPreferences =
        environmentPreferences ?? DEFAULT_ENVIRONMENT_PREFERENCES;

    return (
        <EnvironmentHeaderFrame
            left={<EnvironmentHeaderOrb onPress={onBack} />}
            center={<EnvironmentHeaderWordmark />}
            right={
                <>
                    <EnvironmentHeaderLiveStatus />

                    <EnvironmentSettingsMenu
                        temperatureUnit={resolvedPreferences.temperature_unit}
                    />
                </>
            }
        />
    );
}