// app/app/environment/main/view/header/internal/EnvironmentRefreshCluster.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH CLUSTER
   File: app/app/environment/main/view/header/internal/EnvironmentRefreshCluster.tsx
   Scope: Own Environment header refresh action placement
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: remove updated meta from header refresh cluster
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentRefreshButton from "./EnvironmentRefreshButton";

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
        display: "flex",
        alignItems: "center",
    };

    return (
        <div style={CLUSTER_STYLE}>
            <EnvironmentRefreshButton
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </div>
    );
}