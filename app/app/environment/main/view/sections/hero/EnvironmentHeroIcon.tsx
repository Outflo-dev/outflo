// app/app/environment/main/view/sections/hero/EnvironmentHeroIcon.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO ICON
   File: app/app/environment/main/view/sections/hero/EnvironmentHeroIcon.tsx
   Scope: Own realistic Environment hero weather icon asset
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: keep hero icon as asset renderer only
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroIconProps = {
    background: string;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getHeroIconSrc(background: string): string {
    if (background === "rain") return "/environment/rain.png";
    if (background === "night") return "/environment/partly-cloudy-night.png";
    if (background === "cloud") return "/environment/partly-cloudy-day.png";

    return "/environment/partly-cloudy-day.png";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroIcon({
    background,
}: EnvironmentHeroIconProps) {
    const ICON_STYLE: CSSProperties = {
        width: 104,
        height: 104,
        objectFit: "contain",
        opacity: 0.96,
        filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.24))",
    };

    return (
        <img
            alt=""
            aria-hidden="true"
            src={getHeroIconSrc(background)}
            style={ICON_STYLE}
        />
    );
}