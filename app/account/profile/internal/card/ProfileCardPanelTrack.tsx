"use client";

/* ==========================================================
   OUTFLO — PROFILE CARD PANEL TRACK
   File: app/account/profile/internal/card/ProfileCardPanelTrack.tsx
   Scope: Render horizontal ProfileCard panel track
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";
import type { ProfileCardPanel } from "./profile-card.types";

/* ------------------------------
   Types
-------------------------------- */
type Props = {
    activePanel: ProfileCardPanel | null;
    children: ReactNode;
};

/* ------------------------------
   Constants
-------------------------------- */
const PANEL_ORDER: readonly ProfileCardPanel[] = [
    "avatar",
    "controls",
    "theme",
];

const TRACK_STYLE: React.CSSProperties = {
    display: "flex",
    minHeight: 0,
    height: "100%",
    width: "100%",
    transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ProfileCardPanelTrack({
    activePanel,
    children,
}: Props) {
    const activeIndex = activePanel
        ? Math.max(0, PANEL_ORDER.indexOf(activePanel))
        : 0;

    return (
        <div
            style={{
                ...TRACK_STYLE,
                transform: `translateX(-${activeIndex * 100}%)`,
            }}
        >
            {children}
        </div>
    );
}