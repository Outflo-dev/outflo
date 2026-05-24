"use client";

/* ==========================================================
   OUTFLO — MANUAL CITY CONTROLLER
   File: app/account/profile/(pages)/environment/location/manual-city/main/internal/ManualCityController.tsx
   Scope: Own manual city drilldown motion, navigation, and preference writes
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: wire manual city draft state and persisted environment preference writes
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
import ManualCityView from "../view/ManualCityView";
import { getManualCityModel } from "./manual-city.sections";

/* ------------------------------
   Types
-------------------------------- */
type ManualCityControllerProps = {
    preferences: ProfileEnvironmentPreferences;
};

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
export default function ManualCityController({
    preferences,
}: ManualCityControllerProps) {
    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");
    const [environmentPreferences, setEnvironmentPreferences] =
        useState<ProfileEnvironmentPreferences>(preferences);
    const [draftCity, setDraftCity] = useState(
        preferences.manual_city ?? ""
    );
    const [saving, setSaving] = useState(false);

    const model = useMemo(() => {
        return getManualCityModel(environmentPreferences, draftCity);
    }, [environmentPreferences, draftCity]);

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    async function handleSaveCity() {
        if (saving || !model.canSave) return;

        const nextPreferences: ProfileEnvironmentPreferences = {
            ...environmentPreferences,
            manual_city: draftCity.trim(),
        };

        setSaving(true);
        setEnvironmentPreferences(nextPreferences);

        try {
            await saveProfileEnvironmentPreferences(nextPreferences);
        } catch (error) {
            console.error("Failed to save manual city", error);
            setEnvironmentPreferences(environmentPreferences);
        } finally {
            setSaving(false);
        }
    }

    return (
        <Motion show={show} direction={direction}>
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <ManualCityView
                        model={model}
                        onBack={handleBack}
                        onDraftCityChange={setDraftCity}
                        onSaveCity={handleSaveCity}
                        saving={saving}
                    />
                </AppFrame>
            </main>
        </Motion>
    );
}