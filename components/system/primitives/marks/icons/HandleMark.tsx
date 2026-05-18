"use client";

/* ==========================================================
   OUTFLO — HANDLE MARK
   File: components/system/primitives/marks/icons/HandleMark.tsx
   Scope: Render reusable handle mark glyph
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: move svg token sizing into style for reliable rendering
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
export default function HandleMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={SVG_STYLE}
        >
            <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M15.5 12a3.5 3.5 0 1 1-1-2.45V12c0 1.1.8 1.75 1.75 1.75.75 0 1.45-.35 1.95-.95"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}