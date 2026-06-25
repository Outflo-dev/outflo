// app/app/environment/main/view/header/EnvironmentHeader.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Compose Environment Kelvin header regions
   Last Updated:
   - note: compose local header regions toward Kelvin mock
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    DEFAULT_ENVIRONMENT_PREFERENCES,
    type EnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences";

import EnvironmentHeaderFrame from "./internal/EnvironmentHeaderFrame";
import EnvironmentHeaderCenter from "./internal/regions/EnvironmentHeaderCenter";
import EnvironmentHeaderLeft from "./internal/regions/EnvironmentHeaderLeft";
import EnvironmentHeaderRight from "./internal/regions/EnvironmentHeaderRight";

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
            left={<EnvironmentHeaderLeft onBack={onBack} />}
            center={<EnvironmentHeaderCenter />}
            right={
                <EnvironmentHeaderRight
                    environmentPreferences={resolvedPreferences}
                />
            }
        />
    );
}