// app/app/environment/main/view/sections/EnvironmentForecastSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST SECTION
   File: app/app/environment/main/view/sections/EnvironmentForecastSection.tsx
   Scope: Render Environment landing page forecast preview
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment forecast landing section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { EnvironmentForecastModel } from "../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentForecastSectionProps = {
    model: EnvironmentForecastModel;
};

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
        display: "grid",
        rowGap: 4,
    };

    const TITLE_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    };

    const SUBTITLE_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
    };

    const STRIP_STYLE: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 10,
    };

    const ITEM_STYLE: CSSProperties = {
        minHeight: 96,
        display: "grid",
        alignContent: "space-between",
        rowGap: 10,
        padding: 14,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.09)",
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))",
        boxShadow: "0 18px 44px rgba(0,0,0,0.16)",
    };

    const LABEL_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
    };

    const DETAIL_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
    };

    return (
        <section style={SECTION_STYLE}>
            <header style={HEADER_STYLE}>
                <Text as="h2" type="meta" style={TITLE_STYLE}>
                    {model.title}
                </Text>

                <Text as="p" type="meta" style={SUBTITLE_STYLE}>
                    {model.subtitle}
                </Text>
            </header>

            <div style={STRIP_STYLE}>
                {model.items.map((item) => (
                    <div key={item.label} style={ITEM_STYLE}>
                        <Text as="p" type="meta" style={LABEL_STYLE}>
                            {item.label}
                        </Text>

                        <Text as="p" type="label">
                            {item.value}
                        </Text>

                        <Text as="p" type="meta" style={DETAIL_STYLE}>
                            {item.detail}
                        </Text>
                    </div>
                ))}
            </div>
        </section>
    );
}