// app/app/environment/main/view/sections/forecast/EnvironmentForecastItem.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST ITEM
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastItem.tsx
   Scope: Own one Environment hourly forecast item
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract forecast item ownership from forecast strip
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { EnvironmentForecastItemModel } from "../../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentForecastItemProps = {
    item: EnvironmentForecastItemModel;
    active: boolean;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getForecastIconSrc(detail: string): string {
    const key = detail.toLowerCase();

    if (key.includes("rain")) return "/environment/rain.png";
    if (key.includes("clear")) return "/environment/clear-day.png";
    if (key.includes("cloud")) return "/environment/cloudy.png";

    return "/environment/partly-cloudy-day.png";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentForecastItem({
    item,
    active,
}: EnvironmentForecastItemProps) {
    const ITEM_STYLE: CSSProperties = {
        minWidth: 58,
        minHeight: 66,
        display: "grid",
        justifyItems: "center",
        alignContent: "space-between",
        rowGap: 3,
        padding: "7px 5px",
        borderRadius: 16,
        color: "var(--text-primary)",
        background: active ? "rgba(99,136,210,0.22)" : "rgba(255,255,255,0.024)",
        borderRight: "1px solid rgba(255,255,255,0.04)",
    };

    const LABEL_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
    };

    const ICON_STYLE: CSSProperties = {
        width: 20,
        height: 20,
        objectFit: "contain",
        opacity: 0.92,
        filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.2))",
    };

    const VALUE_STYLE: CSSProperties = {
        color: "var(--text-primary)",
        whiteSpace: "nowrap",
    };

    return (
        <article style={ITEM_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                {item.label}
            </Text>

            <img
                alt=""
                aria-hidden="true"
                src={getForecastIconSrc(item.detail)}
                style={ICON_STYLE}
            />

            <Text as="p" type="label" style={VALUE_STYLE}>
                {item.value}
            </Text>
        </article>
    );
}