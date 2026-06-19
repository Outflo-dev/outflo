// app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx

"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER FRAME
   File: app/app/environment/main/view/header/internal/EnvironmentHeaderFrame.tsx
   Scope: Own Environment sticky header layout, layer, and control zones
   Last Updated:
   - note: support Kelvin header mock layout with left / center / right zones
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
    center: ReactNode;
    right: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderFrame({
    left,
    center,
    right,
}: EnvironmentHeaderFrameProps) {
    const FRAME_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 80,
        minHeight: "clamp(56px, 8.2vh, 70px)",
        display: "grid",
        placeItems: "center",
        padding: "clamp(4px, 1vh, 8px) 0 clamp(6px, 1.15vh, 11px)",
        overflow: "visible",
    };

    const LEFT_GROUP_STYLE: CSSProperties = {
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
    };

    const CENTER_GROUP_STYLE: CSSProperties = {
        minWidth: 0,
        maxWidth: "min(50vw, 300px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "translateY(4px)",
    };

    const RIGHT_GROUP_STYLE: CSSProperties = {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "clamp(4px, 1vw, 7px)",
        zIndex: 1,
    };
    return (
        <header style={FRAME_STYLE}>
            <div style={LEFT_GROUP_STYLE}>{left}</div>
            <div style={CENTER_GROUP_STYLE}>{center}</div>
            <div style={RIGHT_GROUP_STYLE}>{right}</div>
        </header>
    );
}