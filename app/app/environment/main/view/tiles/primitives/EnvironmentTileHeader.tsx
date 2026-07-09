"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT TILE HEADER
   File: app/app/environment/main/view/tiles/primitives/EnvironmentTileHeader.tsx
   Scope: Own reusable Environment tile header grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentTileHeaderProps = {
    label: string;
    mark?: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 9,
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,
    color: "var(--theme-text-secondary)",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
};

const DEFAULT_MARK_STYLE: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "var(--theme-accent)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentTileHeader({
    label,
    mark,
}: EnvironmentTileHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            {mark ?? <span style={DEFAULT_MARK_STYLE} aria-hidden="true" />}
            <p style={LABEL_STYLE}>{label}</p>
        </header>
    );
}