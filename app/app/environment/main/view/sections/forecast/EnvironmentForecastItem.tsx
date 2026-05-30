// app/app/environment/main/view/sections/forecast/EnvironmentForecastItem.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST ITEM
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastItem.tsx
   Scope: Own one Environment hourly forecast item
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: render forecast icon from semantic scene key
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type {
    EnvironmentForecastItemModel,
    EnvironmentSceneKey,
} from "../../../internal/environment.types";

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
function getForecastIconSrc(sceneKey: EnvironmentSceneKey): string {
    if (sceneKey === "rain") return "/environment/rain.png";
    if (sceneKey === "snow") return "/environment/snow.png";
    if (sceneKey === "thunderstorm") return "/environment/thunderstorm.png";
    if (sceneKey === "clear-day") return "/environment/clear-day.png";
    if (sceneKey === "cloudy-day") return "/environment/cloudy.png";
    if (sceneKey === "clear-night") return "/environment/clear-night.png";
    if (sceneKey === "partly-cloudy-night") return "/environment/partly-cloudy-night.png";

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
        flex: "0 0 auto",
        minWidth: 52,
        minHeight: 60,
        display: "grid",
        justifyItems: "center",
        alignContent: "space-between",
        rowGap: 2,
        padding: "6px 5px",
        borderRadius: 14,
        color: "var(--text-primary)",
        border: active
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(255,255,255,0.06)",
        background: active
            ? "rgba(99,136,210,0.2)"
            : "rgba(255,255,255,0.038)",
        boxShadow: active ? "0 8px 18px rgba(0,0,0,0.14)" : "none",
    };

    const LABEL_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        lineHeight: 1,
    };

    const ICON_STYLE: CSSProperties = {
        width: 19,
        height: 19,
        objectFit: "contain",
        opacity: 0.92,
        filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.2))",
    };

    const VALUE_STYLE: CSSProperties = {
        color: "var(--text-primary)",
        whiteSpace: "nowrap",
        lineHeight: 1,
    };

    return (
        <article style={ITEM_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                {item.label}
            </Text>

            <img
                alt=""
                aria-hidden="true"
                src={getForecastIconSrc(item.sceneKey)}
                style={ICON_STYLE}
            />

            <Text as="p" type="label" style={VALUE_STYLE}>
                {item.value}
            </Text>
        </article>
    );
}