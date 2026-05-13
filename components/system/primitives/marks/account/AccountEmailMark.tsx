"use client";

/* ==========================================================
   OUTFLO — ACCOUNT EMAIL MARK
   File: components/system/primitives/marks/account/AccountEmailMark.tsx
   Scope: Render reusable account email mark
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: add account mark primitive for email rows
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function AccountEmailMark() {
    return (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
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