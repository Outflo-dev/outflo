// app/app/environment/main/view/rows/EnvironmentSummaryTile.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SUMMARY TILE
   File: app/app/environment/main/view/rows/EnvironmentSummaryTile.tsx
   Scope: Render one Environment landing summary tile
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: compress Environment summary tile for one-screen composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

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
   Helpers
-------------------------------- */
function getIcon(title: string): ReactNode {
    const key = title.toLowerCase();

    if (key.includes("place")) return <PlaceIcon />;
    if (key.includes("weather")) return <WeatherIcon />;
    if (key.includes("sun")) return <SunIcon />;
    if (key.includes("air")) return <AirIcon />;
    if (key.includes("altitude")) return <AltitudeIcon />;
    if (key.includes("source")) return <SourceIcon />;

    return <SourceIcon />;
}

/* ------------------------------
   Icons
-------------------------------- */
function EnvironmentTileIcon({ title, accent }: EnvironmentTileIconProps) {
    const ICON_WRAP_STYLE: CSSProperties = {
        width: 27,
        height: 27,
        display: "grid",
        placeItems: "center",
        borderRadius: 14,
        color: accent,
        background: `color-mix(in srgb, ${accent} 18%, transparent)`,
        boxShadow: `0 0 22px color-mix(in srgb, ${accent} 30%, transparent)`,
        flexShrink: 0,
    };

    return <div style={ICON_WRAP_STYLE}>{getIcon(title)}</div>;
}

function PlaceIcon() {
    return (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 21s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12Z"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                stroke="currentColor"
                strokeWidth="1.9"
            />
        </svg>
    );
}

function WeatherIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7.8 18h8.8a4 4 0 0 0 .2-8 5.8 5.8 0 0 0-11.1 1.8A3.2 3.2 0 0 0 7.8 18Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}

function SunIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M12 2.8v2.1M12 19.1v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function AirIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4 8h10.5a2.5 2.5 0 1 0-2.2-3.7"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
            />
            <path
                d="M3.5 12h14.8a2.7 2.7 0 1 1-2.4 3.9"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
            />
            <path
                d="M5.5 16H12"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
            />
        </svg>
    );
}

function AltitudeIcon() {
    return (
        <svg width="22" height="22" viewBox="0 2 22 24" fill="none" aria-hidden="true">
            <path
                d="M3.5 18.5 9 8.5l3.7 6 2-3.3 5.8 7.3h-17Z"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SourceIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M4.8 9.2A7.8 7.8 0 0 1 9.2 4.8M14.8 4.8a7.8 7.8 0 0 1 4.4 4.4M19.2 14.8a7.8 7.8 0 0 1-4.4 4.4M9.2 19.2a7.8 7.8 0 0 1-4.4-4.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

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
        border: "1px solid rgba(255,255,255,0.07)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.026))",
        boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
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

    const CHEVRON_STYLE: CSSProperties = {
        opacity: 0.5,
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

            <span style={CHEVRON_STYLE}>
                <Chevron direction="right" />
            </span>
        </article>
    );
}