"use client";

/* ==========================================================
   OUTFLO — LOCATION CONTROLS SECTION
   File: app/account/profile/(pages)/environment/location/main/view/sections/LocationControlsSection.tsx
   Scope: Render location control drilldown rows
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: render active place row instead of manual city row
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";

import type {
    LocationControlDrillData,
    LocationViewModel,
} from "../../internal/location.types";
import LocationSettingRow from "../rows/LocationSettingRow";

/* ------------------------------
   Types
-------------------------------- */
type LocationControlsSectionProps = {
    model: LocationViewModel;
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

const ROW_LINK_STYLE: CSSProperties = {
    display: "block",
    color: "inherit",
    textDecoration: "none",
};

const ACTION_STACK_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
};

const PILL_STYLE: CSSProperties = {
    minHeight: 28,
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
export default function LocationControlsSection({
    model,
}: LocationControlsSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Controls
            </Text>

            <div>
                <ControlRow
                    control={model.source}
                    style={ROW_DIVIDER_STYLE}
                />

                <ControlRow
                    control={model.activePlace}
                    style={ROW_DIVIDER_STYLE}
                />

                <ControlRow control={model.precision} />
            </div>
        </section>
    );
}

/* ------------------------------
   Helpers
-------------------------------- */
function ControlRow({
    control,
    style,
}: {
    control: LocationControlDrillData;
    style?: CSSProperties;
}) {
    const row = (
        <LocationSettingRow
            label={control.label}
            value={control.value}
            disabled={control.disabled}
            style={style}
            right={
                <ControlDrillAction
                    label={control.actionLabel}
                    disabled={control.disabled}
                />
            }
        />
    );

    return wrapEnabledRow(control, row);
}

function wrapEnabledRow(control: LocationControlDrillData, row: ReactNode) {
    if (control.disabled || !control.href) return row;

    return (
        <Link href={control.href} style={ROW_LINK_STYLE}>
            {row}
        </Link>
    );
}

function ControlDrillAction({
    label,
    disabled,
}: {
    label: string;
    disabled: boolean;
}) {
    return (
        <span style={ACTION_STACK_STYLE}>
            <span style={PILL_STYLE}>
                <Text as="span" type="meta">
                    {label}
                </Text>
            </span>

            {disabled ? null : (
                <Chevron
                    direction="right"
                    role="menu"
                    size="var(--chevron-size-md)"
                    color="var(--text-secondary)"
                />
            )}
        </span>
    );
}