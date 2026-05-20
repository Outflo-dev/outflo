"use client";

/* ==========================================================
   OUTFLO — LOCATION SYSTEM SECTION
   File: app/account/profile/(pages)/environment/location/main/view/sections/LocationSystemSection.tsx
   Scope: Render location system participation toggle
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: wire location system toggle action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import ToggleAction from "@/components/system/actions/toggle/ToggleAction";
import Text from "@/components/system/primitives/display/type/Text";

import type { LocationViewModel } from "../../internal/location.types";
import LocationSettingRow from "../rows/LocationSettingRow";

/* ------------------------------
   Types
-------------------------------- */
type LocationSystemSectionProps = {
    model: LocationViewModel;
    onToggleLocation: () => void;
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

/* ------------------------------
   Component
-------------------------------- */
export default function LocationSystemSection({
    model,
    onToggleLocation,
    saving,
}: LocationSystemSectionProps) {
    return (
        <section style={SECTION_STYLE}>
            <Text as="h2" type="meta" style={TITLE_STYLE}>
                System
            </Text>

            <LocationSettingRow
                label={model.master.label}
                value={model.master.value}
                right={
                    <ToggleAction
                        checked={model.master.enabled}
                        disabled={saving}
                        onClick={onToggleLocation}
                        ariaLabel="Toggle location participation"
                    />
                }
            />
        </section>
    );
}