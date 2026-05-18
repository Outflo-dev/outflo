"use client";

/* ==========================================================
   OUTFLO — NUMBER MARK
   File: components/system/primitives/marks/icons/NumberMark.tsx
   Scope: Render reusable number mark glyph
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
export default function NumberMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={SVG_STYLE}
        >
            <path d="M8 4.5 6.5 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M17.5 4.5 16 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M5 9h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M4 15h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}