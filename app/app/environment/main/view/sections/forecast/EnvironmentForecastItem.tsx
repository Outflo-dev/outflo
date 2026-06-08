"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST ITEM
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastItem.tsx
   Scope: Own one Environment hourly forecast item
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: widen forecast item for scroll rail rendering
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
}: EnvironmentForecastItemProps) {
    const ITEM_STYLE: CSSProperties = {
        flex: "0 0 74px",
        minHeight: 76,
        display: "grid",
        justifyItems: "center",
        alignContent: "space-between",
        rowGap: 3,
        padding: "7px 6px",
        borderRadius: 15,
        color: "var(--text-primary)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-soft)",
        scrollSnapAlign: "start",
    };

    const LABEL_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        lineHeight: 1,
    };

    const ICON_STYLE: CSSProperties = {
        width: 42,
        height: 42,
        objectFit: "contain",
        opacity: 0.94,
        transform: "scale(1.55)",
        transformOrigin: "center",
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