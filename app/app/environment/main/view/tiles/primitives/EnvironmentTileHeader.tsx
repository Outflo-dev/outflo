"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT TILE HEADER
   File: app/app/environment/main/view/tiles/primitives/EnvironmentTileHeader.tsx
   Scope: Own reusable Environment tile header grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import { VISUAL } from "../../../../../../../components/system/primitives/visuals";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentTileHeaderProps = {
    label: string;
    mark?: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: VISUAL.spacing[3],
};

const LABEL_STYLE: CSSProperties = {
    margin: 0,
    color: VISUAL.text[7],
    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[5],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: VISUAL.type.line[1],
    letterSpacing: VISUAL.type.tracking[10],
    textTransform: VISUAL.type.transform[2],
};

const DEFAULT_MARK_STYLE: CSSProperties = {
    width: VISUAL.spacing[4],
    height: VISUAL.spacing[4],
    flex: "0 0 auto",
    borderRadius: VISUAL.radius[10],
    background: VISUAL.accent[9],
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentTileHeader({
    label,
    mark,
}: EnvironmentTileHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            {mark ?? <span style={DEFAULT_MARK_STYLE} aria-hidden="true" />}
            <p style={LABEL_STYLE}>{label}</p>
        </header>
    );
}