"use client";

/* ==========================================================
   OUTFLO — SETTINGS MARK
   File: components/system/primitives/marks/icons/SettingsMark.tsx
   Scope: Render reusable settings mark glyph
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: add reusable settings mark for menu and settings affordances
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
export default function SettingsMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={SVG_STYLE}
        >
            <circle
                cx="12"
                cy="12"
                r="3.25"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M12 3.5v2.1M12 18.4v2.1M4.58 7.25l1.82 1.05M17.6 15.7l1.82 1.05M4.58 16.75l1.82-1.05M17.6 8.3l1.82-1.05"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}