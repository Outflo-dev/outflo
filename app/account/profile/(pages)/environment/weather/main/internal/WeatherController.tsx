"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER CONTROLLER
   File: app/account/profile/(pages)/environment/weather/main/internal/WeatherController.tsx
   Scope: Own weather control drilldown motion and navigation orchestration
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: persist master weather control to environment preferences
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";
import { useState } from "react";

import Motion, {
    MOTION_DURATION_MS,
} from "@/components/system/primitives/motion/Motion";
import AppFrame from "@/components/system/shell/app/AppFrame";
import { patchProfileEnvironmentPreferences } from "../../../main/internal/profile-environment.client";

import WeatherView from "../view/WeatherView";
import { getWeatherModel } from "./weather.sections";
import type { WeatherControlKey } from "./weather.types";

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
export default function WeatherController() {
    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");
    const [enabledByKey, setEnabledByKey] = useState<
        Record<WeatherControlKey, boolean>
    >({
        master: false,
        weather: false,
        temperature: false,
        dew_point: false,
        precipitation: false,
        forecast: false,
    });

    const baseModel = getWeatherModel();

    const model = {
        controls: baseModel.controls.map((control) => ({
            ...control,
            enabled: enabledByKey[control.key],
        })),
    };

    async function handleToggle(key: WeatherControlKey) {
        const nextEnabled = !enabledByKey[key];

        setEnabledByKey((current) => ({
            ...current,
            [key]: nextEnabled,
        }));

        if (key !== "master" && key !== "weather") return;

        try {
            await patchProfileEnvironmentPreferences({
                weather_mode: nextEnabled ? "on" : "off",
            });
        } catch (error) {
            console.error("Weather preference patch failed", error);

            setEnabledByKey((current) => ({
                ...current,
                [key]: !nextEnabled,
            }));
        }
    }

    function handleBack() {
        setDirection("right");
        setShow(false);

        window.setTimeout(() => {
            window.history.back();
        }, MOTION_DURATION_MS);
    }

    return (
        <Motion show={show} direction={direction}>
            <main style={MAIN_STYLE}>
                <AppFrame>
                    <WeatherView
                        model={model}
                        onBack={handleBack}
                        onToggle={handleToggle}
                    />
                </AppFrame>
            </main>
        </Motion>
    );
}