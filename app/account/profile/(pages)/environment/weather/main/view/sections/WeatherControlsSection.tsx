"use client";

/* ==========================================================
   OUTFLO — WEATHER CONTROLS SECTION
   File: app/account/profile/(pages)/environment/weather/main/view/sections/WeatherControlsSection.tsx
   Scope: Render weather signal switch rows
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: pass weather toggle action to rows
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type {
    WeatherControlKey,
    WeatherViewModel,
} from "../../internal/weather.types";
import WeatherControlRow from "../rows/WeatherControlRow";

/* ------------------------------
   Types
-------------------------------- */
type WeatherControlsSectionProps = {
    model: WeatherViewModel;
    onToggle: (key: WeatherControlKey) => void;
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
export default function WeatherControlsSection({
    model,
    onToggle,
}: WeatherControlsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Controls
            </Text>

            <div>
                {model.controls.map((row, index) => (
                    <WeatherControlRow
                        key={row.key}
                        row={row}
                        onToggle={onToggle}
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