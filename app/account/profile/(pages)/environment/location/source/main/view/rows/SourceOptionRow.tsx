"use client";

/* ==========================================================
   OUTFLO — SOURCE OPTION ROW
   File: app/account/profile/(pages)/environment/location/source/main/view/rows/SourceOptionRow.tsx
   Scope: Render one interactive location source choice row
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: replace source toggles with source choice actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { SourceOptionData } from "../../internal/source.types";

/* ------------------------------
   Types
-------------------------------- */
type SourceOptionRowProps = {
    option: SourceOptionData;
    disabled: boolean;
    onSelect: () => void;
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
};

const DISABLED_ROW_STYLE: CSSProperties = {
    opacity: 0.42,
};

const ENABLED_ROW_STYLE: CSSProperties = {
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

const ACTION_STYLE: CSSProperties = {
    minHeight: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: "0 10px",
    background: "var(--surface-muted)",
    color: "var(--text-secondary)",
};

const SELECTED_ACTION_STYLE: CSSProperties = {
    color: "var(--text-primary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function SourceOptionRow({
    option,
    disabled,
    onSelect,
    style,
}: SourceOptionRowProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onSelect}
            style={{
                ...ROW_STYLE,
                ...(disabled ? DISABLED_ROW_STYLE : ENABLED_ROW_STYLE),
                ...style,
            }}
        >
            <div style={TEXT_STACK_STYLE}>
                <Text as="h3" type="label">
                    {option.label}
                </Text>

                <Text as="p" type="meta" style={VALUE_STYLE}>
                    {option.value}
                </Text>
            </div>

            <span
                style={{
                    ...ACTION_STYLE,
                    ...(option.selected ? SELECTED_ACTION_STYLE : null),
                }}
            >
                <Text as="span" type="meta">
                    {option.actionLabel}
                </Text>
            </span>
        </button>
    );
}