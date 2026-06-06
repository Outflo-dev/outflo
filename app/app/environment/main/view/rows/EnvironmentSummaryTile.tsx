// app/app/environment/main/view/rows/EnvironmentSummaryTile.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SUMMARY TILE
   File: app/app/environment/main/view/rows/EnvironmentSummaryTile.tsx
   Scope: Own one Environment summary tile overlay
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: soften summary tile into atmospheric overlay instead of lower surface card
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

type EnvironmentTileIconProps = {
    title: string;
    accent: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentSummaryTile({
    model,
}: EnvironmentSummaryTileProps) {
    const TILE_STYLE: CSSProperties = {
        position: "relative",
        height: 68,
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr) auto",
        columnGap: 6,
        alignItems: "center",
        padding: 8,
        borderRadius: 17,
        border: "1px solid var(--border-soft)",
        background: "var(--surface-muted)",
        boxShadow: "var(--glow-ring)",
        overflow: "hidden",
    };

    const COPY_STYLE: CSSProperties = {
        minWidth: 0,
        display: "grid",
        rowGap: 0,
    };

    const TEXT_CLAMP_STYLE: CSSProperties = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    const TITLE_STYLE: CSSProperties = {
        ...TEXT_CLAMP_STYLE,
        color: "var(--text-primary)",
    };

    const VALUE_STYLE: CSSProperties = {
        ...TEXT_CLAMP_STYLE,
        color: "var(--text-secondary)",
    };

    const DETAIL_STYLE: CSSProperties = {
        ...TEXT_CLAMP_STYLE,
        color: "var(--text-tertiary)",
    };

    const CHEVRON_WRAP_STYLE: CSSProperties = {
        opacity: 0.46,
    };

    return (
        <article style={TILE_STYLE}>
            <EnvironmentTileIcon title={model.title} accent={model.accent} />

            <div style={COPY_STYLE}>
                <Text as="h3" type="label" style={TITLE_STYLE}>
                    {model.title}
                </Text>

                <Text as="p" type="meta" style={VALUE_STYLE}>
                    {model.value}
                </Text>

                <Text as="p" type="meta" style={DETAIL_STYLE}>
                    {model.detail}
                </Text>
            </div>

            <span style={CHEVRON_WRAP_STYLE}>
                <Chevron direction="right" />
            </span>
        </article>
    );
}

/* ------------------------------
   Subcomponents
-------------------------------- */
function EnvironmentTileIcon({ title, accent }: EnvironmentTileIconProps) {
    const ICON_STYLE: CSSProperties = {
        width: 28,
        height: 28,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        color: accent,
        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
        boxShadow: `0 0 16px color-mix(in srgb, ${accent} 18%, transparent)`,
        fontSize: 12,
        fontWeight: 800,
        lineHeight: 1,
        flexShrink: 0,
    };

    return (
        <span aria-hidden="true" style={ICON_STYLE}>
            {getTileMark(title)}
        </span>
    );
}

/* ------------------------------
   Helpers
-------------------------------- */
function getTileMark(title: string) {
    const key = title.toLowerCase();

    if (key.includes("place")) return "⌖";
    if (key.includes("weather")) return "°";
    if (key.includes("sun")) return "☉";
    if (key.includes("air")) return "AQ";
    if (key.includes("altitude")) return "↥";
    if (key.includes("source")) return "↻";

    return "•";
}