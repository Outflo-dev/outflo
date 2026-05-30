// app/app/environment/main/view/sections/hero/EnvironmentHeroIcon.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO ICON
   File: app/app/environment/main/view/sections/hero/EnvironmentHeroIcon.tsx
   Scope: Own realistic Environment hero weather icon asset
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: render hero icon from Environment scene key
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentSceneKey } from "../../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroIconProps = {
    sceneKey: EnvironmentSceneKey;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getHeroIconSrc(sceneKey: EnvironmentSceneKey): string {
    if (sceneKey === "rain") return "/environment/rain.png";
    if (sceneKey === "snow") return "/environment/snow.png";
    if (sceneKey === "thunderstorm") return "/environment/thunderstorm.png";
    if (sceneKey === "clear-day") return "/environment/clear-day.png";
    if (sceneKey === "cloudy-day") return "/environment/cloudy.png";
    if (sceneKey === "clear-night") return "/environment/clear-night.png";
    if (sceneKey === "partly-cloudy-night") return "/environment/partly-cloudy-night.png";

    return "/environment/partly-cloudy-day.png";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroIcon({
    sceneKey,
}: EnvironmentHeroIconProps) {
    const ICON_STYLE: CSSProperties = {
        width: 124,
        height: 124,
        objectFit: "contain",
        opacity: 0.97,
        filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.26))",
    };

    return (
        <img
            alt=""
            aria-hidden="true"
            src={getHeroIconSrc(sceneKey)}
            style={ICON_STYLE}
        />
    );
}