"use client";

/* ==========================================================
   OUTFLO — WEATHER CONTROL ROW
   File: app/account/profile/(pages)/environment/weather/main/view/rows/WeatherControlRow.tsx
   Scope: Render one weather signal switch row
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add inert weather switch row
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { WeatherControlRowData } from "../../internal/weather.types";

/* ------------------------------
   Types
-------------------------------- */
type WeatherControlRowProps = {
    row: WeatherControlRowData;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROW_STYLE: CSSProperties = {
    minHeight: 76,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 18,
};

const TEXT_STACK_STYLE: CSSProperties = {
    minWidth: 0,
    display: "grid",
    rowGap: 5,
};

const VALUE_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
};

const SWITCH_STYLE: CSSProperties = {
    width: 48,
    height: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: 2,
    background: "var(--surface-muted)",
};

const SWITCH_DOT_STYLE: CSSProperties = {
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "var(--text-tertiary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function WeatherControlRow({
    row,
    style,
}: WeatherControlRowProps) {
    return (
        <div style={{ ...ROW_STYLE, ...style }}>
            <div style={TEXT_STACK_STYLE}>
                <Text as="h3" type="label">
                    {row.label}
                </Text>

                <Text as="p" type="meta" style={VALUE_STYLE}>
                    {row.value}
                </Text>
            </div>

            <span
                aria-label={`${row.label} off`}
                role="switch"
                aria-checked={row.enabled}
                style={SWITCH_STYLE}
            >
                <span style={SWITCH_DOT_STYLE} />
            </span>
        </div>
    );
}