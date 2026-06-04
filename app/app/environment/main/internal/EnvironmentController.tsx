// app/app/environment/main/internal/EnvironmentController.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTROLLER
   File: app/app/environment/main/internal/EnvironmentController.tsx
   Scope: Own Environment model preparation navigation and refresh action
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: demote controller from route frame and visual surface ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import EnvironmentRouteFrame from "../view/frame/EnvironmentRouteFrame";
import EnvironmentView from "../view/EnvironmentView";
import { getEnvironmentModel } from "./environment.sections";
import type { EnvironmentSnapshot } from "./environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentControllerProps = {
    snapshot: EnvironmentSnapshot | null;
    environmentEnabled: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentController({
    snapshot,
    environmentEnabled,
}: EnvironmentControllerProps) {
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);

    const model = useMemo(() => {
        return getEnvironmentModel(
            snapshot,
            environmentEnabled,
        );
    }, [snapshot, environmentEnabled]);

    function handleBack() {
        window.history.back();
    }

    async function handleRefresh() {
        if (refreshing) return;

        if (!environmentEnabled) {
            return;
        }

        setRefreshing(true);

        try {
            await fetch("/api/environment/context/pull", {
                method: "GET",
                cache: "no-store",
            });

            router.refresh();
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <EnvironmentRouteFrame>
            <EnvironmentView
                model={model}
                onBack={handleBack}
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />
        </EnvironmentRouteFrame>
    );
}