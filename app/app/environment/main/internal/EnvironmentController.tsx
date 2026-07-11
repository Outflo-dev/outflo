"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTROLLER
   File: app/app/environment/main/internal/EnvironmentController.tsx
   Scope: Own Environment model preparation navigation and refresh action
   Last Updated:
   - ms:
   - iso:
   - note: own last successful Environment refresh timestamp
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

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
    const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);

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
        if (!environmentEnabled) return;

        setRefreshing(true);

        try {
            const response = await fetch("/api/environment/context/pull", {
                method: "GET",
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Environment refresh failed.");
            }

            setLastUpdatedAt(Date.now());
            router.refresh();
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <EnvironmentView
            model={model}
            onBack={handleBack}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            lastUpdatedAt={lastUpdatedAt}
            environmentPreferences={environmentPreferences}
        />
    );
}