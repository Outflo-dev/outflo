"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT MARK
   File: components/system/primitives/marks/icons/EnvironmentMark.tsx
   Scope: Render reusable environment leaf mark glyph
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: add reusable environment mark for environment menu rows
   ========================================================== */

/* ------------------------------
   Constants
-------------------------------- */
const SVG_STYLE = {
    width: "var(--mark-icon-size)",
    height: "var(--mark-icon-size)",
    display: "block",
    flexShrink: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={SVG_STYLE}
        >
            <path
                d="M18.75 5.25C11.6 5.55 6.5 9.35 5.25 16.75C12.65 15.5 16.45 10.4 18.75 5.25Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.25 16.75C8.6 12.55 11.75 10.15 15.25 8.25"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}