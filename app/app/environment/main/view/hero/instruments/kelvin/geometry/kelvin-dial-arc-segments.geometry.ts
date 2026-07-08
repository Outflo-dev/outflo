/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL ARC SEGMENTS
   File: app/app/environment/main/view/hero/instruments/kelvin/geometry/kelvin-dial-arc-segments.geometry.ts
   Scope: Derive Kelvin dial thermal arc segments from boundary ownership
   Last Updated:
   - ms: 1783474331193
   - iso: 2026-07-08T01:32:11.193Z
   - note: derive connected Kelvin dial arc segments from editable boundaries
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { KELVIN_DIAL_ARC_BOUNDARIES } from "./kelvin-dial-arc-boundaries.geometry";

/* ------------------------------
   Types
-------------------------------- */
export type KelvinDialArcSegmentName = "cool" | "neutral" | "warm";

export type KelvinDialArcSegment = {
    start: number;
    end: number;
    sweep: number;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getClockwiseSweep(startAngle: number, endAngle: number): number {
    return (endAngle - startAngle + 360) % 360;
}

function splitWrappedSegment(
    segment: KelvinDialArcSegment
): KelvinDialArcSegment[] {
    if (segment.end >= segment.start) {
        return [segment];
    }

    return [
        {
            start: segment.start,
            end: 360,
            sweep: getClockwiseSweep(segment.start, 360),
        },
        {
            start: 0,
            end: segment.end,
            sweep: getClockwiseSweep(0, segment.end),
        },
    ].filter((piece) => piece.sweep > 0);
}

/* ------------------------------
   Segment Resolver
-------------------------------- */
export function getKelvinDialArcSegment(
    segment: KelvinDialArcSegmentName
): KelvinDialArcSegment {
    const boundaries = KELVIN_DIAL_ARC_BOUNDARIES;

    const segments = {
        cool: {
            start: boundaries.start,
            end: boundaries.coolEnd,
        },

        neutral: {
            start: boundaries.coolEnd,
            end: boundaries.warmStart,
        },

        warm: {
            start: boundaries.warmStart,
            end: boundaries.end,
        },
    } as const;

    const selected = segments[segment];

    return {
        ...selected,
        sweep: getClockwiseSweep(selected.start, selected.end),
    };
}

export function getKelvinDialArcSegmentPieces(
    segment: KelvinDialArcSegmentName
): KelvinDialArcSegment[] {
    return splitWrappedSegment(getKelvinDialArcSegment(segment));
}