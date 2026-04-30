"use client";

/* ==========================================================
   OUTFLO — PROFILE CARD PANEL SLOT
   File: app/account/profile/internal/card/ProfileCardPanelSlot.tsx
   Scope: Render one ProfileCard panel slot with isolated vertical scroll
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
};

/* ------------------------------
   Constants
-------------------------------- */
const SLOT_STYLE: React.CSSProperties = {
    width: "100%",
    minWidth: "100%",
    minHeight: 0,
    height: "100%",
    flexShrink: 0,
};

const SCROLL_STYLE: React.CSSProperties = {
    minHeight: 0,
    height: "100%",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    overscrollBehavior: "contain",
    touchAction: "pan-y",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileCardPanelSlot({ children }: Props) {
    return (
        <div style={SLOT_STYLE}>
            <div style={SCROLL_STYLE}>
                {children}
            </div>
        </div>
    );
}