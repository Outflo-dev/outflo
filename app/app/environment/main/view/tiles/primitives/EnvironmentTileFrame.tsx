"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT TILE FRAME
   File: app/app/environment/main/view/tiles/primitives/EnvironmentTileFrame.tsx
   Scope: Own reusable Environment tile frame structure
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import EnvironmentCard from "../../primitives/EnvironmentCard";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentTileFrameProps = {
    children: ReactNode;
    ariaLabel: string;
    style?: CSSProperties;
};

/* ------------------------------
   Styles
-------------------------------- */
const FRAME_STYLE: CSSProperties = {
    minHeight: 220,
    padding: 18,
    borderRadius: 22,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentTileFrame({
    children,
    ariaLabel,
    style,
}: EnvironmentTileFrameProps) {
    return (
        <EnvironmentCard
            variant="raised"
            ariaLabel={ariaLabel}
            style={{
                ...FRAME_STYLE,
                ...style,
            }}
        >
            {children}
        </EnvironmentCard>
    );
}