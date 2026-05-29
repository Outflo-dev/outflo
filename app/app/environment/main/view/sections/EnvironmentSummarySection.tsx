// app/app/environment/main/view/sections/EnvironmentSummarySection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SUMMARY SECTION
   File: app/app/environment/main/view/sections/EnvironmentSummarySection.tsx
   Scope: Render Environment landing page summary tiles
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: compress summary grid into one-screen Environment composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { EnvironmentSummarySectionModel } from "../../internal/environment.types";
import EnvironmentSummaryTile from "../rows/EnvironmentSummaryTile";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentSummarySectionProps = {
    model: EnvironmentSummarySectionModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentSummarySection({
    model,
}: EnvironmentSummarySectionProps) {
    const SECTION_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 6,
    };

    const HEADER_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 0,
    };

    const TITLE_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    };

    const SUBTITLE_STYLE: CSSProperties = {
        display: "none",
    };

    const GRID_STYLE: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 6,
    };

    return (
        <section style={SECTION_STYLE}>
            <header style={HEADER_STYLE}>
                <Text as="h2" type="meta" style={TITLE_STYLE}>
                    {model.title}
                </Text>

                <Text as="p" type="meta" style={SUBTITLE_STYLE}>
                    {model.subtitle}
                </Text>
            </header>

            <div style={GRID_STYLE}>
                {model.tiles.map((tile) => (
                    <EnvironmentSummaryTile key={tile.title} model={tile} />
                ))}
            </div>
        </section>
    );
}