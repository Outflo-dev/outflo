// app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO SECTION
   File: app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
   Scope: Render Environment current condition hero
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: convert hero to glass data layer over top scene
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
   Component
-------------------------------- */
export default function EnvironmentHeroSection({
    model,
}: EnvironmentHeroSectionProps) {
    const HERO_STYLE: CSSProperties = {
        position: "relative",
        minHeight: 292,
        display: "grid",
        alignContent: "space-between",
        padding: "22px 22px 20px",
        borderRadius: 32,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(3,8,18,0.18)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        overflow: "hidden",
        isolation: "isolate",
    };

    const GLASS_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background:
            "linear-gradient(90deg, rgba(3,8,18,0.58), rgba(3,8,18,0.18) 50%, rgba(3,8,18,0.02)), linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.18))",
    };

    const CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 2,
        display: "grid",
        rowGap: 13,
        maxWidth: 300,
    };

    const LIVE_PILL_STYLE: CSSProperties = {
        width: "fit-content",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 10px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "rgba(255,255,255,0.86)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontSize: 11,
        fontWeight: 700,
    };

    const DOT_STYLE: CSSProperties = {
        width: 7,
        height: 7,
        borderRadius: 999,
        background: "#5ee0b6",
        boxShadow: "0 0 16px rgba(94,224,182,0.86)",
    };

    const WEATHER_STACK_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 4,
    };

    const TEMP_STYLE: CSSProperties = {
        marginTop: 2,
        fontSize: "clamp(78px, 20vw, 106px)",
        lineHeight: 0.86,
        letterSpacing: "-0.09em",
        color: "rgba(255,248,218,0.98)",
        textShadow: "0 14px 42px rgba(0,0,0,0.28)",
    };

    const CONDITION_STYLE: CSSProperties = {
        color: "rgba(255,248,218,0.96)",
        textShadow: "0 10px 30px rgba(0,0,0,0.28)",
    };

    const META_GRID_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 5,
        maxWidth: 260,
    };

    const META_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.76)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    const PLACE_STYLE: CSSProperties = {
        ...META_STYLE,
        color: "rgba(255,255,255,0.84)",
    };

    return (
        <section style={HERO_STYLE}>
            <div style={GLASS_STYLE} />

            <div style={CONTENT_STYLE}>
                <div style={LIVE_PILL_STYLE}>
                    <span style={DOT_STYLE} />
                    Live Environment
                </div>

                <div style={WEATHER_STACK_STYLE}>
                    <div style={TEMP_STYLE}>{model.temperature}</div>

                    <Text as="h2" type="display" style={CONDITION_STYLE}>
                        {model.condition}
                    </Text>
                </div>

                <div style={META_GRID_STYLE}>
                    <Text as="p" type="meta" style={META_STYLE}>
                        {model.feelsLike}
                    </Text>

                    <Text as="p" type="meta" style={META_STYLE}>
                        {model.updated}
                    </Text>

                    <Text as="p" type="meta" style={META_STYLE}>
                        {model.signal}
                    </Text>

                    <Text as="p" type="meta" style={PLACE_STYLE}>
                        {model.place}
                    </Text>
                </div>
            </div>
        </section>
    );
}