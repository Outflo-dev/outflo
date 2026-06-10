// app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER FRAME
   File: app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx
   Scope: Own Environment sticky header layout and control zones
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: make Environment header sticky with subtle top fade layer
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
   Styles
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    position: "sticky",
    top: -1,
    zIndex: 20,
    minHeight: 58,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 12,
    paddingTop: 10,
    paddingBottom: 8,
    marginBottom: 4,
};

const FADE_STYLE: CSSProperties = {
    position: "absolute",
    top: 0,
    left: -24,
    right: -24,
    height: 70,
    zIndex: -1,
    pointerEvents: "none",
    background:
        "linear-gradient(180deg, color-mix(in srgb, var(--bg-primary) 96%, transparent) 0%, color-mix(in srgb, var(--bg-primary) 82%, transparent) 38%, color-mix(in srgb, var(--bg-primary) 0%, transparent) 100%)",
    backdropFilter: "blur(14px) saturate(1.08)",
    WebkitBackdropFilter: "blur(14px) saturate(1.08)",
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

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderFrame({
    left,
    right,
}: EnvironmentHeaderFrameProps) {
    return (
        <header style={FRAME_STYLE}>
            <div style={FADE_STYLE} />

            <div style={GROUP_STYLE}>{left}</div>
            <div style={RIGHT_GROUP_STYLE}>{right}</div>
        </header>
    );
}