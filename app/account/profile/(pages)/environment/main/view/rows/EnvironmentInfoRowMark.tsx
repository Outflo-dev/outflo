"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT INFO ROW MARK
   File: app/account/profile/(pages)/environment/main/view/rows/EnvironmentInfoRowMark.tsx
   Scope: Resolve environment row mark icons
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add local environment marks while reusing existing primitives where available
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import SunMark from "@/components/system/primitives/marks/icons/SunMark";
import TimeMark from "@/components/system/primitives/marks/icons/TimeMark";

import type { EnvironmentInfoRowMarkKind } from "../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentInfoRowMarkProps = {
    mark: EnvironmentInfoRowMarkKind;
};

/* ------------------------------
   Constants
-------------------------------- */
const MARK_ICON_STYLE: CSSProperties = {
    width: "var(--mark-icon-size)",
    height: "var(--mark-icon-size)",
    display: "block",
    flexShrink: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentInfoRowMark({
    mark,
}: EnvironmentInfoRowMarkProps) {
    if (mark === "location") return <LocationMark />;
    if (mark === "weather") return <SunMark />;
    if (mark === "runtime") return <TimeMark />;
    if (mark === "snapshot") return <SnapshotMark />;
    if (mark === "receipt") return <ReceiptMark />;

    return <CaptureMark />;
}

/* ------------------------------
   Local Marks
-------------------------------- */
function LocationMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={MARK_ICON_STYLE}
        >
            <path d="M11 19s5.5-5.2 5.5-9.2A5.5 5.5 0 0 0 5.5 9.8C5.5 13.8 11 19 11 19Z" />
            <circle cx="11" cy="9.8" r="1.7" />
        </svg>
    );
}

function CaptureMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={MARK_ICON_STYLE}
        >
            <circle cx="11" cy="11" r="6.5" />
            <circle cx="11" cy="11" r="2" />
            <path d="M11 2.8v2" />
            <path d="M11 17.2v2" />
            <path d="M2.8 11h2" />
            <path d="M17.2 11h2" />
        </svg>
    );
}

function SnapshotMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={MARK_ICON_STYLE}
        >
            <rect x="4.5" y="6" width="13" height="10.5" rx="2" />
            <path d="M8.5 6 9.8 4.5h2.4L13.5 6" />
            <circle cx="11" cy="11.3" r="2.4" />
        </svg>
    );
}

function ReceiptMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={MARK_ICON_STYLE}
        >
            <path d="M7 4.5h8a1.5 1.5 0 0 1 1.5 1.5v11.5l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2V6A1.5 1.5 0 0 1 7 4.5Z" />
            <path d="M8 9h6" />
            <path d="M8 12h5" />
        </svg>
    );
}