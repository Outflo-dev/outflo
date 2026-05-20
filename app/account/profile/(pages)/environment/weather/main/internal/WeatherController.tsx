"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER CONTROLLER
   File: app/account/profile/(pages)/environment/weather/main/internal/WeatherController.tsx
   Scope: Own weather control drilldown motion and navigation orchestration
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add weather control controller
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

import WeatherView from "../view/WeatherView";
import { getWeatherModel } from "./weather.sections";

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

    const model = getWeatherModel();

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
                    <WeatherView model={model} onBack={handleBack} />
                </AppFrame>
            </main>
        </Motion>
    );
}