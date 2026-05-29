// app/app/environment/main/view/sections/hero/EnvironmentHeroMeta.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO META
   File: app/app/environment/main/view/sections/hero/EnvironmentHeroMeta.tsx
   Scope: Own Environment hero metadata compression
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: extract hero meta ownership from hero section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { EnvironmentHeroModel } from "../../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeroMetaProps = {
    model: EnvironmentHeroModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeroMeta({
    model,
}: EnvironmentHeroMetaProps) {
    const GRID_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 1,
        maxWidth: 236,
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
        <div style={GRID_STYLE}>
            <Text as="p" type="meta" style={META_STYLE}>
                {model.feelsLike}
            </Text>

            <Text as="p" type="meta" style={META_STYLE}>
                {model.updated} · {model.signal}
            </Text>

            <Text as="p" type="meta" style={PLACE_STYLE}>
                {model.place}
            </Text>
        </div>
    );
}