// app/app/environment/main/view/rows/EnvironmentFieldCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FIELD CARD
   File: app/app/environment/main/view/rows/EnvironmentFieldCard.tsx
   Scope: Render one Environment data field
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: beautify Environment local display card
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentFieldCardProps = {
    label: string;
    value: string;
};

/* ------------------------------
   Helpers
-------------------------------- */
function getFieldAccent(label: string): string {
    const key = label.toLowerCase();

    if (key.includes("temp")) return "rgba(255,196,118,0.72)";
    if (key.includes("humidity")) return "rgba(122,199,255,0.72)";
    if (key.includes("wind")) return "rgba(174,220,255,0.7)";
    if (key.includes("pressure")) return "rgba(196,173,255,0.72)";
    if (key.includes("uv")) return "rgba(255,224,122,0.72)";
    if (key.includes("sun")) return "rgba(255,203,122,0.78)";
    if (key.includes("air") || key.includes("aqi")) return "rgba(126,231,181,0.72)";
    if (key.includes("lat") || key.includes("lng")) return "rgba(140,215,255,0.68)";
    if (key.includes("source")) return "rgba(255,255,255,0.52)";

    return "rgba(255,255,255,0.44)";
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentFieldCard({
    label,
    value,
}: EnvironmentFieldCardProps) {
    const accent = getFieldAccent(label);

    const CARD_STYLE: CSSProperties = {
        position: "relative",
        minHeight: 88,
        display: "grid",
        alignContent: "space-between",
        rowGap: 14,
        padding: 16,
        borderRadius: 24,
        border: "1px solid var(--border-soft)",
        background: "var(--surface-soft)",
        boxShadow: "var(--glow-ring)",
        overflow: "hidden",
    };

    const ACCENT_STYLE: CSSProperties = {
        position: "absolute",
        top: 14,
        right: 14,
        width: 9,
        height: 9,
        borderRadius: 999,
        background: accent,
        boxShadow: `0 0 22px ${accent}`,
    };

    const LABEL_STYLE: CSSProperties = {
        color: "var(--text-tertiary)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
    };

    const VALUE_STYLE: CSSProperties = {
        maxWidth: "100%",
        overflowWrap: "anywhere",
        color: "var(--text-primary)",
    };

    return (
        <div style={CARD_STYLE}>
            <span style={ACCENT_STYLE} />

            <Text as="p" type="meta" style={LABEL_STYLE}>
                {label}
            </Text>

            <Text as="p" type="label" style={VALUE_STYLE}>
                {value}
            </Text>
        </div>
    );
}