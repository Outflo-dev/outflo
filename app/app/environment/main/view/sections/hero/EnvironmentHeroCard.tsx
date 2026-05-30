// app/app/environment/main/view/sections/hero/EnvironmentHeroCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO CARD
   File: app/app/environment/main/view/sections/hero/EnvironmentHeroCard.tsx
   Scope: Own Environment hero glass data card composition
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: own content slot and weather object slot separately
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
    weatherObject?: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroCard({
    children,
    weatherObject,
}: EnvironmentHeroCardProps) {
    const CARD_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 2,
        minHeight: 146,
        width: "100%",
        display: "grid",
        alignItems: "center",
        padding: "12px 14px 11px",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.13)",
        background: "rgba(3,8,18,0.13)",
        boxShadow: "0 16px 38px rgba(0,0,0,0.18)",
        overflow: "hidden",
        isolation: "isolate",
    };

    const GLASS_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background:
            "linear-gradient(90deg, rgba(3,8,18,0.72), rgba(3,8,18,0.38) 62%, rgba(3,8,18,0.1))",
    };

    const CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 1,
        minWidth: 0,
        display: "grid",
        alignItems: "center",
        minHeight: 122,
        paddingRight: 124,
    };

    return (
        <div style={CARD_STYLE}>
            <div style={GLASS_STYLE} />

            <div style={CONTENT_STYLE}>{children}</div>

            {weatherObject}
        </div>
    );
}