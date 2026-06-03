"use client";

/* ==========================================================
   OUTFLO — WEATHER CONTROL ROW
   File: app/account/profile/(pages)/environment/weather/main/view/rows/WeatherControlRow.tsx
   Scope: Render one weather signal switch row
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: make full weather control row interactive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type {
    WeatherControlKey,
    WeatherControlRowData,
} from "../../internal/weather.types";

/* ------------------------------
   Types
-------------------------------- */
type WeatherControlRowProps = {
    row: WeatherControlRowData;
    onToggle: (key: WeatherControlKey) => void;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const ROW_STYLE: CSSProperties = {
    width: "100%",
    minHeight: 76,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: 18,
    border: 0,
    padding: 0,
    background: "transparent",
    color: "inherit",
    textAlign: "left",
    cursor: "pointer",
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
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: 2,
    background: "var(--surface-muted)",
    pointerEvents: "none",
};

const SWITCH_ON_STYLE: CSSProperties = {
    justifyContent: "flex-end",
    background: "var(--surface-raised)",
};

const SWITCH_OFF_STYLE: CSSProperties = {
    justifyContent: "flex-start",
};

const SWITCH_DOT_STYLE: CSSProperties = {
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "var(--text-tertiary)",
};

const SWITCH_DOT_ON_STYLE: CSSProperties = {
    background: "var(--text-primary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function WeatherControlRow({
    row,
    onToggle,
    style,
}: WeatherControlRowProps) {
    const switchStyle = {
        ...SWITCH_STYLE,
        ...(row.enabled ? SWITCH_ON_STYLE : SWITCH_OFF_STYLE),
    };

    const dotStyle = {
        ...SWITCH_DOT_STYLE,
        ...(row.enabled ? SWITCH_DOT_ON_STYLE : undefined),
    };

    return (
        <button
            type="button"
            aria-label={`${row.label} ${row.enabled ? "on" : "off"}`}
            aria-pressed={row.enabled}
            onClick={() => onToggle(row.key)}
            style={{ ...ROW_STYLE, ...style }}
        >
            <div style={TEXT_STACK_STYLE}>
                <Text as="h3" type="label">
                    {row.label}
                </Text>

                <Text as="p" type="meta" style={VALUE_STYLE}>
                    {row.value}
                </Text>
            </div>

            <span
                role="switch"
                aria-checked={row.enabled}
                style={switchStyle}
            >
                <span style={dotStyle} />
            </span>
        </button>
    );
}