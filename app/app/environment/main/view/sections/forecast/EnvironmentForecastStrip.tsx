// app/app/environment/main/view/sections/forecast/EnvironmentForecastStrip.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST STRIP
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastStrip.tsx
   Scope: Own Environment forecast circular strip frame
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: add forecast strip winding over available slots
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import { useMemo, useState } from "react";
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
   Helpers
-------------------------------- */
function wrapIndex(index: number, length: number) {
    if (length <= 0) return 0;

    return (index + length) % length;
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentForecastStrip({
    items,
}: EnvironmentForecastStripProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const slotCount = items.length;

    const visibleItems = useMemo(() => {
        if (slotCount <= 0) return [];

        return items.map((_, offset) => {
            const sourceIndex = wrapIndex(activeIndex + offset, slotCount);

            return {
                item: items[sourceIndex],
                sourceIndex,
            };
        });
    }, [activeIndex, items, slotCount]);

    const STRIP_FRAME_STYLE: CSSProperties = {
        position: "relative",
        display: "grid",
        gridTemplateColumns: "28px minmax(0, 1fr) 28px",
        alignItems: "center",
        columnGap: 5,
    };

    const STRIP_STYLE: CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))`,
        gap: 5,
        width: "100%",
        padding: "0 1px 2px",
        overflow: "hidden",
    };

    const WIND_BUTTON_STYLE: CSSProperties = {
        width: 28,
        height: 48,
        display: "grid",
        placeItems: "center",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 999,
        background: "rgba(3,8,18,0.22)",
        color: "rgba(255,255,255,0.74)",
        fontSize: 18,
        lineHeight: 1,
        cursor: "pointer",
    };

    if (slotCount <= 0) {
        return null;
    }

    return (
        <div style={STRIP_FRAME_STYLE}>
            <button
                type="button"
                aria-label="Previous forecast slot"
                style={WIND_BUTTON_STYLE}
                onClick={() => setActiveIndex((index) => wrapIndex(index - 1, slotCount))}
            >
                ‹
            </button>

            <div style={STRIP_STYLE}>
                {visibleItems.map(({ item, sourceIndex }, index) => (
                    <EnvironmentForecastItem
                        key={`${item.label}-${sourceIndex}`}
                        item={item}
                        active={index === 0}
                    />
                ))}
            </div>

            <button
                type="button"
                aria-label="Next forecast slot"
                style={WIND_BUTTON_STYLE}
                onClick={() => setActiveIndex((index) => wrapIndex(index + 1, slotCount))}
            >
                ›
            </button>
        </div>
    );
}