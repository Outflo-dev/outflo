// app/app/environment/main/view/header/EnvironmentHeader.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Compose Environment Kelvin header regions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

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
    lastUpdatedAt: number | null;
    environmentPreferences?: EnvironmentPreferences;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getUpdatedLabel(lastUpdatedAt: number | null): string {
    if (lastUpdatedAt === null) {
        return "UPDATED —";
    }

    const elapsedMinutes = Math.floor(
        (Date.now() - lastUpdatedAt) / 60_000
    );

    if (elapsedMinutes < 1) {
        return "UPDATED NOW";
    }

    return `UPDATED ${elapsedMinutes}M AGO`;
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeader({
    onBack,
    onRefresh,
    refreshing,
    lastUpdatedAt,
}: EnvironmentHeaderProps) {
    const updatedLabel = getUpdatedLabel(lastUpdatedAt);

    return (
        <EnvironmentHeaderFrame
            left={<EnvironmentHeaderLeft onBack={onBack} />}
            center={<EnvironmentHeaderCenter />}
            right={
                <EnvironmentHeaderRight
                    lastUpdatedAt={lastUpdatedAt}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            }
        />
    );
}