"use client";

/* ==========================================================
   OUTFLO — FLOWS INFO ROW MARK
   File: app/account/profile/(pages)/flows/main/view/rows/FlowsInfoRowMark.tsx
   Scope: Resolve flows row mark icons
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add local flows marks while reusing existing primitives where available
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import SunMark from "@/components/system/primitives/marks/icons/SunMark";
import TimeMark from "@/components/system/primitives/marks/icons/TimeMark";

import type { FlowsInfoRowMarkKind } from "../../internal/flows.types";

/* ------------------------------
   Types
-------------------------------- */
type FlowsInfoRowMarkProps = {
    mark: FlowsInfoRowMarkKind;
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
export default function FlowsInfoRowMark({ mark }: FlowsInfoRowMarkProps) {
    if (mark === "money") return <MoneyMark />;
    if (mark === "time") return <TimeMark />;
    if (mark === "environment") return <SunMark />;

    return <IngestMark />;
}

/* ------------------------------
   Local Marks
-------------------------------- */
function MoneyMark() {
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
            <path d="M5 7.5h12" />
            <path d="M5 14.5h12" />
            <path d="M8.5 4.5 6.5 17.5" />
            <path d="M15.5 4.5l-2 13" />
        </svg>
    );
}

function IngestMark() {
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
            <path d="M4.5 6.5h8" />
            <path d="M4.5 11h6" />
            <path d="M4.5 15.5h8" />
            <path d="M14.5 8.5 18 11l-3.5 2.5" />
        </svg>
    );
}