// app/app/environment/main/view/scene/EnvironmentAtmosphere.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT ATMOSPHERE
   File: app/app/environment/main/view/scene/EnvironmentAtmosphere.tsx
   Scope: Own Environment atmospheric scene layer
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extend scene falloff so atmosphere dissolves into content surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type {
    EnvironmentSceneKey,
    EnvironmentSceneModel,
} from "../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentAtmosphereProps = {
    scene: EnvironmentSceneModel;
};

/* ------------------------------
   Scene Config
-------------------------------- */
const SCENE_IMAGE: Record<EnvironmentSceneKey, string> = {
    empty: "/environment/hero/day-clouds.png",
    "clear-day": "/environment/clear-day.png",
    "partly-cloudy-day": "/environment/hero/day-clouds.png",
    "cloudy-day": "/environment/cloudy.png",
    rain: "/environment/rain.png",
    snow: "/environment/snow.png",
    thunderstorm: "/environment/thunderstorm.png",
    "clear-night": "/environment/clear-night.png",
    "partly-cloudy-night": "/environment/partly-cloudy-night.png",
};

const SCENE_BACKDROP: Record<EnvironmentSceneKey, string> = {
    empty: "linear-gradient(180deg, rgb(10, 20, 39), rgb(5, 12, 26) 54%, rgb(3, 7, 16) 100%)",
    "clear-day": "linear-gradient(180deg, rgb(23, 49, 84), rgb(7, 19, 37) 56%, rgb(3, 7, 16) 100%)",
    "partly-cloudy-day": "linear-gradient(180deg, rgb(10, 20, 39), rgb(5, 12, 26) 54%, rgb(3, 7, 16) 100%)",
    "cloudy-day": "linear-gradient(180deg, rgb(22, 33, 49), rgb(7, 16, 29) 56%, rgb(3, 7, 16) 100%)",
    rain: "linear-gradient(180deg, rgb(18, 27, 42), rgb(6, 15, 27) 56%, rgb(3, 7, 16) 100%)",
    snow: "linear-gradient(180deg, rgb(45, 59, 75), rgb(15, 27, 42) 56%, rgb(3, 7, 16) 100%)",
    thunderstorm: "linear-gradient(180deg, rgb(16, 16, 31), rgb(6, 10, 23) 56%, rgb(3, 7, 16) 100%)",
    "clear-night": "linear-gradient(180deg, rgb(7, 14, 35), rgb(4, 9, 24) 56%, rgb(3, 7, 16) 100%)",
    "partly-cloudy-night": "linear-gradient(180deg, rgb(8, 17, 39), rgb(4, 10, 25) 56%, rgb(3, 7, 16) 100%)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentAtmosphere({
    scene,
}: EnvironmentAtmosphereProps) {
    const image = SCENE_IMAGE[scene.key];
    const backdrop = SCENE_BACKDROP[scene.key];
    const isNight = scene.key.includes("night");

    const VIEWPORT_BACKDROP_STYLE: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -50,
        pointerEvents: "none",
        background: backdrop,
    };

    const SCENE_STYLE: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: -40,
        height: "min(92svh, 860px)",
        pointerEvents: "none",
        backgroundImage: `url("${image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
    };

    const VEIL_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `
            linear-gradient(180deg,
                rgba(3,7,16,0.02) 0%,
                rgba(3,7,16,0.10) 26%,
                rgba(3,7,16,0.34) 54%,
                rgba(3,7,16,0.72) 78%,
                rgba(3,7,16,1) 100%
            ),
            linear-gradient(90deg,
                rgba(3,7,16,0.78) 0%,
                rgba(3,7,16,0.42) 44%,
                rgba(3,7,16,0.10) 76%,
                rgba(3,7,16,0.00) 100%
            )
        `,
    };

    const GLOW_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
            "radial-gradient(circle at 82% 18%, rgba(255,223,150,0.20), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.05), transparent 46%)",
        opacity: isNight ? 0.32 : 0.68,
    };

    const PAGE_WASH_STYLE: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -30,
        pointerEvents: "none",
        background: `
            linear-gradient(180deg,
                rgba(3,7,16,0.00) 0%,
                rgba(3,7,16,0.00) 36%,
                rgba(3,7,16,0.42) 58%,
                rgba(3,7,16,0.86) 76%,
                rgba(3,7,16,1) 100%
            )
        `,
    };

    return (
        <>
            <div style={VIEWPORT_BACKDROP_STYLE} />

            <div aria-label={scene.label} style={SCENE_STYLE}>
                <div style={GLOW_STYLE} />
                <div style={VEIL_STYLE} />
            </div>

            <div style={PAGE_WASH_STYLE} />
        </>
    );
}