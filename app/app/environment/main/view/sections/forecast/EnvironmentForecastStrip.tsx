// app/app/environment/main/view/sections/forecast/EnvironmentForecastStrip.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST STRIP
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastStrip.tsx
   Scope: Own Environment forecast horizontal strip frame
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract forecast strip ownership from forecast section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

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
        display: "flex",
        gap: 5,
        overflowX: "auto",
        padding: "0 1px 2px",
        scrollbarWidth: "none",
    };

    return (
        <div style={STRIP_STYLE}>
            {items.map((item, index) => (
                <EnvironmentForecastItem
                    key={`${item.label}-${index}`}
                    item={item}
                    active={index === 0}
                />
            ))}
        </div>
    );
}