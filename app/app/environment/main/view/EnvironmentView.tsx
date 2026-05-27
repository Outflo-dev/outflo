// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate surface
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment substrate view composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentHeader from "./header/EnvironmentHeader";
import EnvironmentFooter from "./footer/EnvironmentFooter";
import EnvironmentHeroSection from "./sections/EnvironmentHeroSection";
import EnvironmentDataSection from "./sections/EnvironmentDataSection";

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
    rowGap: 28,
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

            {model.sections.map((section) => (
                <EnvironmentDataSection key={section.title} model={section} />
            ))}

            <EnvironmentFooter hasSnapshot={model.hasSnapshot} />
        </section>
    );
}