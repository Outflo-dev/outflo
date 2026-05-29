// app/app/environment/main/view/sections/hero/EnvironmentHeroCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO CARD
   File: app/app/environment/main/view/sections/hero/EnvironmentHeroCard.tsx
   Scope: Own Environment hero glass data card only
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: restrict hero card ownership to data glass panel
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroCardProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroCard({
    children,
}: EnvironmentHeroCardProps) {
    const CARD_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 2,
        minHeight: 146,
        width: "calc(100% - 76px)",
        display: "grid",
        alignItems: "center",
        padding: "12px 13px 11px",
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.13)",
        background: "rgba(3,8,18,0.13)",
        boxShadow: "0 14px 34px rgba(0,0,0,0.17)",
        overflow: "hidden",
        isolation: "isolate",
    };

    const GLASS_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background:
            "linear-gradient(90deg, rgba(3,8,18,0.68), rgba(3,8,18,0.3) 70%, rgba(3,8,18,0.12))",
    };

    const CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 1,
        minWidth: 0,
    };

    return (
        <div style={CARD_STYLE}>
            <div style={GLASS_STYLE} />

            <div style={CONTENT_STYLE}>{children}</div>
        </div>
    );
}