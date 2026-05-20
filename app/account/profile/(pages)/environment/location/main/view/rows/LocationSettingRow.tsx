"use client";

/* ==========================================================
   OUTFLO — LOCATION SETTING ROW
   File: app/account/profile/(pages)/environment/location/main/view/rows/LocationSettingRow.tsx
   Scope: Render one location setting row with a flexible right-side control slot
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: replace switch-only location row with reusable setting row shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import Text from "@/components/system/primitives/display/type/Text";

/* ------------------------------
   Types
-------------------------------- */
type LocationSettingRowProps = {
    label: string;
    value: string;
    right?: ReactNode;
    disabled?: boolean;
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

const DISABLED_STYLE: CSSProperties = {
    opacity: 0.42,
};

const RIGHT_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LocationSettingRow({
    label,
    value,
    right,
    disabled = false,
    style,
}: LocationSettingRowProps) {
    return (
        <div
            style={{
                ...ROW_STYLE,
                ...(disabled ? DISABLED_STYLE : undefined),
                ...style,
            }}
        >
            <div style={TEXT_STACK_STYLE}>
                <Text as="h3" type="label">
                    {label}
                </Text>

                <Text as="p" type="meta" style={VALUE_STYLE}>
                    {value}
                </Text>
            </div>

            {right ? <div style={RIGHT_STYLE}>{right}</div> : null}
        </div>
    );
}