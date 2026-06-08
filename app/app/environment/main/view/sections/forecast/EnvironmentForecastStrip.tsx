"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST STRIP
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastStrip.tsx
   Scope: Own Environment forecast rail composition
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: compose forecast items inside reusable scroll rail
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import ScrollRail from "@/components/system/primitives/navigation/scroll-rail/ScrollRail";
import type { EnvironmentForecastItemModel } from "../../../internal/environment.types";
import EnvironmentForecastItem from "./EnvironmentForecastItem";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentForecastStripProps = {
    items: EnvironmentForecastItemModel[];
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentForecastStrip({
    items,
}: EnvironmentForecastStripProps) {
    const STRIP_STYLE: CSSProperties = {
        minHeight: 82,
        padding: 8,
        borderRadius: 18,
        border: "1px solid var(--border-soft)",
        background: "var(--surface-muted)",
        boxShadow: "var(--glow-ring)",
    };

    const CONTENT_STYLE: CSSProperties = {
        paddingBottom: 1,
        scrollPaddingInline: 8,
    };

    if (items.length <= 0) {
        return null;
    }

    return (
        <ScrollRail
            ariaLabel="Hourly forecast"
            gap={8}
            style={STRIP_STYLE}
            contentStyle={CONTENT_STYLE}
        >
            {items.map((item, index) => (
                <EnvironmentForecastItem
                    key={`${item.label}-${index}`}
                    item={item}
                />
            ))}
        </ScrollRail>
    );
}