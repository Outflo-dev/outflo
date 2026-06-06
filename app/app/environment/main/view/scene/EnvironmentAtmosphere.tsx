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
const ENVIRONMENT_BACKDROP = "var(--bg-primary)";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentAtmosphere({
    scene,
}: EnvironmentAtmosphereProps) {
    const VIEWPORT_BACKDROP_STYLE: CSSProperties = {
        position: "fixed",
        inset: 0,
        zIndex: -50,
        pointerEvents: "none",
        background: ENVIRONMENT_BACKDROP,
    };

    return <div aria-label={scene.label} style={VIEWPORT_BACKDROP_STYLE} />;
}