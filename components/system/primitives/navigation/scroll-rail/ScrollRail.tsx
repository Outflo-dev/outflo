"use client";

/* ==========================================================
   OUTFLO — SCROLL RAIL
   File: components/system/primitives/navigation/scroll-rail/ScrollRail.tsx
   Scope: Own reusable horizontal scroll rail behavior
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: add reusable horizontal snap rail primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type ScrollRailProps = {
    children: ReactNode;
    ariaLabel?: string;
    gap?: number;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
};

/* ------------------------------
   Component
-------------------------------- */
export default function ScrollRail({
    children,
    ariaLabel,
    gap = 8,
    style,
    contentStyle,
}: ScrollRailProps) {
    const RAIL_STYLE: CSSProperties = {
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        ...style,
    };

    const CONTENT_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "stretch",
        gap,
        width: "100%",
        minWidth: 0,
        overflowX: "auto",
        overflowY: "hidden",
        overscrollBehaviorX: "contain",
        scrollSnapType: "x proximity",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        ...contentStyle,
    };

    return (
        <div aria-label={ariaLabel} role={ariaLabel ? "region" : undefined} style={RAIL_STYLE}>
            <div className="outflo-scroll-rail__content" style={CONTENT_STYLE}>
                {children}
            </div>

            <style>{`
                .outflo-scroll-rail__content::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}