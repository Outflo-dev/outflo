// app/app/environment/main/view/context/primitives/EnvironmentContextGlobe.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT GLOBE
   File: app/app/environment/main/view/context/primitives/EnvironmentContextGlobe.tsx
   Scope: Dotted world map visual with projected location ping
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: replace header-private visual tokens with reusable Orb and theme roles
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextGlobeProps = {
    latitude?: number;
    longitude?: number;
};

/* ------------------------------
   Constants
-------------------------------- */
const DEFAULT_LATITUDE = 25.7617;
const DEFAULT_LONGITUDE = -80.1918;

/* ------------------------------
   Styles
-------------------------------- */
const MAP_WRAP_STYLE: CSSProperties = {
    position: "absolute",
    right: -8,
    top: 10,
    width: 238,
    height: 92,
    opacity: 0.78,
    pointerEvents: "none",
};

const MAP_GLOW_STYLE: CSSProperties = {
    position: "absolute",
    left: 54,
    top: 20,
    width: 76,
    height: 58,
    borderRadius: 999,
    background:
        "radial-gradient(circle, color-mix(in srgb, var(--orb-ring-3) 32%, transparent), transparent 68%)",
    filter: "blur(8px)",
};

const SVG_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
};

const PIN_STYLE: CSSProperties = {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "var(--orb-ring-3)",
    boxShadow: `
        0 0 0 5px color-mix(in srgb, var(--orb-ring-3) 18%, transparent),
        0 0 18px color-mix(in srgb, var(--orb-ring-3) 46%, transparent)
    `,
    transform: "translate(-50%, -50%)",
};

/* ------------------------------
   Utils
-------------------------------- */
function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function projectLocation(latitude: number, longitude: number) {
    const safeLatitude = clamp(latitude, -85, 85);
    const safeLongitude = clamp(longitude, -180, 180);

    return {
        left: `${((safeLongitude + 180) / 360) * 100}%`,
        top: `${((90 - safeLatitude) / 180) * 100}%`,
    };
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextGlobe({
    latitude = DEFAULT_LATITUDE,
    longitude = DEFAULT_LONGITUDE,
}: EnvironmentContextGlobeProps) {
    const pinPosition = projectLocation(latitude, longitude);

    return (
        <div style={MAP_WRAP_STYLE} aria-hidden="true">
            <span style={MAP_GLOW_STYLE} />

            <svg
                style={SVG_STYLE}
                viewBox="0 0 360 180"
                role="presentation"
                focusable="false"
            >
                <defs>
                    <pattern
                        id="environment-context-map-dots"
                        width="5"
                        height="5"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle
                            cx="1.6"
                            cy="1.6"
                            r="0.9"
                            fill="var(--theme-text-secondary)"
                            opacity="0.42"
                        />
                    </pattern>

                    <linearGradient
                        id="environment-context-map-fade"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="16%" stopColor="white" stopOpacity="0.82" />
                        <stop offset="74%" stopColor="white" stopOpacity="0.72" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>

                    <mask id="environment-context-map-mask">
                        <rect
                            x="0"
                            y="0"
                            width="360"
                            height="180"
                            fill="url(#environment-context-map-fade)"
                        />
                    </mask>
                </defs>

                <g mask="url(#environment-context-map-mask)">
                    <path
                        d="M42 44c16-16 43-21 66-14 16 5 27 16 31 30 5 18-4 35-18 45-13 10-27 11-41 7-13-4-20-11-28-21-7-9-20-12-23-25-2-9 5-16 13-22Z"
                        fill="url(#environment-context-map-dots)"
                    />
                    <path
                        d="M92 104c13 7 24 17 29 31 4 12-1 26-10 36-8 9-21 6-27-4-8-13-4-27-8-40-3-10 4-17 16-23Z"
                        fill="url(#environment-context-map-dots)"
                        opacity="0.82"
                    />
                    <path
                        d="M160 50c18-12 45-12 63-3 10 5 16 13 14 23-2 12-14 17-25 18-14 2-28-1-41 3-13 4-28 0-33-11-5-10 8-21 22-30Z"
                        fill="url(#environment-context-map-dots)"
                        opacity="0.78"
                    />
                    <path
                        d="M218 82c20-6 45-3 64 7 18 10 31 27 37 47 3 10-1 18-11 20-16 3-31-11-44-19-16-10-33-12-48-21-13-8-19-24 2-34Z"
                        fill="url(#environment-context-map-dots)"
                        opacity="0.68"
                    />
                    <path
                        d="M276 42c15-10 38-8 52 3 10 8 12 19 3 27-12 11-31 7-44 2-12-5-23-21-11-32Z"
                        fill="url(#environment-context-map-dots)"
                        opacity="0.58"
                    />
                </g>
            </svg>

            <span
                style={{
                    ...PIN_STYLE,
                    left: pinPosition.left,
                    top: pinPosition.top,
                }}
            />
        </div>
    );
}