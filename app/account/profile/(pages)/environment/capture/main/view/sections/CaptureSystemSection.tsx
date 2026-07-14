"use client";

/* ==========================================================
   OUTFLO — ENGAGEMENT SYSTEM SECTION
   File: app/account/profile/(pages)/environment/capture/main/view/sections/CaptureSystemSection.tsx
   Scope: Render the Environment Engagement system control
   Last Updated:
   - iso: 2026-07-13
   - note: connect the Engagement control to controller state
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type {
    CaptureControlId,
    CaptureViewModel,
} from "../../internal/capture.types";
import CaptureControlRow from "../rows/CaptureControlRow";

/* ------------------------------
   Types
-------------------------------- */
type CaptureSystemSectionProps = {
    model: CaptureViewModel;
    onToggle: (controlId: CaptureControlId) => void;
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

/* ------------------------------
   Component
-------------------------------- */
export default function CaptureSystemSection({
    model,
    onToggle,
}: CaptureSystemSectionProps) {
    const engagement = model.controls.find(
        (row) => row.id === "engagement",
    );

    if (!engagement) {
        return null;
    }

    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                System
            </Text>

            <CaptureControlRow
                row={engagement}
                onToggle={onToggle}
            />
        </section>
    );
}