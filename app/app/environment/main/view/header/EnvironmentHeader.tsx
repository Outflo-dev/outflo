// app/app/environment/main/view/header/EnvironmentHeader.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER
   File: app/app/environment/main/view/header/EnvironmentHeader.tsx
   Scope: Compose Environment scene header controls
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: delegate Environment header internals to local owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import EnvironmentHeaderFrame from "./internal/EnvironmentHeaderFrame";
import EnvironmentBackButton from "./internal/EnvironmentBackButton";
import EnvironmentRefreshCluster from "./internal/EnvironmentRefreshCluster";

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
    return (
        <EnvironmentHeaderFrame>
            <EnvironmentBackButton onBack={onBack} />

            <EnvironmentRefreshCluster
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </EnvironmentHeaderFrame>
    );
}