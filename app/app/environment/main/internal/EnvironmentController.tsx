"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTROLLER
   File: app/app/environment/main/internal/EnvironmentController.tsx
   Scope: Own Environment model preparation navigation and refresh action
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: pass persisted Environment preferences into compiler
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

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
    environmentPreferences: EnvironmentPreferences;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentController({
    snapshot,
    environmentEnabled,
    environmentPreferences,
}: EnvironmentControllerProps) {
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);

    const model = useMemo(() => {
        return getEnvironmentModel(
            snapshot,
            environmentEnabled,
            environmentPreferences
        );
    }, [snapshot, environmentEnabled, environmentPreferences]);

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
                environmentPreferences={environmentPreferences}
            />
        </EnvironmentRouteFrame>
    );
}