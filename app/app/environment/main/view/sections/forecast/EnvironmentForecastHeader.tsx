// app/app/environment/main/view/sections/forecast/EnvironmentForecastHeader.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FORECAST HEADER
   File: app/app/environment/main/view/sections/forecast/EnvironmentForecastHeader.tsx
   Scope: Own Environment forecast title and range pill
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract forecast header ownership from forecast section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import type { EnvironmentForecastModel } from "../../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentForecastHeaderProps = {
    model: EnvironmentForecastModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentForecastHeader({
    model,
}: EnvironmentForecastHeaderProps) {
    const HEADER_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 9,
    };

    const TITLE_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
    };

    const PILL_STYLE: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 8px",
        borderRadius: 999,
        color: "var(--text-secondary)",
        background: "rgba(255,255,255,0.052)",
        border: "1px solid rgba(255,255,255,0.07)",
        whiteSpace: "nowrap",
    };

    return (
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
    );
}