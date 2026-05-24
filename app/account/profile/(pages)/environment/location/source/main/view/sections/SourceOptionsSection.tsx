"use client";

/* ==========================================================
   OUTFLO — SOURCE OPTIONS SECTION
   File: app/account/profile/(pages)/environment/location/source/main/view/sections/SourceOptionsSection.tsx
   Scope: Render location source toggle rows
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: recast source options section as toggle control section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type {
    SourceOptionKind,
    SourceViewModel,
} from "../../internal/source.types";
import SourceOptionRow from "../rows/SourceOptionRow";

/* ------------------------------
   Types
-------------------------------- */
type SourceOptionsSectionProps = {
    model: SourceViewModel;
    onSelectSource: (kind: SourceOptionKind) => void;
    saving: boolean;
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
export default function SourceOptionsSection({
    model,
    onSelectSource,
    saving,
}: SourceOptionsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Controls
            </Text>

            <div>
                {model.options.map((option, index) => (
                    <SourceOptionRow
                        key={option.kind}
                        option={option}
                        disabled={saving || option.disabled}
                        onSelect={() => onSelectSource(option.kind)}
                        style={
                            index < model.options.length - 1
                                ? ROW_DIVIDER_STYLE
                                : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
}