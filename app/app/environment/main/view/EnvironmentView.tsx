// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate landing page surface
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: pass Environment scene model to atmosphere and hero owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

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
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentView({
    model,
    onBack,
    onRefresh,
    refreshing,
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