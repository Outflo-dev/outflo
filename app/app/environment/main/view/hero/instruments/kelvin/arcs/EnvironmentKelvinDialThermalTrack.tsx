"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL THERMAL TRACK
   File: app/app/environment/main/view/hero/instruments/kelvin/arcs/EnvironmentKelvinDialThermalTrack.tsx
   Scope: Render Kelvin dial neutral thermal rail segment only
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { getKelvinDialArcSegmentPieces } from "../geometry/kelvin-dial-arc-segments.geometry";
import { KELVIN_DIAL_FRAME_GEOMETRY } from "../geometry/kelvin-dial-frame.geometry";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialThermalTrack() {
    const { center, radii, strokes } = KELVIN_DIAL_FRAME_GEOMETRY;
    const segments = getKelvinDialArcSegmentPieces("neutral");

    return (
        <>
            {segments.map((segment) => (
                <circle
                    key={`${segment.start}-${segment.end}`}
                    cx={center}
                    cy={center}
                    r={radii.thermalRail}
                    fill="none"
                    stroke="var(--environment-kelvin-dial-thermal-track)"
                    strokeWidth={strokes.thermalRail}
                    strokeLinecap="square"
                    pathLength={360}
                    strokeDasharray={`${segment.sweep} 360`}
                    strokeDashoffset={-segment.start}
                    transform={`rotate(-90 ${center} ${center})`}
                />
            ))}
        </>
    );
}