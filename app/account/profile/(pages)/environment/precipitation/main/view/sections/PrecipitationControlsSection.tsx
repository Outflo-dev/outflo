"use client";

/* ==========================================================
   OUTFLO — PRECIPITATION CONTROLS SECTION
   File: app/account/profile/(pages)/environment/precipitation/main/view/sections/PrecipitationControlsSection.tsx
   Scope: Render precipitation signal switch rows
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add precipitation controls section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { PrecipitationViewModel } from "../../internal/precipitation.types";
import PrecipitationControlRow from "../rows/PrecipitationControlRow";

/* ------------------------------
   Types
-------------------------------- */
type PrecipitationControlsSectionProps = {
    model: PrecipitationViewModel;
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
export default function PrecipitationControlsSection({
    model,
}: PrecipitationControlsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Controls
            </Text>

            <div>
                {model.controls.map((row, index) => (
                    <PrecipitationControlRow
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