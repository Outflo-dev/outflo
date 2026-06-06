// app/app/environment/main/view/sections/hero/content/EnvironmentHeroTemperature.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO TEMPERATURE
   File: app/app/environment/main/view/sections/hero/content/EnvironmentHeroTemperature.tsx
   Scope: Own Environment hero temperature and condition text
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract hero temperature ownership from hero section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroTemperatureProps = {
    temperature: string;
    condition: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroTemperature({
    temperature,
    condition,
}: EnvironmentHeroTemperatureProps) {
    const STACK_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 0,
    };

    const TEMP_STYLE: CSSProperties = {
        marginTop: 0,
        fontSize: "clamp(48px, 12vw, 62px)",
        lineHeight: 0.88,
        letterSpacing: "-0.07em",
        color: "var(--text-primary)",
    };

    const CONDITION_STYLE: CSSProperties = {
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    return (
        <div style={STACK_STYLE}>
            <div style={TEMP_STYLE}>{temperature}</div>

            <Text as="h2" type="display" style={CONDITION_STYLE}>
                {condition}
            </Text>
        </div>
    );
}