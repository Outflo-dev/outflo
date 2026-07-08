"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL COOL ARC
   File: app/app/environment/main/view/hero/instruments/kelvin/arcs/EnvironmentKelvinDialCoolArc.tsx
   Scope: Render Kelvin dial cool thermal rail segment only
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { getKelvinDialArcSegment } from "../geometry/kelvin-dial-arc-segments.geometry";
import EnvironmentKelvinDialArcStroke from "./internal/EnvironmentKelvinDialArcStroke";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialCoolArc() {
    const segment = getKelvinDialArcSegment("cool");

    return (
        <EnvironmentKelvinDialArcStroke
            name="cool"
            start={segment.start}
            sweep={segment.sweep}
            stroke="var(--environment-kelvin-dial-cool-arc)"
            fadeEdge="start"
        />
    );
}