"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION CONTROLLER
   File: app/account/profile/(pages)/environment/location/main/internal/LocationController.tsx
   Scope: Own location control drilldown motion, navigation, and location preference writes
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: preserve saved manual place when toggling location participation
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
} from "../../../main/internal/profile-environment.client";
import LocationView from "../view/LocationView";
import { getLocationModel } from "./location.sections";

/* ------------------------------
   Types
-------------------------------- */
type LocationControllerProps = {
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
export default function LocationController({
    preferences,
}: LocationControllerProps) {
    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");
    const [environmentPreferences, setEnvironmentPreferences] =
        useState<ProfileEnvironmentPreferences>(preferences);
    const [saving, setSaving] = useState(false);

    const model = useMemo(() => {
        return getLocationModel(environmentPreferences);
    }, [environmentPreferences]);

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    async function handleToggleLocation() {
        if (saving) return;

        const nextLocationMode =
            environmentPreferences.location_mode === "off" ? "device" : "off";

        const nextPreferences: ProfileEnvironmentPreferences = {
            ...environmentPreferences,
            location_mode: nextLocationMode,
        };

        setSaving(true);
        setEnvironmentPreferences(nextPreferences);

        try {
            await saveProfileEnvironmentPreferences(nextPreferences);
        } catch (error) {
            console.error("Failed to save location preferences", error);
            setEnvironmentPreferences(environmentPreferences);
        } finally {
            setSaving(false);
        }
    }

    return (
        <Motion show={show} direction={direction}>
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <LocationView
                        model={model}
                        onBack={handleBack}
                        onToggleLocation={handleToggleLocation}
                        saving={saving}
                    />
                </AppFrame>
            </main>
        </Motion>
    );
}