"use client";

/* ==========================================================
   OUTFLO — ACCOUNT STATUS MARK
   File: components/system/primitives/marks/account/AccountStatusMark.tsx
   Scope: Render reusable account status mark
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: add account mark primitive for status rows
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function AccountStatusMark() {
    return (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="m8.5 12.25 2.25 2.25 4.75-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}