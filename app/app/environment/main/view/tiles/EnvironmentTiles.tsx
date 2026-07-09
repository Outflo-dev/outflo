"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT TILES
   File: app/app/environment/main/view/tiles/EnvironmentTiles.tsx
   Scope: Compose Environment tile region under Kelvin center
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentTilesModel } from "../../internal/environment.types";
import EnvironmentAirTile from "./air/EnvironmentAirTile";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentTilesProps = {
    model: EnvironmentTilesModel;
};

/* ------------------------------
   Styles
-------------------------------- */
const TILE_GRID_STYLE: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "clamp(132px, 29vw, 178px)",
    gap: 12,
    alignItems: "stretch",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentTiles({ model }: EnvironmentTilesProps) {
    return (
        <section style={TILE_GRID_STYLE} aria-label="Environment tiles">
            <EnvironmentAirTile model={model.air} />
        </section>
    );
}