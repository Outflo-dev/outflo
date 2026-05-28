// app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO SECTION
   File: app/app/environment/main/view/sections/EnvironmentHeroSection.tsx
   Scope: Render Environment current condition hero
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: tighten hero and add weather visual object
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
        return "radial-gradient(circle at 76% 24%, rgba(255,235,186,0.34), transparent 28%), radial-gradient(circle at 62% 12%, rgba(154,184,212,0.32), transparent 32%), linear-gradient(160deg, rgba(64,112,154,0.94), rgba(11,20,36,0.98))";
    }

    if (kind === "night") {
        return "radial-gradient(circle at 76% 22%, rgba(116,122,255,0.22), transparent 30%), linear-gradient(160deg, rgba(15,22,52,0.98), rgba(3,5,14,0.98))";
    }

    return "radial-gradient(circle at 74% 24%, rgba(255,232,154,0.42), transparent 30%), radial-gradient(circle at 55% 10%, rgba(108,174,230,0.38), transparent 36%), linear-gradient(160deg, rgba(64,130,188,0.96), rgba(10,28,53,0.98))";
}

/* ------------------------------
   Weather Visual
-------------------------------- */
function HeroWeatherVisual() {
    const WRAP_STYLE: CSSProperties = {
        position: "absolute",
        top: 54,
        right: 22,
        width: 184,
        height: 138,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.92,
    };

    const SUN_STYLE: CSSProperties = {
        position: "absolute",
        top: 0,
        right: 34,
        width: 86,
        height: 86,
        borderRadius: 999,
        background:
            "radial-gradient(circle at 38% 34%, rgba(255,250,194,1), rgba(255,202,92,0.94) 48%, rgba(255,166,54,0.42) 72%, transparent 100%)",
        boxShadow:
            "0 0 38px rgba(255,207,104,0.5), 0 0 96px rgba(255,176,68,0.28)",
        filter: "blur(0.2px)",
    };

    const CLOUD_SHADOW_STYLE: CSSProperties = {
        position: "absolute",
        left: 18,
        bottom: 0,
        width: 150,
        height: 54,
        borderRadius: 999,
        background:
            "linear-gradient(180deg, rgba(71,92,119,0.22), rgba(19,31,49,0.34))",
        filter: "blur(14px)",
        opacity: 0.88,
    };

    const CLOUD_STYLE: CSSProperties = {
        position: "absolute",
        left: 0,
        bottom: 16,
        width: 170,
        height: 82,
        borderRadius: 999,
        background:
            "radial-gradient(circle at 22% 58%, rgba(255,255,255,0.82) 0 20%, transparent 21%), radial-gradient(circle at 43% 43%, rgba(255,255,255,0.9) 0 30%, transparent 31%), radial-gradient(circle at 67% 52%, rgba(238,244,252,0.82) 0 28%, transparent 29%), radial-gradient(circle at 86% 62%, rgba(214,226,241,0.7) 0 20%, transparent 21%), linear-gradient(180deg, rgba(250,253,255,0.78), rgba(169,188,211,0.62))",
        filter: "drop-shadow(0 18px 26px rgba(0,0,0,0.24)) blur(0.35px)",
        opacity: 0.86,
    };

    const CLOUD_BASE_STYLE: CSSProperties = {
        position: "absolute",
        left: 30,
        bottom: 17,
        width: 126,
        height: 36,
        borderRadius: 999,
        background:
            "linear-gradient(180deg, rgba(248,252,255,0.78), rgba(170,190,214,0.64))",
        opacity: 0.88,
    };

    return (
        <div style={WRAP_STYLE} aria-hidden="true">
            <div style={SUN_STYLE} />
            <div style={CLOUD_SHADOW_STYLE} />
            <div style={CLOUD_STYLE} />
            <div style={CLOUD_BASE_STYLE} />
        </div>
    );
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
        rowGap: 18,
        padding: "26px 26px 24px",
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
            "linear-gradient(180deg, rgba(255,255,255,0.16), transparent 44%), radial-gradient(circle at 80% 42%, rgba(255,245,204,0.26), transparent 18%)",
        opacity: 0.9,
        zIndex: -3,
    };

    const CLOUD_ONE_STYLE: CSSProperties = {
        position: "absolute",
        width: 250,
        height: 104,
        right: -46,
        top: 88,
        borderRadius: 999,
        background:
            "radial-gradient(circle at 24% 54%, rgba(255,255,255,0.52), transparent 34%), radial-gradient(circle at 48% 42%, rgba(255,255,255,0.46), transparent 34%), radial-gradient(circle at 72% 58%, rgba(255,255,255,0.34), transparent 34%)",
        filter: "blur(5px)",
        opacity: 0.36,
        zIndex: -2,
    };

    const CLOUD_TWO_STYLE: CSSProperties = {
        position: "absolute",
        width: 210,
        height: 88,
        right: 28,
        bottom: 38,
        borderRadius: 999,
        background:
            "radial-gradient(circle at 28% 50%, rgba(255,255,255,0.28), transparent 36%), radial-gradient(circle at 58% 48%, rgba(255,255,255,0.22), transparent 38%)",
        filter: "blur(9px)",
        opacity: 0.42,
        zIndex: -2,
    };

    const CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 2,
        display: "grid",
        rowGap: 20,
        maxWidth: 330,
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

    const WEATHER_STACK_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 4,
    };

    const TEMP_STYLE: CSSProperties = {
        marginTop: 8,
        fontSize: "clamp(86px, 22vw, 118px)",
        lineHeight: 0.86,
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
        rowGap: 7,
    };

    const META_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.76)",
    };

    const PLACE_STYLE: CSSProperties = {
        color: "rgba(255,255,255,0.82)",
    };

    return (
        <section style={HERO_STYLE}>
            <div style={GLOW_STYLE} />
            <div style={CLOUD_ONE_STYLE} />
            <div style={CLOUD_TWO_STYLE} />

            <HeroWeatherVisual />

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