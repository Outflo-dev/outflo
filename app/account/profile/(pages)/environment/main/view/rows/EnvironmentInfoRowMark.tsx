"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT INFO ROW MARK
   File: app/account/profile/(pages)/environment/main/view/rows/EnvironmentInfoRowMark.tsx
   Scope: Resolve environment row mark icons
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add signal marks for sun precipitation weather and air quality
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import SunMark from "@/components/system/primitives/marks/icons/SunMark";

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
    if (mark === "environment") return <EnvironmentMark />;
    if (mark === "location") return <LocationMark />;
    if (mark === "capture") return <CaptureMark />;
    if (mark === "sun") return <SunMark />;
    if (mark === "precipitation") return <PrecipitationMark />;
    if (mark === "weather") return <WeatherMark />;
    if (mark === "air") return <AirMark />;
    if (mark === "snapshot") return <SnapshotMark />;

    return <ReceiptMark />;
}

/* ------------------------------
   Local Marks
-------------------------------- */
function EnvironmentMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <path d="M4.5 14.5c2-1.7 4.2-2.1 6.5-1.2 2.7 1 4.8.3 6.5-1.8" />
            <path d="M5.5 8.5c1.9-1.8 4-2.3 6.3-1.5 2.6.9 4.3.4 5.7-1.5" />
            <path d="M6 17.5h10" />
        </svg>
    );
}

function LocationMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <path d="M11 19s5.5-5.2 5.5-9.2A5.5 5.5 0 0 0 5.5 9.8C5.5 13.8 11 19 11 19Z" />
            <circle cx="11" cy="9.8" r="1.7" />
        </svg>
    );
}

function CaptureMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <circle cx="11" cy="11" r="6.5" />
            <circle cx="11" cy="11" r="2" />
            <path d="M11 2.8v2" />
            <path d="M11 17.2v2" />
            <path d="M2.8 11h2" />
            <path d="M17.2 11h2" />
        </svg>
    );
}

function PrecipitationMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <path d="M7.5 9.2a4.2 4.2 0 0 1 8.1 1.1A3.2 3.2 0 0 1 15 16.6H7.8A3.3 3.3 0 0 1 7.5 10" />
            <path d="M8.5 18.5v.2" />
            <path d="M11 18.5v.2" />
            <path d="M13.5 18.5v.2" />
        </svg>
    );
}

function WeatherMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <circle cx="8" cy="8" r="3.2" />
            <path d="M4.8 14.5h10.4a2.8 2.8 0 0 0 0-5.6 4.3 4.3 0 0 0-8.2 1.2" />
        </svg>
    );
}

function AirMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <path d="M4.5 8h8.8a2 2 0 1 0-1.8-2.8" />
            <path d="M4.5 11.5h12.2a2 2 0 1 1-1.8 2.8" />
            <path d="M4.5 15h6.5" />
        </svg>
    );
}

function SnapshotMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <rect x="4.5" y="6" width="13" height="10.5" rx="2" />
            <path d="M8.5 6 9.8 4.5h2.4L13.5 6" />
            <circle cx="11" cy="11.3" r="2.4" />
        </svg>
    );
}

function ReceiptMark() {
    return (
        <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={MARK_ICON_STYLE}>
            <path d="M7 4.5h8a1.5 1.5 0 0 1 1.5 1.5v11.5l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2V6A1.5 1.5 0 0 1 7 4.5Z" />
            <path d="M8 9h6" />
            <path d="M8 12h5" />
        </svg>
    );
}