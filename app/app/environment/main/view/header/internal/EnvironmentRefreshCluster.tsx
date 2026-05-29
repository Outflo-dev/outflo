// app/app/environment/main/view/header/internal/EnvironmentRefreshCluster.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH CLUSTER
   File: app/app/environment/main/view/header/internal/EnvironmentRefreshCluster.tsx
   Scope: Own Environment refresh action and updated meta stack
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract Environment refresh cluster ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentRefreshButton from "./EnvironmentRefreshButton";
import EnvironmentUpdatedMeta from "./EnvironmentUpdatedMeta";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRefreshClusterProps = {
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRefreshCluster({
    onRefresh,
    refreshing,
}: EnvironmentRefreshClusterProps) {
    const CLUSTER_STYLE: CSSProperties = {
        justifySelf: "end",
        display: "grid",
        justifyItems: "end",
        rowGap: 5,
    };

    return (
        <div style={CLUSTER_STYLE}>
            <EnvironmentRefreshButton
                onRefresh={onRefresh}
                refreshing={refreshing}
            />

            <EnvironmentUpdatedMeta refreshing={refreshing} />
        </div>
    );
}