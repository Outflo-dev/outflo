// app/app/environment/main/view/rows/EnvironmentFieldCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT FIELD CARD
   File: app/app/environment/main/view/rows/EnvironmentFieldCard.tsx
   Scope: Render one Environment data field
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment local display card
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
   Constants
-------------------------------- */
const CARD_STYLE: CSSProperties = {
    minHeight: 86,
    display: "grid",
    alignContent: "space-between",
    rowGap: 12,
    padding: 14,
    borderRadius: 20,
    border: "1px solid var(--border-subtle)",
    background: "var(--bg-secondary)",
};

const LABEL_STYLE: CSSProperties = {
    color: "var(--text-tertiary)",
};

const VALUE_STYLE: CSSProperties = {
    overflowWrap: "anywhere",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentFieldCard({
    label,
    value,
}: EnvironmentFieldCardProps) {
    return (
        <div style={CARD_STYLE}>
            <Text as="p" type="meta" style={LABEL_STYLE}>
                {label}
            </Text>

            <Text as="p" type="label" style={VALUE_STYLE}>
                {value}
            </Text>
        </div>
    );
}