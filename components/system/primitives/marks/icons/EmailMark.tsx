"use client";

/* ==========================================================
   OUTFLO — EMAIL MARK
   File: components/system/primitives/marks/icons/EmailMark.tsx
   Scope: Render reusable email mark glyph
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: move generic mark icons into marks/icons
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function EmailMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            style={{
                width: "var(--mark-icon-size)",
                height: "var(--mark-icon-size)",
                display: "block",
                flexShrink: 0,
            }}
        >
            <path d="M4 6.5h16v11H4z" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="m4.75 7.25 7.25 5.5 7.25-5.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}