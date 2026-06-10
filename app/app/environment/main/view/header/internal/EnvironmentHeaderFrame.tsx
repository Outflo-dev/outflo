// app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER FRAME
   File: app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx
   Scope: Own Environment sticky header layout and control zones
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: restore stable Environment header control layout
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderFrameProps = {
    left: ReactNode;
    right: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderFrame({
    left,
    right,
}: EnvironmentHeaderFrameProps) {
    const FRAME_STYLE: CSSProperties = {
        position: "sticky",
        top: 0,
        zIndex: 20,
        minHeight: 48,
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "center",
        columnGap: 12,
        padding: "2px 0 8px",
    };

    const GROUP_STYLE: CSSProperties = {
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: 8,
    };

    const RIGHT_GROUP_STYLE: CSSProperties = {
        ...GROUP_STYLE,
        justifySelf: "end",
    };

    return (
        <header style={FRAME_STYLE}>
            <div style={GROUP_STYLE}>{left}</div>
            <div style={RIGHT_GROUP_STYLE}>{right}</div>
        </header>
    );
}