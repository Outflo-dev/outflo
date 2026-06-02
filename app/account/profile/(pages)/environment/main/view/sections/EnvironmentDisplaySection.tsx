"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT DISPLAY SECTION
   File: app/account/profile/(pages)/environment/main/view/sections/EnvironmentDisplaySection.tsx
   Scope: Render environment display control rows
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add display controls section to environment doorway
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { EnvironmentViewModel } from "../../internal/environment.types";
import EnvironmentInfoRow from "../rows/EnvironmentInfoRow";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentDisplaySectionProps = {
    model: EnvironmentViewModel;
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
export default function EnvironmentDisplaySection({
    model,
}: EnvironmentDisplaySectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Display
            </Text>

            <div>
                {model.display.map((row, index) => (
                    <EnvironmentInfoRow
                        key={row.label}
                        row={row}
                        style={
                            index < model.display.length - 1
                                ? ROW_DIVIDER_STYLE
                                : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
}