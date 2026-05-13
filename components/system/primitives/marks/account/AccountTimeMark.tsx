"use client";

/* ==========================================================
   OUTFLO — ACCOUNT TIME MARK
   File: components/system/primitives/marks/account/AccountTimeMark.tsx
   Scope: Render reusable account time mark
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: add account mark primitive for epoch and date rows
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function AccountTimeMark() {
    return (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
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