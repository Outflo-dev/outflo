"use client";

/* ==========================================================
   OUTFLO — ENGAGEMENT CONTROL ROW
   File: app/account/profile/(pages)/environment/capture/main/view/rows/CaptureControlRow.tsx
   Scope: Render one interactive Environment engagement switch row
   Last Updated:
   - iso: 2026-07-13
   - note: distinguish disabled rows from inactive selectable modes
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type {
    CaptureControlId,
    CaptureControlRowData,
} from "../../internal/capture.types";

/* ------------------------------
   Types
-------------------------------- */
type CaptureControlRowProps = {
    row: CaptureControlRowData;
    style?: CSSProperties;
    onToggle: (controlId: CaptureControlId) => void;
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
    transition: "opacity 160ms ease",
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
    boxSizing: "border-box",

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",

    appearance: "none",
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: 2,

    overflow: "hidden",
    background: "var(--surface-muted)",

    transition:
        "border-color 160ms ease, background 160ms ease",
};

const SWITCH_DOT_STYLE: CSSProperties = {
    width: 22,
    height: 22,
    flex: "0 0 auto",

    borderRadius: 999,
    background: "var(--text-tertiary)",

    transform: "translateX(0)",
    transition:
        "transform 160ms ease, background 160ms ease",
};

/* ------------------------------
   Component
-------------------------------- */
export default function CaptureControlRow({
    row,
    style,
    onToggle,
}: CaptureControlRowProps) {
    const rowOpacity = row.isDisabled
        ? 0.42
        : row.isMuted
            ? 0.62
            : 1;

    const rowStyle: CSSProperties = {
        ...ROW_STYLE,
        ...style,
        opacity: rowOpacity,
    };

    const switchStyle: CSSProperties = {
        ...SWITCH_STYLE,

        borderColor: row.isOn
            ? "var(--accent-primary)"
            : "var(--border-soft)",

        background: row.isOn
            ? "var(--accent-primary)"
            : "var(--surface-muted)",

        cursor: row.isDisabled
            ? "not-allowed"
            : "pointer",
    };

    const switchDotStyle: CSSProperties = {
        ...SWITCH_DOT_STYLE,

        background: row.isOn
            ? "var(--text-primary)"
            : "var(--text-tertiary)",

        transform: row.isOn
            ? "translateX(20px)"
            : "translateX(0)",
    };

    function handleToggle() {
        if (row.isDisabled) {
            return;
        }

        onToggle(row.id);
    }

    return (
        <div style={rowStyle}>
            <div style={TEXT_STACK_STYLE}>
                <Text as="h3" type="label">
                    {row.label}
                </Text>

                <Text
                    as="p"
                    type="meta"
                    style={VALUE_STYLE}
                >
                    {row.value}
                </Text>
            </div>

            <button
                type="button"
                role="switch"
                aria-label={`${row.label} ${row.isOn ? "on" : "off"
                    }`}
                aria-checked={row.isOn}
                aria-disabled={row.isDisabled}
                disabled={row.isDisabled}
                onClick={handleToggle}
                style={switchStyle}
            >
                <span style={switchDotStyle} />
            </button>
        </div>
    );
}