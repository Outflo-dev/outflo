"use client";

/* ==========================================================
   OUTFLO — LOCATION SOURCE CONTROLLER
   File: app/account/profile/(pages)/environment/location/source/main/internal/SourceController.tsx
   Scope: Own location source drilldown motion, navigation, and source preference writes
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: wire source controls to persisted environment preferences
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import Motion, {
    MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";

import {
    saveProfileEnvironmentPreferences,
    type ProfileEnvironmentPreferences,
} from "../../../../main/internal/profile-environment.client";
import SourceView from "../view/SourceView";
import { getSourceModel } from "./source.sections";

/* ------------------------------
   Types
-------------------------------- */
type SourceControllerProps = {
    preferences: ProfileEnvironmentPreferences;
};

type LocationSourceMode = ProfileEnvironmentPreferences["location_mode"];

/* ------------------------------
   Constants
-------------------------------- */
const MAIN_STYLE: CSSProperties = {
    minHeight: "100svh",
    padding:
        "calc(env(safe-area-inset-top) + 18px) 0px max(32px, env(safe-area-inset-bottom))",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function SourceController({
    preferences,
}: SourceControllerProps) {
    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");
    const [environmentPreferences, setEnvironmentPreferences] =
        useState<ProfileEnvironmentPreferences>(preferences);
    const [saving, setSaving] = useState(false);

    const model = useMemo(() => {
        return getSourceModel(environmentPreferences);
    }, [environmentPreferences]);

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    async function handleSelectSource(locationMode: LocationSourceMode) {
        if (saving) return;

        if (
            locationMode === "manual_city" &&
            !environmentPreferences.manual_city
        ) {
            return;
        }

        const nextPreferences: ProfileEnvironmentPreferences = {
            ...environmentPreferences,
            location_mode: locationMode,
            manual_city:
                locationMode === "manual_city"
                    ? environmentPreferences.manual_city
                    : null,
        };

        setSaving(true);
        setEnvironmentPreferences(nextPreferences);

        try {
            await saveProfileEnvironmentPreferences(nextPreferences);
        } catch (error) {
            console.error("Failed to save location source", error);
            setEnvironmentPreferences(environmentPreferences);
        } finally {
            setSaving(false);
        }
    }

    return (
        <Motion show={show} direction={direction}>
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <SourceView
                        model={model}
                        onBack={handleBack}
                        onSelectSource={handleSelectSource}
                        saving={saving}
                    />
                </AppFrame>
            </main>
        </Motion>
    );
}