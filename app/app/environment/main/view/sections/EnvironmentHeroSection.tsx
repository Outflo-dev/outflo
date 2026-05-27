// app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO SECTION
   File: app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
   Scope: Render Environment current condition hero
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment atmospheric hero
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { EnvironmentHeroModel } from "../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroSectionProps = {
    model: EnvironmentHeroModel;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getBackground(kind: string): string {
    if (kind === "rain") {
        return "linear-gradient(160deg, rgba(33,48,70,0.96), rgba(8,13,20,0.98))";
    }

    if (kind === "cloud") {
        return "linear-gradient(160deg, rgba(99,109,119,0.72), rgba(22,26,31,0.96))";
    }

    if (kind === "night") {
        return "linear-gradient(160deg, rgba(14,20,42,0.96), rgba(4,7,14,0.98))";
    }

    return "linear-gradient(160deg, rgba(87,151,204,0.92), rgba(20,42,67,0.98))";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroSection({
    model,
}: EnvironmentHeroSectionProps) {
    const HERO_STYLE: CSSProperties = {
        minHeight: 250,
        display: "grid",
        alignContent: "end",
        rowGap: 12,
        padding: 24,
        borderRadius: 32,
        border: "1px solid var(--border-subtle)",
        background: getBackground(model.background),
        overflow: "hidden",
    };

    const TEMP_STYLE: CSSProperties = {
        fontSize: 76,
        lineHeight: 0.9,
        letterSpacing: "-0.08em",
    };

    const META_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.76)",
    };

    return (
        <section style={HERO_STYLE}>
            <div>
                <Text as="p" type="label" style={META_STYLE}>
                    {model.place}
                </Text>

                <div style={TEMP_STYLE}>{model.temperature}</div>

                <Text as="h2" type="title">
                    {model.condition}
                </Text>
            </div>

            <div>
                <Text as="p" type="meta" style={META_STYLE}>
                    {model.feelsLike}
                </Text>

                <Text as="p" type="meta" style={META_STYLE}>
                    {model.updated}
                </Text>

                <Text as="p" type="meta" style={META_STYLE}>
                    {model.signal}
                </Text>
            </div>
        </section>
    );
}