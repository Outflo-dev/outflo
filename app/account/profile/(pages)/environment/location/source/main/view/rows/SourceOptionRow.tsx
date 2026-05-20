"use client";

/* ==========================================================
   OUTFLO — SOURCE OPTION ROW
   File: app/account/profile/(pages)/environment/location/source/main/view/rows/SourceOptionRow.tsx
   Scope: Render one interactive location source option row
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: wire source option row selection and disabled state
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
    cursor: "not-allowed",
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

const PILL_STYLE: CSSProperties = {
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

const SELECTED_PILL_STYLE: CSSProperties = {
    background: "var(--surface-soft)",
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
            <span style={TEXT_STACK_STYLE}>
                <Text as="span" type="label">
                    {option.label}
                </Text>

                <Text as="span" type="meta" style={VALUE_STYLE}>
                    {option.value}
                </Text>
            </span>

            <span
                style={{
                    ...PILL_STYLE,
                    ...(option.selected ? SELECTED_PILL_STYLE : undefined),
                }}
            >
                <Text as="span" type="meta">
                    {getPillLabel(option, disabled)}
                </Text>
            </span>
        </button>
    );
}

/* ------------------------------
   Helpers
-------------------------------- */
function getPillLabel(option: SourceOptionData, disabled: boolean) {
    if (option.selected) return "Selected";
    if (disabled) return "Disabled";
    return "Select";
}