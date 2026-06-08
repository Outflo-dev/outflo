"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO WEATHER OBJECT
   File: app/app/environment/main/view/sections/hero/weather-object/EnvironmentHeroWeatherObject.tsx
   Scope: Own Environment hero weather object placement inside data card
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: move hero weather object slightly right and enlarge zone
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentSceneKey } from "../../../../internal/environment.types";
import EnvironmentHeroIcon from "../EnvironmentHeroIcon";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroWeatherObjectProps = {
    sceneKey: EnvironmentSceneKey;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroWeatherObject({
    sceneKey,
}: EnvironmentHeroWeatherObjectProps) {
    const ZONE_STYLE: CSSProperties = {
        position: "absolute",
        zIndex: 2,
        right: 10,
        top: "50%",
        width: 188,
        height: 188,
        display: "grid",
        placeItems: "center",
        transform: "translateY(-54%)",
        pointerEvents: "none",
    };

    return (
        <div style={ZONE_STYLE}>
            <EnvironmentHeroIcon sceneKey={sceneKey} />
        </div>
    );
}