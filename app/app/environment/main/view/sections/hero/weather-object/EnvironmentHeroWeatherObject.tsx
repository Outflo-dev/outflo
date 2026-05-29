// app/app/environment/main/view/sections/hero/weather-object/EnvironmentHeroWeatherObject.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO WEATHER OBJECT
   File: app/app/environment/main/view/sections/hero/weather-object/EnvironmentHeroWeatherObject.tsx
   Scope: Own Environment hero weather object zone outside data card
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: position weather object as meta layer to hero card
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentHeroIcon from "../EnvironmentHeroIcon";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroWeatherObjectProps = {
    background: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroWeatherObject({
    background,
}: EnvironmentHeroWeatherObjectProps) {
    const ZONE_STYLE: CSSProperties = {
        position: "absolute",
        zIndex: 3,
        right: 0,
        top: 18,
        width: 112,
        height: 112,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
    };

    return (
        <div style={ZONE_STYLE}>
            <EnvironmentHeroIcon background={background} />
        </div>
    );
}