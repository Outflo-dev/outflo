"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT INFO ROW
   File: app/account/profile/(pages)/environment/main/view/rows/EnvironmentInfoRow.tsx
   Scope: Render one environment row through shared system row grammar
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: render environment master row as direct toggle and category rows as controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import MarkFrame from "@/components/system/primitives/marks/frame/MarkFrame";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import SystemRow from "@/components/system/surfaces/rows/SystemRow";

import type { EnvironmentInfoRowData } from "../../internal/environment.types";
import EnvironmentInfoRowMark from "./EnvironmentInfoRowMark";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentInfoRowProps = {
    row: EnvironmentInfoRowData;
    style?: CSSProperties;
};

/* ------------------------------
   Constants
-------------------------------- */
const ACTION_STACK_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
};

const ACTION_PILL_STYLE: CSSProperties = {
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

const TOGGLE_STYLE: CSSProperties = {
    width: 48,
    height: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: 2,
    background: "var(--surface-muted)",
};

const TOGGLE_DOT_STYLE: CSSProperties = {
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "var(--text-tertiary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentInfoRow({
    row,
    style,
}: EnvironmentInfoRowProps) {
    const isMasterToggle = row.mark === "environment" && !row.href;

    return (
        <SystemRow
            href={row.href}
            mark={
                <MarkFrame>
                    <EnvironmentInfoRowMark mark={row.mark} />
                </MarkFrame>
            }
            label={row.label}
            value={row.value}
            right={
                isMasterToggle ? (
                    <span aria-label="Environment off" role="switch" aria-checked="false" style={TOGGLE_STYLE}>
                        <span style={TOGGLE_DOT_STYLE} />
                    </span>
                ) : row.actionLabel ? (
                    <span style={ACTION_STACK_STYLE}>
                        <span style={ACTION_PILL_STYLE}>
                            <Text as="span" type="meta">
                                {row.actionLabel}
                            </Text>
                        </span>

                        {row.href ? (
                            <Chevron
                                direction="right"
                                role="menu"
                                size="var(--chevron-size-md)"
                                color="var(--text-secondary)"
                            />
                        ) : null}
                    </span>
                ) : null
            }
            style={style}
        />
    );
}