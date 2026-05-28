"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate landing page surface
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: recompose Environment surface as landing page
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentHeader from "./header/EnvironmentHeader";
import EnvironmentFooter from "./footer/EnvironmentFooter";
import EnvironmentHeroSection from "./sections/EnvironmentHeroSection";
import EnvironmentForecastSection from "./sections/EnvironmentForecastSection";
import EnvironmentSummarySection from "./sections/EnvironmentSummarySection";
import EnvironmentRecordSection from "./sections/EnvironmentRecordSection";

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
   Constants
-------------------------------- */
const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 24,
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
    return (
        <section style={SURFACE_STYLE}>
            <EnvironmentHeader
                onBack={onBack}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />

            <EnvironmentHeroSection model={model.hero} />

            <EnvironmentForecastSection model={model.forecast} />

            <EnvironmentSummarySection model={model.summary} />

            <EnvironmentRecordSection model={model.record} />

            <EnvironmentFooter hasSnapshot={model.hasSnapshot} />
        </section>
    );
}