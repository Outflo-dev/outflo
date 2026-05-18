"use client";

/* ==========================================================
   OUTFLO — SUN MARK
   File: components/system/primitives/marks/icons/SunMark.tsx
   Scope: Render reusable sun mark glyph
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: extract shared sun glyph for profile display surfaces
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
export default function SunMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={SVG_STYLE}
        >
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2.75v2.5" />
            <path d="M12 18.75v2.5" />
            <path d="M21.25 12h-2.5" />
            <path d="M5.25 12h-2.5" />
            <path d="m18.55 5.45-1.75 1.75" />
            <path d="m7.2 16.8-1.75 1.75" />
            <path d="m18.55 18.55-1.75-1.75" />
            <path d="m7.2 7.2-1.75-1.75" />
        </svg>
    );
}