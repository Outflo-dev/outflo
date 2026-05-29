// app/app/environment/main/view/frame/EnvironmentSceneFrame.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SCENE FRAME
   File: app/app/environment/main/view/frame/EnvironmentSceneFrame.tsx
   Scope: Own Environment cinematic top scene frame
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: tighten scene frame side rhythm and top composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentSceneFrameProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentSceneFrame({
    children,
}: EnvironmentSceneFrameProps) {
    const SCENE_STYLE: CSSProperties = {
        position: "relative",
        display: "grid",
        rowGap: 6,
        margin: "-6px 0 0",
        padding: "8px 0 8px",
        overflow: "hidden",
        borderRadius: 28,
        backgroundImage: `
            linear-gradient(180deg, rgba(3,8,18,0.02), rgba(3,8,18,0.24) 54%, rgba(3,8,18,0.68)),
            linear-gradient(90deg, rgba(3,8,18,0.58), rgba(3,8,18,0.16) 58%, rgba(3,8,18,0.02)),
            url("/environment/hero/day-clouds.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center right",
    };

    const GLOW_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
            "radial-gradient(circle at 82% 20%, rgba(255,223,150,0.2), transparent 25%), linear-gradient(180deg, rgba(255,255,255,0.055), transparent 34%)",
        opacity: 0.82,
    };

    const CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 1,
        display: "grid",
        rowGap: 6,
        paddingInline: 10,
    };

    return (
        <section style={SCENE_STYLE}>
            <div style={GLOW_STYLE} />

            <div style={CONTENT_STYLE}>{children}</div>
        </section>
    );
}