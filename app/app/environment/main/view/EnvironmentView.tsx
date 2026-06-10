// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate landing page surface
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: pass Environment preferences into header controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentHeader from "./header/EnvironmentHeader";
import EnvironmentFooter from "./footer/EnvironmentFooter";
import EnvironmentAtmosphere from "./scene/EnvironmentAtmosphere";
import EnvironmentHeroSection from "./sections/hero/EnvironmentHeroSection";
import EnvironmentForecastSection from "./sections/forecast/EnvironmentForecastSection";
import EnvironmentSummarySection from "./sections/EnvironmentSummarySection";
import EnvironmentRecordSection from "./sections/records/EnvironmentRecordSection";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentViewProps = {
    model: EnvironmentViewModel;
    onBack: () => void;
    onRefresh: () => void;
    refreshing: boolean;
    environmentPreferences: EnvironmentPreferences;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentView({
    model,
    onBack,
    onRefresh,
    refreshing,
    environmentPreferences,
}: EnvironmentViewProps) {
    const ROOT_STYLE: CSSProperties = {
        position: "relative",
        width: "100%",
        isolation: "isolate",
    };

    const CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 1,
        display: "grid",
        rowGap: 7,
    };

    return (
        <section style={ROOT_STYLE}>
            <EnvironmentAtmosphere scene={model.scene} />

            <section style={CONTENT_STYLE}>
                <EnvironmentHeader
                    onBack={onBack}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    environmentPreferences={environmentPreferences}
                />

                <EnvironmentHeroSection
                    model={model.hero}
                    scene={model.scene}
                />

                <EnvironmentForecastSection model={model.forecast} />

                <EnvironmentSummarySection model={model.summary} />

                <EnvironmentRecordSection model={model.record} />

                <EnvironmentFooter hasSnapshot={model.hasSnapshot} />
            </section>
        </section>
    );
}