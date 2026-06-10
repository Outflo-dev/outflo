"use client";

/* ==========================================================
   OUTFLO — MENU CARD FRAME
   File: components/system/surfaces/card/types/menu/MenuCardFrame.tsx
   Scope: Own reusable anchored menu card frame and surface skin
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: use opaque gray menu surface without transparent app surface tokens
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import CardBase from "../../base/CardBase";

/* ------------------------------
   Types
-------------------------------- */
type MenuCardFrameProps = {
    children: ReactNode;
    align?: "left" | "right";
    width?: number | string;
    minWidth?: number | string;
};

/* ------------------------------
   Styles
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    position: "absolute",
    top: "calc(100% + 10px)",
    zIndex: 60,
    overflow: "hidden",
    borderRadius: 30,
    border: "1px solid color-mix(in srgb, var(--text-primary) 12%, var(--bg-primary) 88%)",
    background: "color-mix(in srgb, var(--bg-primary) 76%, var(--text-primary) 24%)",
    boxShadow: "0 22px 60px color-mix(in srgb, var(--bg-primary) 68%, transparent)",
    isolation: "isolate",
};

const CONTENT_STYLE: CSSProperties = {
    padding: 10,
};

/* ------------------------------
   Component
-------------------------------- */
export default function MenuCardFrame({
    children,
    align = "right",
    width,
    minWidth = 220,
}: MenuCardFrameProps) {
    const placementStyle: CSSProperties =
        align === "right"
            ? {
                right: 0,
            }
            : {
                left: 0,
            };

    return (
        <CardBase
            style={{
                ...FRAME_STYLE,
                ...placementStyle,
                width,
                minWidth,
            }}
        >
            <div style={CONTENT_STYLE}>{children}</div>
        </CardBase>
    );
}