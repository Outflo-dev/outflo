"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL ARC STROKE
   File: app/app/environment/main/view/hero/instruments/kelvin/arcs/internal/EnvironmentKelvinDialArcStroke.tsx
   Scope: Render Kelvin dial arc stroke with optional endpoint fade
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { KELVIN_DIAL_FRAME_GEOMETRY } from "../../geometry/kelvin-dial-frame.geometry";

/* ------------------------------
   Types
-------------------------------- */
type KelvinDialArcFadeEdge = "none" | "start" | "end";

type KelvinDialArcStrokeProps = {
    name: string;
    start: number;
    sweep: number;
    stroke: string;
    fadeEdge?: KelvinDialArcFadeEdge;
};

/* ------------------------------
   Constants
-------------------------------- */
const FADE_SWEEP = 16;

const START_FADE_PIECES = [
    { offset: 0, sweep: 4, opacity: 0.22 },
    { offset: 4, sweep: 4, opacity: 0.42 },
    { offset: 8, sweep: 4, opacity: 0.64 },
    { offset: 12, sweep: 4, opacity: 0.82 },
] as const;

const END_FADE_PIECES = [
    { offset: 0, sweep: 4, opacity: 0.82 },
    { offset: 4, sweep: 4, opacity: 0.64 },
    { offset: 8, sweep: 4, opacity: 0.42 },
    { offset: 12, sweep: 4, opacity: 0.22 },
] as const;

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialArcStroke({
    name,
    start,
    sweep,
    stroke,
    fadeEdge = "none",
}: KelvinDialArcStrokeProps) {
    const { center, radii, strokes } = KELVIN_DIAL_FRAME_GEOMETRY;

    if (fadeEdge === "start") {
        const mainStart = start + FADE_SWEEP;
        const mainSweep = Math.max(sweep - FADE_SWEEP, 0);

        return (
            <>
                {START_FADE_PIECES.map((piece) => (
                    <circle
                        key={`${name}-start-fade-${piece.offset}`}
                        cx={center}
                        cy={center}
                        r={radii.thermalRail}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokes.thermalRail}
                        strokeLinecap="butt"
                        strokeOpacity={piece.opacity}
                        pathLength={360}
                        strokeDasharray={`${piece.sweep} 360`}
                        strokeDashoffset={-(start + piece.offset)}
                        transform={`rotate(-90 ${center} ${center})`}
                    />
                ))}

                {mainSweep > 0 && (
                    <circle
                        cx={center}
                        cy={center}
                        r={radii.thermalRail}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokes.thermalRail}
                        strokeLinecap="butt"
                        pathLength={360}
                        strokeDasharray={`${mainSweep} 360`}
                        strokeDashoffset={-mainStart}
                        transform={`rotate(-90 ${center} ${center})`}
                    />
                )}
            </>
        );
    }

    if (fadeEdge === "end") {
        const mainSweep = Math.max(sweep - FADE_SWEEP, 0);
        const fadeStart = start + mainSweep;

        return (
            <>
                {mainSweep > 0 && (
                    <circle
                        cx={center}
                        cy={center}
                        r={radii.thermalRail}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokes.thermalRail}
                        strokeLinecap="butt"
                        pathLength={360}
                        strokeDasharray={`${mainSweep} 360`}
                        strokeDashoffset={-start}
                        transform={`rotate(-90 ${center} ${center})`}
                    />
                )}

                {END_FADE_PIECES.map((piece) => (
                    <circle
                        key={`${name}-end-fade-${piece.offset}`}
                        cx={center}
                        cy={center}
                        r={radii.thermalRail}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokes.thermalRail}
                        strokeLinecap="butt"
                        strokeOpacity={piece.opacity}
                        pathLength={360}
                        strokeDasharray={`${piece.sweep} 360`}
                        strokeDashoffset={-(fadeStart + piece.offset)}
                        transform={`rotate(-90 ${center} ${center})`}
                    />
                ))}
            </>
        );
    }

    return (
        <circle
            cx={center}
            cy={center}
            r={radii.thermalRail}
            fill="none"
            stroke={stroke}
            strokeWidth={strokes.thermalRail}
            strokeLinecap="butt"
            pathLength={360}
            strokeDasharray={`${sweep} 360`}
            strokeDashoffset={-start}
            transform={`rotate(-90 ${center} ${center})`}
        />
    );
}