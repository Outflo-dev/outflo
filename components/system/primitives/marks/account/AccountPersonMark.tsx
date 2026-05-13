"use client";

/* ==========================================================
   OUTFLO — ACCOUNT PERSON MARK
   File: components/system/primitives/marks/account/AccountPersonMark.tsx
   Scope: Render reusable account person mark
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: add account mark primitive for identity rows
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function AccountPersonMark() {
    return (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
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