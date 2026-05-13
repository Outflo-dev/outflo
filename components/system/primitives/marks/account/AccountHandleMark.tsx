"use client";

/* ==========================================================
   OUTFLO — ACCOUNT HANDLE MARK
   File: components/system/primitives/marks/account/AccountHandleMark.tsx
   Scope: Render reusable account handle mark
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: add account mark primitive for username rows
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function AccountHandleMark() {
    return (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M15.5 12a3.5 3.5 0 1 1-1-2.45V12c0 1.1.8 1.75 1.75 1.75.75 0 1.45-.35 1.95-.95"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}