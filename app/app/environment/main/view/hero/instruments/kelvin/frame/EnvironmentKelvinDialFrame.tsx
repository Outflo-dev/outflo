"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL FRAME
   File: app/app/environment/main/view/hero/instruments/kelvin/frame/EnvironmentKelvinDialFrame.tsx
   Scope: Render Kelvin dial SVG frame and rail layers
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import EnvironmentKelvinDialCoolArc from "../arcs/EnvironmentKelvinDialCoolArc";
import EnvironmentKelvinDialThermalTrack from "../arcs/EnvironmentKelvinDialThermalTrack";
import EnvironmentKelvinDialWarmArc from "../arcs/EnvironmentKelvinDialWarmArc";
import { KELVIN_DIAL_FRAME_GEOMETRY } from "../geometry/kelvin-dial-frame.geometry";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialFrame() {
    const { viewBox, center, radii, strokes } = KELVIN_DIAL_FRAME_GEOMETRY;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            role="img"
            aria-label="Kelvin dial frame"
            style={{
                position: "absolute",
                inset: 0,
                overflow: "visible",
            }}
        >
            <circle
                cx={center}
                cy={center}
                r={radii.frameOuter}
                fill="var(--environment-kelvin-dial-frame-outer-fill)"
                stroke="var(--environment-kelvin-dial-frame-outer-stroke)"
                strokeWidth={strokes.frameOuter}
            />

            <circle
                cx={center}
                cy={center}
                r={radii.frameInner}
                fill="var(--environment-kelvin-dial-frame-inner-fill)"
                stroke="var(--environment-kelvin-dial-frame-inner-stroke)"
                strokeWidth={strokes.frameInner}
            />

            <circle
                cx={center}
                cy={center}
                r={radii.face}
                fill="var(--environment-kelvin-dial-face-fill)"
                stroke="var(--environment-kelvin-dial-face-stroke)"
                strokeWidth={strokes.face}
            />

            <circle
                cx={center}
                cy={center}
                r={radii.faceGuide}
                fill="none"
                stroke="var(--environment-kelvin-dial-face-guide-stroke)"
                strokeWidth={strokes.faceGuide}
            />

            <EnvironmentKelvinDialThermalTrack />
            <EnvironmentKelvinDialCoolArc />
            <EnvironmentKelvinDialWarmArc />
        </svg>
    );
}