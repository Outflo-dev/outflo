"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL WARM ARC
   File: app/app/environment/main/view/hero/instruments/kelvin/arcs/EnvironmentKelvinDialWarmArc.tsx
   Scope: Render Kelvin dial warm thermal rail segment only
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { getKelvinDialArcSegment } from "../geometry/kelvin-dial-arc-segments.geometry";
import EnvironmentKelvinDialArcStroke from "./internal/EnvironmentKelvinDialArcStroke";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialWarmArc() {
    const segment = getKelvinDialArcSegment("warm");

    return (
        <EnvironmentKelvinDialArcStroke
            name="warm"
            start={segment.start}
            sweep={segment.sweep}
            stroke="var(--environment-kelvin-dial-warm-arc)"
            fadeEdge="end"
        />
    );
}