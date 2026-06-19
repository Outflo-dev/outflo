// app/app/environment/main/view/header/internal/EnvironmentBellAction.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT BELL ACTION
   File: app/app/environment/main/view/header/internal/EnvironmentBellAction.tsx
   Scope: Render hardcoded Environment attention/action bell
   Last Updated:
   - note: hardcode mock bell action before extraction
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentBellAction() {
    const BUTTON_STYLE: CSSProperties = {
        width: 32,
        height: 32,
        border: 0,
        padding: 0,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        color: "rgba(255, 255, 255, 0.82)",
        background: "transparent",
        cursor: "default",
    };

    const SVG_STYLE: CSSProperties = {
        width: 25,
        height: 25,
        display: "block",
    };

    return (
        <button type="button" aria-label="Environment alerts" style={BUTTON_STYLE}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={SVG_STYLE}
                aria-hidden="true"
            >
                <path d="M18 8.8a6 6 0 0 0-12 0c0 7.2-2.4 7.7-2.4 7.7h16.8S18 16 18 8.8Z" />
                <path d="M9.8 19.4a2.5 2.5 0 0 0 4.4 0" />
            </svg>
        </button>
    );
}