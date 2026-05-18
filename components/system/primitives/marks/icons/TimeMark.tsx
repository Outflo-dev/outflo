"use client";

/* ==========================================================
   OUTFLO — TIME MARK
   File: components/system/primitives/marks/icons/TimeMark.tsx
   Scope: Render reusable time mark glyph
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
export default function TimeMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={SVG_STYLE}
        >
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M12 7.75V12l3 2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}