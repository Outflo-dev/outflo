"use client";

/* ==========================================================
   OUTFLO — MANUAL CITY VIEW
   File: app/account/profile/(pages)/environment/location/manual-city/main/view/ManualCityView.tsx
   Scope: Compose manual city control surface
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: add manual city form surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { ManualCityViewModel } from "../internal/manual-city.types";
import ManualCityFooter from "./footer/ManualCityFooter";
import ManualCityHeader from "./header/ManualCityHeader";
import ManualCitySection from "./sections/ManualCitySection";

/* ------------------------------
   Types
-------------------------------- */
type ManualCityViewProps = {
    model: ManualCityViewModel;
    onBack: () => void;
    onDraftCityChange: (value: string) => void;
    onSaveCity: () => void;
    saving: boolean;
};

/* ------------------------------
   Constants
-------------------------------- */
const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 38,
};

/* ------------------------------
   Component
-------------------------------- */
export default function ManualCityView({
    model,
    onBack,
    onDraftCityChange,
    onSaveCity,
    saving,
}: ManualCityViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <ManualCityHeader onBack={onBack} />

            <ManualCitySection
                model={model}
                onDraftCityChange={onDraftCityChange}
                onSaveCity={onSaveCity}
                saving={saving}
            />

            <ManualCityFooter />
        </section>
    );
}