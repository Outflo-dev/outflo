"use client";

/* ==========================================================
   OUTFLO — SNAPSHOTS RECORDS SECTION
   File: app/account/profile/(pages)/environment/snapshots/main/view/sections/SnapshotsRecordsSection.tsx
   Scope: Render environment snapshot record rows
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add snapshots records section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { SnapshotsViewModel } from "../../internal/snapshots.types";
import SnapshotRecordRow from "../rows/SnapshotRecordRow";

/* ------------------------------
   Types
-------------------------------- */
type SnapshotsRecordsSectionProps = {
    model: SnapshotsViewModel;
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
export default function SnapshotsRecordsSection({
    model,
}: SnapshotsRecordsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Records
            </Text>

            <div>
                {model.records.map((row, index) => (
                    <SnapshotRecordRow
                        key={row.label}
                        row={row}
                        style={
                            index < model.records.length - 1
                                ? ROW_DIVIDER_STYLE
                                : undefined
                        }
                    />
                ))}
            </div>
        </section>
    );
}