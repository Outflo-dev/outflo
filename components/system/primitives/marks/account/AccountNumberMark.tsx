"use client";

/* ==========================================================
   OUTFLO — ACCOUNT NUMBER MARK
   File: components/system/primitives/marks/account/AccountNumberMark.tsx
   Scope: Render reusable account number mark
   Last Updated:
   - ms: 1778645071428
   - iso: 2026-05-13T04:04:31.428Z
   - note: add account mark primitive for account number rows
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function AccountNumberMark() {
    return (
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M8 4.5 6.5 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M17.5 4.5 16 19.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M5 9h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M4 15h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}