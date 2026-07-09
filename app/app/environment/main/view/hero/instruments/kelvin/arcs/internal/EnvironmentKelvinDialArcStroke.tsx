"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL ARC STROKE
   File: app/app/environment/main/view/hero/instruments/kelvin/arcs/internal/EnvironmentKelvinDialArcStroke.tsx
   Scope: Render Kelvin dial arc stroke with optional endpoint fade tail
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

type ArcPoint = {
    x: number;
    y: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const FADE_SWEEP = 18;
const FADE_JOIN_OVERLAP = 0.15;
const FADE_VISIBLE_OPACITY = 0.72;

/* ------------------------------
   Helpers
-------------------------------- */
function getArcPoint(
    angle: number,
    center: number,
    radius: number
): ArcPoint {
    const radians = (angle * Math.PI) / 180;

    return {
        x: center + Math.sin(radians) * radius,
        y: center - Math.cos(radians) * radius,
    };
}

function getClockwiseSweep(startAngle: number, endAngle: number): number {
    return (endAngle - startAngle + 360) % 360;
}

function getArcPath(
    startAngle: number,
    endAngle: number,
    center: number,
    radius: number
): string {
    const startPoint = getArcPoint(startAngle, center, radius);
    const endPoint = getArcPoint(endAngle, center, radius);
    const sweep = getClockwiseSweep(startAngle, endAngle);
    const largeArcFlag = sweep > 180 ? 1 : 0;

    return [
        `M ${startPoint.x} ${startPoint.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`,
    ].join(" ");
}

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
        const tailStart = start - FADE_SWEEP;
        const tailEnd = start + FADE_JOIN_OVERLAP;
        const gradientId = `${name}-start-fade-gradient`;

        const tailStartPoint = getArcPoint(
            tailStart,
            center,
            radii.thermalRail
        );
        const tailEndPoint = getArcPoint(
            tailEnd,
            center,
            radii.thermalRail
        );

        return (
            <>
                <defs>
                    <linearGradient
                        id={gradientId}
                        gradientUnits="userSpaceOnUse"
                        x1={tailStartPoint.x}
                        y1={tailStartPoint.y}
                        x2={tailEndPoint.x}
                        y2={tailEndPoint.y}
                    >
                        <stop offset="0%" stopColor={stroke} stopOpacity={0} />
                        <stop offset="42%" stopColor={stroke} stopOpacity={0.18} />
                        <stop
                            offset="100%"
                            stopColor={stroke}
                            stopOpacity={FADE_VISIBLE_OPACITY}
                        />
                    </linearGradient>
                </defs>

                <path
                    d={getArcPath(
                        tailStart,
                        tailEnd,
                        center,
                        radii.thermalRail
                    )}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokes.thermalRail}
                    strokeLinecap="butt"
                />

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
            </>
        );
    }

    if (fadeEdge === "end") {
        const arcEnd = start + sweep;
        const tailStart = arcEnd - FADE_JOIN_OVERLAP;
        const tailEnd = arcEnd + FADE_SWEEP;
        const gradientId = `${name}-end-fade-gradient`;

        const tailStartPoint = getArcPoint(
            tailStart,
            center,
            radii.thermalRail
        );
        const tailEndPoint = getArcPoint(
            tailEnd,
            center,
            radii.thermalRail
        );

        return (
            <>
                <defs>
                    <linearGradient
                        id={gradientId}
                        gradientUnits="userSpaceOnUse"
                        x1={tailStartPoint.x}
                        y1={tailStartPoint.y}
                        x2={tailEndPoint.x}
                        y2={tailEndPoint.y}
                    >
                        <stop
                            offset="0%"
                            stopColor={stroke}
                            stopOpacity={FADE_VISIBLE_OPACITY}
                        />
                        <stop offset="58%" stopColor={stroke} stopOpacity={0.18} />
                        <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                    </linearGradient>
                </defs>

                <path
                    d={getArcPath(
                        tailStart,
                        tailEnd,
                        center,
                        radii.thermalRail
                    )}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokes.thermalRail}
                    strokeLinecap="butt"
                />

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