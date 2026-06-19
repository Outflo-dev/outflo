// app/app/environment/main/view/launch/EnvironmentLaunchSurface.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT LAUNCH SURFACE
   File: app/app/environment/main/view/launch/EnvironmentLaunchSurface.tsx
   Scope: Compose Environment launch surface while migration graduates from test sections to homes
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentViewModel } from "../../internal/environment.types";

import EnvironmentHeroSection from "../sections/hero/EnvironmentHeroSection";
import EnvironmentForecastSection from "../sections/forecast/EnvironmentForecastSection";
import EnvironmentSummarySection from "../sections/EnvironmentSummarySection";
import EnvironmentRecordSection from "../sections/records/EnvironmentRecordSection";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentLaunchSurfaceProps = {
    model: EnvironmentViewModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentLaunchSurface({
    model,
}: EnvironmentLaunchSurfaceProps) {
    return (
        <>
            <EnvironmentHeroSection
                model={model.hero}
                scene={model.scene}
            />

            <EnvironmentForecastSection model={model.forecast} />

            <EnvironmentSummarySection model={model.summary} />

            <EnvironmentRecordSection model={model.record} />
        </>
    );
}