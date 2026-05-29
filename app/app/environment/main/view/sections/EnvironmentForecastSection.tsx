// app/app/environment/main/view/sections/EnvironmentForecastSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST SECTION
   File: app/app/environment/main/view/sections/EnvironmentForecastSection.tsx
   Scope: Compose Environment forecast preview section
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: delegate forecast internals to local forecast owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentForecastModel } from "../../internal/environment.types";
import EnvironmentForecastHeader from "./forecast/EnvironmentForecastHeader";
import EnvironmentForecastStrip from "./forecast/EnvironmentForecastStrip";

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