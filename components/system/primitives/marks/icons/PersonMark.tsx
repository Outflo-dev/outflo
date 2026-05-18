"use client";

/* ==========================================================
   OUTFLO — PERSON MARK
   File: components/system/primitives/marks/icons/PersonMark.tsx
   Scope: Render reusable person mark glyph
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
export default function PersonMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={SVG_STYLE}
        >
            <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M5.75 19c.8-3.35 3-5 6.25-5s5.45 1.65 6.25 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}