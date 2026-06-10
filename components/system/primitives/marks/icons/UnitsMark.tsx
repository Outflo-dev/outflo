"use client";

/* ==========================================================
   OUTFLO — UNITS MARK
   File: components/system/primitives/marks/icons/UnitsMark.tsx
   Scope: Render reusable units mark glyph
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: add reusable units mark for unit preference menu rows
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
export default function UnitsMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={SVG_STYLE}
        >
            <path
                d="M5 7.5h14M5 12h14M5 16.5h14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M8 5.25v4.5M16 9.75v4.5M11 14.25v4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}