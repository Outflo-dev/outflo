"use client";

/* ==========================================================
   OUTFLO — MARK FRAME
   File: components/system/primitives/marks/frame/MarkFrame.tsx
   Scope: Provide reusable mark field sizing, centering, and inherited color
   Last Updated:
   - ms: 1779058286512
   - iso: 2026-05-17T22:51:26.512Z
   - note: add generic mark frame for account and profile row primitives
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type MarkFrameProps = {
    children: ReactNode;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    width: "var(--mark-frame-size)",
    height: "var(--mark-frame-size)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--mark-frame-color)",
    flexShrink: 0,
};

/* ------------------------------
   Component
-------------------------------- */
export default function MarkFrame({
    children,
    style,
}: MarkFrameProps) {
    return (
        <span style={{ ...FRAME_STYLE, ...style }}>
            {children}
        </span>
    );
}