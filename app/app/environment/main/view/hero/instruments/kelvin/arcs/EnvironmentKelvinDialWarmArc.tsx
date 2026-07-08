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
import { KELVIN_DIAL_FRAME_GEOMETRY } from "../geometry/kelvin-dial-frame.geometry";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialWarmArc() {
    const { center, radii, strokes } = KELVIN_DIAL_FRAME_GEOMETRY;
    const segment = getKelvinDialArcSegment("warm");

    return (
        <circle
            cx={center}
            cy={center}
            r={radii.thermalRail}
            fill="none"
            stroke="var(--environment-kelvin-dial-warm-arc)"
            strokeWidth={strokes.thermalRail}
            strokeLinecap="round"
            pathLength={360}
            strokeDasharray={`${segment.sweep} 360`}
            strokeDashoffset={-segment.start}
            transform={`rotate(-90 ${center} ${center})`}
        />
    );
}