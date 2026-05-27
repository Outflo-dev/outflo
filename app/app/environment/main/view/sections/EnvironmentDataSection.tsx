// app/app/environment/main/view/sections/EnvironmentDataSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT DATA SECTION
   File: app/app/environment/main/view/sections/EnvironmentDataSection.tsx
   Scope: Render grouped Environment substrate fields
   Last Updated:
   - ms: 1779901409308
   - iso: 2026-05-27T17:03:29.308Z
   - note: create Environment grouped data section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import type { EnvironmentSectionModel } from "../../internal/environment.types";
import EnvironmentFieldCard from "../rows/EnvironmentFieldCard";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentDataSectionProps = {
    model: EnvironmentSectionModel;
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

const GRID_STYLE: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentDataSection({
    model,
}: EnvironmentDataSectionProps) {
    if (model.fields.length === 0) return null;

    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                {model.title}
            </Text>

            <div style={GRID_STYLE}>
                {model.fields.map((field) => (
                    <EnvironmentFieldCard
                        key={`${model.title}-${field.label}`}
                        label={field.label}
                        value={field.value}
                    />
                ))}
            </div>
        </section>
    );
}