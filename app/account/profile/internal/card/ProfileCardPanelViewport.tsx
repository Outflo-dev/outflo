"use client";

/* ==========================================================
   OUTFLO — PROFILE CARD PANEL VIEWPORT
   File: app/account/profile/internal/card/ProfileCardPanelViewport.tsx
   Scope: Clip ProfileCard panel track and own panel gesture boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
    children: ReactNode;
    swipeHandlers?: React.PointerEventHandler<HTMLDivElement> extends never
    ? never
    : {
        onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
        onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
        onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
        onPointerCancel?: React.PointerEventHandler<HTMLDivElement>;
    };
};

/* ------------------------------
   Constants
-------------------------------- */
const VIEWPORT_STYLE: React.CSSProperties = {
    minHeight: 0,
    flex: 1,
    overflow: "hidden",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileCardPanelViewport({
    children,
    swipeHandlers,
}: Props) {
    return (
        <div style={VIEWPORT_STYLE} {...swipeHandlers}>
            {children}
        </div>
    );
}