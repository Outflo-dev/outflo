"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL ARC PAINT
   File: app/app/environment/main/view/hero/instruments/kelvin/paint/EnvironmentKelvinDialArcPaint.tsx
   Scope: Own Kelvin dial SVG arc paint definitions
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDialArcPaint() {
    return (
        <defs>
            <linearGradient
                id="environment-kelvin-dial-cool-arc-stroke"
                x1="108"
                y1="48"
                x2="63"
                y2="334"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="var(--environment-kelvin-dial-cool-arc)"
                    stopOpacity={1}
                />
                <stop
                    offset="72%"
                    stopColor="var(--environment-kelvin-dial-cool-arc)"
                    stopOpacity={1}
                />
                <stop
                    offset="100%"
                    stopColor="var(--environment-kelvin-dial-cool-arc)"
                    stopOpacity={0}
                />
            </linearGradient>


            <linearGradient
                id="environment-kelvin-dial-warm-arc-stroke"
                x1="344"
                y1="360"
                x2="290"
                y2="80"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="var(--environment-kelvin-dial-warm-arc)"
                    stopOpacity={0}
                />
                <stop
                    offset="28%"
                    stopColor="var(--environment-kelvin-dial-warm-arc)"
                    stopOpacity={1}
                />
                <stop
                    offset="100%"
                    stopColor="var(--environment-kelvin-dial-warm-arc)"
                    stopOpacity={1}
                />
            </linearGradient>
        </defs>
    );
}