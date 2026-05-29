// app/app/environment/main/view/sections/hero/content/EnvironmentHeroContent.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO CONTENT
   File: app/app/environment/main/view/sections/hero/content/EnvironmentHeroContent.tsx
   Scope: Own Environment hero left-side content stack
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract hero text column ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentHeroModel } from "../../../internal/environment.types";
import EnvironmentHeroLivePill from "../EnvironmentHeroLivePill";
import EnvironmentHeroTemperature from "./EnvironmentHeroTemperature";
import EnvironmentHeroMeta from "../EnvironmentHeroMeta";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroContentProps = {
    model: EnvironmentHeroModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroContent({
    model,
}: EnvironmentHeroContentProps) {
    const CONTENT_STYLE: CSSProperties = {
        minWidth: 0,
        display: "grid",
        rowGap: 5,
    };

    return (
        <div style={CONTENT_STYLE}>
            <EnvironmentHeroLivePill />

            <EnvironmentHeroTemperature
                temperature={model.temperature}
                condition={model.condition}
            />

            <EnvironmentHeroMeta model={model} />
        </div>
    );
}