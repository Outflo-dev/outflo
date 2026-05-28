// app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO SECTION
   File: app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
   Scope: Render Environment current condition hero
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: beautify Environment atmospheric hero
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
        return "radial-gradient(circle at 76% 22%, rgba(94,126,164,0.36), transparent 34%), linear-gradient(160deg, rgba(32,46,70,0.98), rgba(5,8,16,0.98))";
    }

    if (kind === "cloud") {
        return "radial-gradient(circle at 76% 24%, rgba(255,235,186,0.32), transparent 28%), radial-gradient(circle at 62% 12%, rgba(154,184,212,0.32), transparent 32%), linear-gradient(160deg, rgba(64,112,154,0.94), rgba(11,20,36,0.98))";
    }

    if (kind === "night") {
        return "radial-gradient(circle at 76% 22%, rgba(116,122,255,0.22), transparent 30%), linear-gradient(160deg, rgba(15,22,52,0.98), rgba(3,5,14,0.98))";
    }

    return "radial-gradient(circle at 74% 24%, rgba(255,232,154,0.42), transparent 30%), radial-gradient(circle at 55% 10%, rgba(108,174,230,0.38), transparent 36%), linear-gradient(160deg, rgba(64,130,188,0.96), rgba(10,28,53,0.98))";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroSection({
    model,
}: EnvironmentHeroSectionProps) {
    const HERO_STYLE: CSSProperties = {
        position: "relative",
        minHeight: 330,
        display: "grid",
        alignContent: "space-between",
        rowGap: 24,
        padding: 28,
        borderRadius: 34,
        border: "1px solid rgba(255,255,255,0.16)",
        background: getBackground(model.background),
        boxShadow: "0 28px 80px rgba(0,0,0,0.34)",
        overflow: "hidden",
        isolation: "isolate",
    };

    const GLOW_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(180deg, rgba(255,255,255,0.16), transparent 44%), radial-gradient(circle at 80% 42%, rgba(255,245,204,0.34), transparent 18%)",
        opacity: 0.9,
        zIndex: -3,
    };

    const CLOUD_ONE_STYLE: CSSProperties = {
        position: "absolute",
        width: 260,
        height: 110,
        right: -42,
        top: 92,
        borderRadius: 999,
        background:
            "radial-gradient(circle at 24% 54%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 48% 42%, rgba(255,255,255,0.64), transparent 34%), radial-gradient(circle at 72% 58%, rgba(255,255,255,0.48), transparent 34%)",
        filter: "blur(3px)",
        opacity: 0.42,
        zIndex: -2,
    };

    const CLOUD_TWO_STYLE: CSSProperties = {
        position: "absolute",
        width: 220,
        height: 92,
        right: 42,
        bottom: 46,
        borderRadius: 999,
        background:
            "radial-gradient(circle at 28% 50%, rgba(255,255,255,0.34), transparent 36%), radial-gradient(circle at 58% 48%, rgba(255,255,255,0.28), transparent 38%)",
        filter: "blur(8px)",
        opacity: 0.48,
        zIndex: -2,
    };

    const TOP_ROW_STYLE: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
    };

    const LIVE_PILL_STYLE: CSSProperties = {
        width: "fit-content",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(18px)",
        color: "rgba(255,255,255,0.88)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontSize: 12,
        fontWeight: 700,
    };

    const DOT_STYLE: CSSProperties = {
        width: 8,
        height: 8,
        borderRadius: 999,
        background: "#5ee0b6",
        boxShadow: "0 0 18px rgba(94,224,182,0.9)",
    };

    const TEMP_STYLE: CSSProperties = {
        marginTop: 14,
        fontSize: 92,
        lineHeight: 0.88,
        letterSpacing: "-0.09em",
        color: "rgba(255,248,218,0.98)",
        textShadow: "0 12px 42px rgba(0,0,0,0.2)",
    };

    const CONDITION_STYLE: CSSProperties = {
        color: "rgba(255,248,218,0.98)",
        textShadow: "0 10px 32px rgba(0,0,0,0.24)",
    };

    const META_GRID_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 8,
    };

    const META_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.76)",
    };

    const PLACE_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.8)",
    };

    return (
        <section style={HERO_STYLE}>
            <div style={GLOW_STYLE} />
            <div style={CLOUD_ONE_STYLE} />
            <div style={CLOUD_TWO_STYLE} />

            <div style={TOP_ROW_STYLE}>
                <div style={LIVE_PILL_STYLE}>
                    <span style={DOT_STYLE} />
                    Live Environment
                </div>
            </div>

            <div>
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
        </section>
    );
}