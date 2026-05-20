"use client";

/* ==========================================================
   OUTFLO — FLOWS INFO ROW
   File: app/account/profile/(pages)/flows/main/view/rows/FlowsInfoRow.tsx
   Scope: Render one flows row through shared system row grammar
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: render inactive flow actions as status pills
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import SystemRow from "@/components/system/surfaces/rows/SystemRow";

import type { FlowsInfoRowData } from "../../internal/flows.types";
import FlowsInfoRowMark from "./FlowsInfoRowMark";

/* ------------------------------
   Types
-------------------------------- */
type FlowsInfoRowProps = {
    row: FlowsInfoRowData;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const STATUS_PILL_STYLE: CSSProperties = {
    minHeight: 26,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: "0 10px",
    background: "var(--surface-muted)",
    color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function FlowsInfoRow({ row, style }: FlowsInfoRowProps) {
    return (
        <SystemRow
            href={row.href}
            mark={
                <MarkFrame>
                    <FlowsInfoRowMark mark={row.mark} />
                </MarkFrame>
            }
            label={row.label}
            value={row.value}
            right={
                row.href ? (
                    <Chevron
                        direction="right"
                        role="menu"
                        size="var(--chevron-size-md)"
                        color="var(--text-secondary)"
                    />
                ) : row.actionLabel ? (
                    <span style={STATUS_PILL_STYLE}>
                        <Text as="span" type="meta">
                            {row.actionLabel}
                        </Text>
                    </span>
                ) : null
            }
            style={style}
        />
    );
}