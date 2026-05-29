// app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO SECTION
   File: app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
   Scope: Compose Environment current condition hero
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: move weather object out of hero card into hero stage
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentHeroModel } from "../../internal/environment.types";

import EnvironmentHeroStage from "./hero/stage/EnvironmentHeroStage";
import EnvironmentHeroCard from "./hero/EnvironmentHeroCard";
import EnvironmentHeroContent from "./hero/content/EnvironmentHeroContent";
import EnvironmentHeroWeatherObject from "./hero/weather-object/EnvironmentHeroWeatherObject";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroSectionProps = {
    model: EnvironmentHeroModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroSection({
    model,
}: EnvironmentHeroSectionProps) {
    return (
        <EnvironmentHeroStage>
            <EnvironmentHeroCard>
                <EnvironmentHeroContent model={model} />
            </EnvironmentHeroCard>

            <EnvironmentHeroWeatherObject background={model.background} />
        </EnvironmentHeroStage>
    );
}