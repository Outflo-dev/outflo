// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate landing page surface
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: normalize Environment side padding to app frame rhythm
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
        height: "100%",
        minHeight: 0,
        display: "grid",
        gridTemplateRows: "auto minmax(0, 1fr)",
        isolation: "isolate",
        overflow: "hidden",
        background: "transparent",
    };

    const VIEWPORT_BACKDROP_STYLE: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -30,
        pointerEvents: "none",
        background:
            "linear-gradient(180deg, rgba(23,36,69,0.98), rgba(8,22,42,0.98) 44%, rgba(3,7,16,1) 100%)",
    };

    const TOP_SCENE_STYLE: CSSProperties = {
        position: "relative",
        display: "grid",
        rowGap: 5,
        margin: "-6px 0 0",
        padding: "7px 0 7px",
        overflow: "hidden",
        borderRadius: 30,
        backgroundImage: `
            linear-gradient(180deg, rgba(3,8,18,0.02), rgba(3,8,18,0.26) 54%, rgba(3,8,18,0.7)),
            linear-gradient(90deg, rgba(3,8,18,0.58), rgba(3,8,18,0.18) 58%, rgba(3,8,18,0.02)),
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
            "radial-gradient(circle at 82% 20%, rgba(255,223,150,0.22), transparent 25%), linear-gradient(180deg, rgba(255,255,255,0.06), transparent 34%)",
        opacity: 0.82,
    };

    const TOP_CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 1,
        display: "grid",
        rowGap: 5,
        paddingInline: 8,
    };

    const LOWER_SURFACE_STYLE: CSSProperties = {
        minHeight: 0,
        display: "grid",
        gridTemplateRows: "auto auto auto",
        rowGap: 6,
        margin: "0",
        padding: "7px 0 8px",
        overflow: "hidden",
        background:
            "linear-gradient(180deg, rgba(6,19,36,0.52), rgba(3,7,16,0.74) 42%, rgba(3,5,10,0.9) 100%)",
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