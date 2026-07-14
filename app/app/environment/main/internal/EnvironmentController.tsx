"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTROLLER
   File: app/app/environment/main/internal/EnvironmentController.tsx
   Scope: Own live Environment resolution persisted record proof and Engagement interaction
   Last Updated:
   - iso: 2026-07-14
   - note: adopt Refresh results directly without requiring persistence
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    writeEnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement.client";
import {
    resolveEnvironmentEngagementState,
    type EnvironmentEngagementSelectableMode,
    type EnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement";
import type {
    EnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences";

import EnvironmentView from "../view/EnvironmentView";
import {
    getEnvironmentModel,
} from "./environment.sections";
import type {
    EnvironmentSnapshot,
} from "./environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentControllerProps = {
    snapshot: EnvironmentSnapshot | null;
    environmentEnabled: boolean;
    environmentPreferences: EnvironmentPreferences;
    engagementState: EnvironmentEngagementState;
};

type EnvironmentRefreshResponse = {
    ok: true;
    resolved_snapshot: EnvironmentSnapshot;
    snapshot_persisted: boolean;
};

/* ------------------------------
   Guards
-------------------------------- */
function isEnvironmentRefreshResponse(
    value: unknown,
): value is EnvironmentRefreshResponse {
    if (
        typeof value !== "object" ||
        value === null
    ) {
        return false;
    }

    const candidate =
        value as Record<string, unknown>;

    return (
        candidate.ok === true &&
        typeof candidate.snapshot_persisted ===
        "boolean" &&
        typeof candidate.resolved_snapshot ===
        "object" &&
        candidate.resolved_snapshot !== null &&
        !Array.isArray(
            candidate.resolved_snapshot,
        )
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentController({
    snapshot: restoredSnapshot,
    environmentEnabled,
    environmentPreferences,
    engagementState: restoredEngagementState,
}: EnvironmentControllerProps) {
    const [
        liveSnapshot,
        setLiveSnapshot,
    ] = useState<EnvironmentSnapshot | null>(
        restoredSnapshot,
    );

    const [
        recordedSnapshot,
        setRecordedSnapshot,
    ] = useState<EnvironmentSnapshot | null>(
        restoredSnapshot,
    );

    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    const [
        engagementSaving,
        setEngagementSaving,
    ] = useState(false);

    const [
        lastUpdatedAt,
        setLastUpdatedAt,
    ] = useState<number | null>(null);

    const [
        engagementState,
        setEngagementState,
    ] = useState<EnvironmentEngagementState>(
        restoredEngagementState,
    );

    const confirmedEngagementStateRef =
        useRef<EnvironmentEngagementState>(
            restoredEngagementState,
        );

    const engagementSaveVersionRef =
        useRef(0);

    useEffect(() => {
        setLiveSnapshot(
            restoredSnapshot,
        );

        setRecordedSnapshot(
            restoredSnapshot,
        );
    }, [restoredSnapshot]);

    useEffect(() => {
        confirmedEngagementStateRef.current =
            restoredEngagementState;

        setEngagementState(
            restoredEngagementState,
        );
    }, [restoredEngagementState]);

    const model = useMemo(() => {
        return getEnvironmentModel(
            liveSnapshot,
            recordedSnapshot,
            environmentEnabled,
            environmentPreferences,
            engagementState,
        );
    }, [
        liveSnapshot,
        recordedSnapshot,
        environmentEnabled,
        environmentPreferences,
        engagementState,
    ]);

    function handleBack() {
        window.history.back();
    }

    async function handleRefresh() {
        if (refreshing) return;
        if (!environmentEnabled) return;

        setRefreshing(true);

        try {
            const response = await fetch(
                "/api/environment/context/pull",
                {
                    method: "GET",
                    cache: "no-store",
                },
            );

            const payload: unknown =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    "Environment refresh failed.",
                );
            }

            if (
                !isEnvironmentRefreshResponse(
                    payload,
                )
            ) {
                throw new Error(
                    "Environment refresh returned an invalid response.",
                );
            }

            setLiveSnapshot(
                payload.resolved_snapshot,
            );

            if (payload.snapshot_persisted) {
                setRecordedSnapshot(
                    payload.resolved_snapshot,
                );
            }

            const pulledAtMs =
                payload.resolved_snapshot
                    .environment_context_pulled_at_ms;

            setLastUpdatedAt(
                typeof pulledAtMs === "number"
                    ? pulledAtMs
                    : Date.now(),
            );
        } finally {
            setRefreshing(false);
        }
    }

    function handleEngagementModeChange(
        mode: EnvironmentEngagementSelectableMode,
    ) {
        const previousState =
            engagementState;

        const nextState =
            resolveEnvironmentEngagementState(
                previousState,
                {
                    type: "select-mode",
                    mode,
                },
            );

        if (nextState === previousState) {
            return;
        }

        setEngagementState(nextState);
        setEngagementSaving(true);

        const saveVersion =
            engagementSaveVersionRef.current + 1;

        engagementSaveVersionRef.current =
            saveVersion;

        void writeEnvironmentEngagementState(
            nextState,
        )
            .then((persistedState) => {
                confirmedEngagementStateRef.current =
                    persistedState;

                if (
                    engagementSaveVersionRef.current !==
                    saveVersion
                ) {
                    return;
                }

                setEngagementState(
                    persistedState,
                );

                setEngagementSaving(false);
            })
            .catch((error) => {
                console.error(
                    "Failed to save Environment engagement.",
                    error,
                );

                if (
                    engagementSaveVersionRef.current !==
                    saveVersion
                ) {
                    return;
                }

                setEngagementState(
                    confirmedEngagementStateRef.current,
                );

                setEngagementSaving(false);
            });
    }

    return (
        <EnvironmentView
            model={model}
            onBack={handleBack}
            onRefresh={handleRefresh}
            onEngagementModeChange={
                handleEngagementModeChange
            }
            refreshing={refreshing}
            engagementSaving={
                engagementSaving
            }
            lastUpdatedAt={
                lastUpdatedAt
            }
            environmentPreferences={
                environmentPreferences
            }
        />
    );
}