"use client";

/* ==========================================================
   OUTFLO — FLOWS SYSTEMS SECTION
   File: app/account/profile/(pages)/flows/main/view/sections/FlowsSystemsSection.tsx
   Scope: Render flows system doorway rows
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add flows systems section using shared row grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { FlowsViewModel } from "../../internal/flows.types";
import FlowsInfoRow from "../rows/FlowsInfoRow";

/* ------------------------------
   Types
-------------------------------- */
type FlowsSystemsSectionProps = {
    model: FlowsViewModel;
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
export default function FlowsSystemsSection({
    model,
}: FlowsSystemsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Systems
            </Text>

            <div>
                {model.systems.map((row, index) => (
                    <FlowsInfoRow
                        key={row.label}
                        row={row}
                        style={
                            index < model.systems.length - 1
                                ? ROW_DIVIDER_STYLE
                                : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
}