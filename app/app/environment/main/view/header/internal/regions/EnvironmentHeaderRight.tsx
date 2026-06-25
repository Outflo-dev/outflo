// app/app/environment/main/view/header/internal/regions/EnvironmentHeaderRight.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER RIGHT REGION
   File: app/app/environment/main/view/header/internal/regions/EnvironmentHeaderRight.tsx
   Scope: Own right-side Environment header status and actions region
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

import EnvironmentSettingsMenu from "../../menu/settings/EnvironmentSettingsMenu";
import EnvironmentHeaderLiveStatus from "../../primitives/EnvironmentHeaderLiveStatus";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderRightProps = {
    environmentPreferences: EnvironmentPreferences;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderRight({
    environmentPreferences,
}: EnvironmentHeaderRightProps) {
    return (
        <>
            <EnvironmentHeaderLiveStatus />

            <EnvironmentSettingsMenu
                temperatureUnit={environmentPreferences.temperature_unit}
            />
        </>
    );
}