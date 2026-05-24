"use client";

/* ==========================================================
   OUTFLO — MANUAL CITY SECTION
   File: app/account/profile/(pages)/environment/location/manual-city/main/view/sections/ManualCitySection.tsx
   Scope: Render active place input and save action
   Last Updated:
   - ms: 1779411840000
   - iso: 2026-05-22T01:04:00.000Z
   - note: align active place body with location drilldown packet grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";

import type { ManualCityViewModel } from "../../internal/manual-city.types";

/* ------------------------------
   Types
-------------------------------- */
type ManualCitySectionProps = {
    model: ManualCityViewModel;
    onDraftCityChange: (value: string) => void;
    onSaveCity: () => void;
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

const ROW_STYLE: CSSProperties = {
    minHeight: 76,
    display: "grid",
    rowGap: 5,
    alignContent: "center",
    borderBottom: "1px solid var(--border-soft)",
};

const VALUE_STYLE: CSSProperties = {
    color: "var(--text-secondary)",
};

const FIELD_STACK_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 12,
    paddingTop: 14,
};

const INPUT_STYLE: CSSProperties = {
    width: "100%",
    minHeight: 48,
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: "0 14px",
    background: "var(--surface-muted)",
    color: "var(--text-primary)",
    outline: "none",
};

const BUTTON_STYLE: CSSProperties = {
    width: "fit-content",
    minHeight: 36,
    border: "1px solid var(--border-soft)",
    borderRadius: 999,
    padding: "0 14px",
    background: "var(--surface-muted)",
    color: "var(--text-primary)",
};

const DISABLED_BUTTON_STYLE: CSSProperties = {
    opacity: 0.42,
    cursor: "not-allowed",
};

const ENABLED_BUTTON_STYLE: CSSProperties = {
    cursor: "pointer",
};

/* ------------------------------
   Component
-------------------------------- */
export default function ManualCitySection({
    model,
    onDraftCityChange,
    onSaveCity,
    saving,
}: ManualCitySectionProps) {
    const disabled = saving || !model.canSave;

    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                Controls
            </Text>

            <div>
                <div style={ROW_STYLE}>
                    <Text as="h3" type="label">
                        {model.currentLabel}
                    </Text>

                    <Text as="p" type="meta" style={VALUE_STYLE}>
                        {model.currentValue}
                    </Text>
                </div>

                <div style={FIELD_STACK_STYLE}>
                    <input
                        value={model.value}
                        placeholder={model.placeholder}
                        onChange={(event) =>
                            onDraftCityChange(event.currentTarget.value)
                        }
                        style={INPUT_STYLE}
                    />

                    <button
                        type="button"
                        disabled={disabled}
                        onClick={onSaveCity}
                        style={{
                            ...BUTTON_STYLE,
                            ...(disabled
                                ? DISABLED_BUTTON_STYLE
                                : ENABLED_BUTTON_STYLE),
                        }}
                    >
                        <Text as="span" type="meta">
                            {saving ? "Saving" : "Save place"}
                        </Text>
                    </button>
                </div>
            </div>
        </section>
    );
}