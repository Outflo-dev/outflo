"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT AIR QUALITY CONTROLLER
   File: app/account/profile/(pages)/environment/air-quality/main/internal/AirQualityController.tsx
   Scope: Own air quality control drilldown motion and navigation orchestration
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add air quality control controller
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

import AirQualityView from "../view/AirQualityView";
import { getAirQualityModel } from "./air-quality.sections";

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
export default function AirQualityController() {
    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");

    const model = getAirQualityModel();

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
                    <AirQualityView model={model} onBack={handleBack} />
                </AppFrame>
            </main>
        </Motion>
    );
}