// app/app/environment/main/view/sections/hero/EnvironmentHeroSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO SECTION
   File: app/app/environment/main/view/sections/hero/EnvironmentHeroSection.tsx
   Scope: Compose Environment current condition hero
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: pass weather object as hero card slot
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentHeroModel,
    EnvironmentSceneModel,
} from "../../../internal/environment.types";

import EnvironmentHeroStage from "./stage/EnvironmentHeroStage";
import EnvironmentHeroCard from "./EnvironmentHeroCard";
import EnvironmentHeroContent from "./content/EnvironmentHeroContent";
import EnvironmentHeroWeatherObject from "./weather-object/EnvironmentHeroWeatherObject";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroSectionProps = {
    model: EnvironmentHeroModel;
    scene: EnvironmentSceneModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroSection({
    model,
    scene,
}: EnvironmentHeroSectionProps) {
    return (
        <EnvironmentHeroStage>
            <EnvironmentHeroCard
                weatherObject={
                    <EnvironmentHeroWeatherObject sceneKey={scene.key} />
                }
            >
                <EnvironmentHeroContent model={model} />
            </EnvironmentHeroCard>
        </EnvironmentHeroStage>
    );
}