// app/app/environment/main/view/sections/hero/EnvironmentHeroLivePill.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO LIVE PILL
   File: app/app/environment/main/view/sections/hero/EnvironmentHeroLivePill.tsx
   Scope: Own Environment hero live-state pill
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract hero live pill ownership from hero section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroLivePill() {
    const PILL_STYLE: CSSProperties = {
        width: "fit-content",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 7px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.11)",
        border: "1px solid rgba(255,255,255,0.13)",
        color: "rgba(255,255,255,0.84)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontSize: 9,
        fontWeight: 700,
    };

    const DOT_STYLE: CSSProperties = {
        width: 5,
        height: 5,
        borderRadius: 999,
        background: "#5ee0b6",
        boxShadow: "0 0 12px rgba(94,224,182,0.82)",
    };

    return (
        <div style={PILL_STYLE}>
            <span style={DOT_STYLE} />
            Live Environment
        </div>
    );
}