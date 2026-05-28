// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate landing page surface
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: restore blue viewport backdrop while keeping scene image in route
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
        minHeight: "100%",
        isolation: "isolate",
        background: "transparent",
    };

    const VIEWPORT_BACKDROP_STYLE: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -30,
        pointerEvents: "none",
        background:
            "linear-gradient(180deg, rgba(74,113,139,0.96), rgba(20,48,76,0.98) 42%, rgba(5,12,24,1) 100%)",
    };

    const TOP_SCENE_STYLE: CSSProperties = {
        position: "relative",
        display: "grid",
        rowGap: 14,
        margin: "-16px -16px 0",
        padding: "16px 16px 18px",
        overflow: "hidden",
        backgroundImage: `
            linear-gradient(180deg, rgba(3,8,18,0.06), rgba(3,8,18,0.42) 52%, rgba(3,8,18,0.92)),
            linear-gradient(90deg, rgba(3,8,18,0.5), rgba(3,8,18,0.16) 58%, rgba(3,8,18,0.04)),
            url("/environment/hero/day-clouds.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center right",
    };

    const TOP_GLOW_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
            "radial-gradient(circle at 80% 18%, rgba(255,223,150,0.2), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.08), transparent 36%)",
        opacity: 0.88,
    };

    const TOP_CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 1,
        display: "grid",
        rowGap: 14,
    };

    const LOWER_SURFACE_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 18,
        margin: "0 -16px",
        padding: "16px 16px 28px",
        background:
            "linear-gradient(180deg, rgba(3,8,18,0.24), rgba(3,8,18,0.76) 24%, rgba(3,5,10,0.94) 100%)",
    };

    return (
        <section style={ROOT_STYLE}>
            <div style={VIEWPORT_BACKDROP_STYLE} />

            <section style={TOP_SCENE_STYLE}>
                <div style={TOP_GLOW_STYLE} />

                <div style={TOP_CONTENT_STYLE}>
                    <EnvironmentHeader
                        onBack={onBack}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />

                    <EnvironmentHeroSection model={model.hero} />

                    <EnvironmentForecastSection model={model.forecast} />
                </div>
            </section>

            <section style={LOWER_SURFACE_STYLE}>
                <EnvironmentSummarySection model={model.summary} />

                <EnvironmentRecordSection model={model.record} />

                <EnvironmentFooter hasSnapshot={model.hasSnapshot} />
            </section>
        </section>
    );
}