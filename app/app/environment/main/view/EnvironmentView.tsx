// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate landing page surface
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: add page-level atmosphere to Environment landing surface
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
   Helpers
-------------------------------- */
function getAtmosphereBackground(kind: string): string {
    if (kind === "rain") {
        return "radial-gradient(circle at 76% 8%, rgba(92,125,170,0.22), transparent 34%), radial-gradient(circle at 20% 24%, rgba(58,92,130,0.2), transparent 32%), linear-gradient(180deg, rgba(16,25,42,0.96), rgba(5,7,13,1))";
    }

    if (kind === "cloud") {
        return "radial-gradient(circle at 78% 8%, rgba(255,222,160,0.22), transparent 28%), radial-gradient(circle at 24% 20%, rgba(80,139,188,0.22), transparent 34%), linear-gradient(180deg, rgba(21,45,72,0.96), rgba(5,8,14,1))";
    }

    if (kind === "night") {
        return "radial-gradient(circle at 74% 10%, rgba(116,122,255,0.18), transparent 30%), radial-gradient(circle at 24% 22%, rgba(50,68,128,0.16), transparent 34%), linear-gradient(180deg, rgba(8,13,34,0.98), rgba(3,5,13,1))";
    }

    return "radial-gradient(circle at 76% 8%, rgba(255,222,145,0.24), transparent 30%), radial-gradient(circle at 22% 20%, rgba(72,153,218,0.24), transparent 36%), linear-gradient(180deg, rgba(17,52,86,0.96), rgba(5,9,16,1))";
}

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
    };

    const ATMOSPHERE_STYLE: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -4,
        pointerEvents: "none",
        background: getAtmosphereBackground(model.hero.background),
    };

    const GLOW_STYLE: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -3,
        pointerEvents: "none",
        background:
            "radial-gradient(circle at 78% 18%, rgba(255,255,255,0.13), transparent 22%), radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 34%)",
        opacity: 0.9,
    };

    const CLOUD_STYLE: CSSProperties = {
        position: "fixed",
        top: 96,
        right: -92,
        width: 360,
        height: 180,
        zIndex: -2,
        pointerEvents: "none",
        borderRadius: 999,
        background:
            "radial-gradient(circle at 25% 52%, rgba(255,255,255,0.18), transparent 35%), radial-gradient(circle at 52% 38%, rgba(255,255,255,0.14), transparent 36%), radial-gradient(circle at 76% 58%, rgba(255,255,255,0.1), transparent 34%)",
        filter: "blur(12px)",
        opacity: 0.72,
    };

    const SURFACE_STYLE: CSSProperties = {
        width: "100%",
        display: "grid",
        rowGap: 24,
    };

    return (
        <section style={ROOT_STYLE}>
            <div style={ATMOSPHERE_STYLE} />
            <div style={GLOW_STYLE} />
            <div style={CLOUD_STYLE} />

            <div style={SURFACE_STYLE}>
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
            </div>
        </section>
    );
}