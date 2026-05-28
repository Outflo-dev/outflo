// app/app/environment/main/view/rows/EnvironmentSummaryTile.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SUMMARY TILE
   File: app/app/environment/main/view/rows/EnvironmentSummaryTile.tsx
   Scope: Render one Environment landing summary tile
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment summary tile
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import type { EnvironmentSummaryTileModel } from "../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentSummaryTileProps = {
    model: EnvironmentSummaryTileModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentSummaryTile({
    model,
}: EnvironmentSummaryTileProps) {
    const TILE_STYLE: CSSProperties = {
        position: "relative",
        minHeight: 122,
        display: "grid",
        alignContent: "space-between",
        rowGap: 14,
        padding: 16,
        borderRadius: 26,
        border: "1px solid rgba(255,255,255,0.09)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0.035))",
        boxShadow: "0 18px 44px rgba(0,0,0,0.18)",
        overflow: "hidden",
    };

    const TOP_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    };

    const ACCENT_STYLE: CSSProperties = {
        width: 10,
        height: 10,
        borderRadius: 999,
        background: model.accent,
        boxShadow: `0 0 24px ${model.accent}`,
        flex: "0 0 auto",
        marginTop: 4,
    };

    const EYEBROW_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
    };

    const VALUE_STYLE: CSSProperties = {
        color: "var(--text-primary)",
        overflowWrap: "anywhere",
    };

    const DETAIL_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        overflowWrap: "anywhere",
    };

    return (
        <article style={TILE_STYLE}>
            <div style={TOP_STYLE}>
                <span style={ACCENT_STYLE} />

                <Chevron direction="right" />
            </div>

            <div>
                <Text as="p" type="meta" style={EYEBROW_STYLE}>
                    {model.eyebrow}
                </Text>

                <Text as="h3" type="label" style={VALUE_STYLE}>
                    {model.title}
                </Text>
            </div>

            <div>
                <Text as="p" type="label" style={VALUE_STYLE}>
                    {model.value}
                </Text>

                <Text as="p" type="meta" style={DETAIL_STYLE}>
                    {model.detail}
                </Text>
            </div>
        </article>
    );
}