// app/app/environment/main/view/sections/forecast/EnvironmentForecastSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST SECTION
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastSection.tsx
   Scope: Compose Environment forecast preview section
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: contain forecast section owner inside forecast subsystem
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentForecastModel } from "../../../internal/environment.types";
import EnvironmentForecastHeader from "./EnvironmentForecastHeader";
import EnvironmentForecastStrip from "./EnvironmentForecastStrip";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentForecastSectionProps = {
    model: EnvironmentForecastModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentForecastSection({
    model,
}: EnvironmentForecastSectionProps) {
    const SECTION_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 5,
    };

    return (
        <section style={SECTION_STYLE}>
            <EnvironmentForecastHeader model={model} />
            <EnvironmentForecastStrip items={model.items} />
        </section>
    );
}