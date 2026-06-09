"use client";

/* ==========================================================
   OUTFLO — GLASS SHELL
   File: components/system/shell/glass/Glass.tsx
   Scope: Own reusable glass surface skin with no action or domain ownership
   Last Updated:
   - ms: 1780958934391
   - iso: 2026-06-08T22:48:54.391Z
   - note: introduce reusable glass shell for floating controls and panels
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type GlassProps = {
    children: ReactNode;
    radius?: number | string;
    padding?: CSSProperties["padding"];
    display?: CSSProperties["display"];
    alignItems?: CSSProperties["alignItems"];
    justifyContent?: CSSProperties["justifyContent"];
    gap?: number | string;
    style?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function Glass({
    children,
    radius = 999,
    padding = 0,
    display = "flex",
    alignItems = "center",
    justifyContent = "center",
    gap = 0,
    style,
}: GlassProps) {
    const GLASS_STYLE: CSSProperties = {
        display,
        alignItems,
        justifyContent,
        gap,
        padding,
        borderRadius: radius,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(18,22,30,0.46)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        backdropFilter: "blur(18px) saturate(1.2)",
        WebkitBackdropFilter: "blur(18px) saturate(1.2)",
        boxSizing: "border-box",
        ...style,
    };

    return <div style={GLASS_STYLE}>{children}</div>;
}
