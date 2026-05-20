"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT PRECIPITATION CONTROLLER
   File: app/account/profile/(pages)/environment/precipitation/main/internal/PrecipitationController.tsx
   Scope: Own precipitation control drilldown motion and navigation orchestration
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add precipitation control controller
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

import PrecipitationView from "../view/PrecipitationView";
import { getPrecipitationModel } from "./precipitation.sections";

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
export default function PrecipitationController() {
    const [show, setShow] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("left");

    const model = getPrecipitationModel();

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
                    <PrecipitationView model={model} onBack={handleBack} />
                </AppFrame>
            </main>
        </Motion>
    );
}