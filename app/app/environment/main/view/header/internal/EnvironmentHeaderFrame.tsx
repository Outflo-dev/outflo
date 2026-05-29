// app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER FRAME
   File: app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx
   Scope: Own Environment header layout and scene control zones
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract Environment header frame ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderFrameProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderFrame({
    children,
}: EnvironmentHeaderFrameProps) {
    const FRAME_STYLE: CSSProperties = {
        minHeight: 42,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        alignItems: "start",
        columnGap: 12,
    };

    return <header style={FRAME_STYLE}>{children}</header>;
}