"use client";

/* ==========================================================
   OUTFLO — AIR QUALITY CONTROLS SECTION
   File: app/account/profile/(pages)/environment/air-quality/main/view/sections/AirQualityControlsSection.tsx
   Scope: Render air quality signal switch rows
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add air quality controls section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { AirQualityViewModel } from "../../internal/air-quality.types";
import AirQualityControlRow from "../rows/AirQualityControlRow";

/* ------------------------------
   Types
-------------------------------- */
type AirQualityControlsSectionProps = {
    model: AirQualityViewModel;
};

/* ------------------------------
   Constants
-------------------------------- */
const SECTION_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 14,
};

const TITLE_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
};

const ROW_DIVIDER_STYLE: CSSProperties = {
    borderBottom: "1px solid var(--border-soft)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function AirQualityControlsSection({
    model,
}: AirQualityControlsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Controls
            </Text>

            <div>
                {model.controls.map((row, index) => (
                    <AirQualityControlRow
                        key={row.label}
                        row={row}
                        style={
                            index < model.controls.length - 1
                                ? ROW_DIVIDER_STYLE
                                : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
}