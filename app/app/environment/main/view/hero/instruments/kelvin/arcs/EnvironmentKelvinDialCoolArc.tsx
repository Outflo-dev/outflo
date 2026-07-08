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
import { KELVIN_DIAL_FRAME_GEOMETRY } from "../geometry/kelvin-dial-frame.geometry";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialCoolArc() {
    const { center, radii, strokes } = KELVIN_DIAL_FRAME_GEOMETRY;
    const segment = getKelvinDialArcSegment("cool");

    return (
        <circle
            cx={center}
            cy={center}
            r={radii.thermalRail}
            fill="none"
            stroke="var(--environment-kelvin-dial-cool-arc)"
            strokeWidth={strokes.thermalRail}
            strokeLinecap="round"
            pathLength={360}
            strokeDasharray={`${segment.sweep} 360`}
            strokeDashoffset={-segment.start}
            transform={`rotate(-90 ${center} ${center})`}
        />
    );
}