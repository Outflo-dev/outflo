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
import { memo } from "react";
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
function EnvironmentForecastItem({
    item,
}: EnvironmentForecastItemProps) {
    const ITEM_STYLE: CSSProperties = {
        flex: "0 0 60px",
        minHeight: 54,
        display: "grid",
        justifyItems: "center",
        alignContent: "space-between",
        rowGap: 0,
        padding: "7px 6px",
        borderRadius: 15,
        color: "var(--text-primary)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-soft)",
        scrollSnapAlign: "start",
        contain: "layout paint style",
        contentVisibility: "auto",
        containIntrinsicSize: "68px 58px",
    };

    const LABEL_STYLE: CSSProperties = {
        margin: 0,
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        lineHeight: 1,
    };

    const ICON_STYLE: CSSProperties = {
        width: 54,
        height: 42,
        objectFit: "contain",
        opacity: 0.94,
    };

    const VALUE_STYLE: CSSProperties = {
        margin: 0,
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
                loading="lazy"
                decoding="async"
            />

            <Text as="p" type="label" style={VALUE_STYLE}>
                {item.value}
            </Text>
        </article>
    );
}

export default memo(EnvironmentForecastItem);