// app/app/environment/main/view/sections/hero/stage/EnvironmentHeroStage.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO STAGE
   File: app/app/environment/main/view/sections/hero/stage/EnvironmentHeroStage.tsx
   Scope: Own relationship between hero data card and weather object
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: create hero stage as card-object relationship owner
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroStageProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroStage({
    children,
}: EnvironmentHeroStageProps) {
    const STAGE_STYLE: CSSProperties = {
        position: "relative",
        minHeight: 146,
        isolation: "isolate",
    };

    return <section style={STAGE_STYLE}>{children}</section>;
}