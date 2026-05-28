// app/app/environment/main/view/sections/EnvironmentForecastSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST SECTION
   File: app/app/environment/main/view/sections/EnvironmentForecastSection.tsx
   Scope: Render Environment landing page forecast preview
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: align Environment forecast with hourly strip grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import type { EnvironmentForecastModel } from "../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentForecastSectionProps = {
    model: EnvironmentForecastModel;
};

/* ------------------------------
   Icons
-------------------------------- */
function ForecastCloudIcon() {
    return (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7.8 18h8.8a4 4 0 0 0 .2-8 5.8 5.8 0 0 0-11.1 1.8A3.2 3.2 0 0 0 7.8 18Z"
                fill="currentColor"
                opacity="0.9"
            />
        </svg>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentForecastSection({
    model,
}: EnvironmentForecastSectionProps) {
    const SECTION_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 12,
    };

    const HEADER_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
    };

    const TITLE_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    };

    const PILL_STYLE: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 11px",
        borderRadius: 999,
        color: "var(--text-secondary)",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        whiteSpace: "nowrap",
    };

    const SCROLLER_STYLE: CSSProperties = {
        display: "flex",
        overflowX: "auto",
        padding: 8,
        borderRadius: 30,
        border: "1px solid rgba(255,255,255,0.08)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))",
        boxShadow: "0 18px 44px rgba(0,0,0,0.14)",
        scrollbarWidth: "none",
    };

    const ITEM_STYLE: CSSProperties = {
        minWidth: 82,
        minHeight: 118,
        display: "grid",
        justifyItems: "center",
        alignContent: "space-between",
        rowGap: 8,
        padding: "12px 10px",
        borderRadius: 23,
        color: "var(--text-primary)",
        background: "rgba(255,255,255,0.035)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
    };

    const FIRST_ITEM_STYLE: CSSProperties = {
        ...ITEM_STYLE,
        background: "rgba(99,136,210,0.22)",
    };

    const LABEL_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
    };

    const ICON_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.76)",
    };

    const VALUE_STYLE: CSSProperties = {
        color: "var(--text-primary)",
        whiteSpace: "nowrap",
    };

    return (
        <section style={SECTION_STYLE}>
            <header style={HEADER_STYLE}>
                <Text as="h2" type="meta" style={TITLE_STYLE}>
                    {model.title}
                </Text>

                <span style={PILL_STYLE}>
                    <Text as="span" type="meta">
                        {model.subtitle}
                    </Text>

                    <Chevron direction="down" />
                </span>
            </header>

            <div style={SCROLLER_STYLE}>
                {model.items.map((item, index) => (
                    <article
                        key={item.label}
                        style={index === 0 ? FIRST_ITEM_STYLE : ITEM_STYLE}
                    >
                        <Text as="p" type="meta" style={LABEL_STYLE}>
                            {item.label}
                        </Text>

                        <span style={ICON_STYLE}>
                            <ForecastCloudIcon />
                        </span>

                        <Text as="p" type="label" style={VALUE_STYLE}>
                            {item.value}
                        </Text>
                    </article>
                ))}
            </div>
        </section>
    );
}