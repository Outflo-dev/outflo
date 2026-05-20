"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION VIEW
   File: app/account/profile/(pages)/environment/location/main/view/LocationView.tsx
   Scope: Compose location control surface
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: pass location system toggle action into system section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { LocationViewModel } from "../internal/location.types";
import LocationHeader from "./header/LocationHeader";
import LocationSystemSection from "./sections/LocationSystemSection";
import LocationControlsSection from "./sections/LocationControlsSection";
import LocationFooter from "./footer/LocationFooter";

/* ------------------------------
   Types
-------------------------------- */
type LocationViewProps = {
    model: LocationViewModel;
    onBack: () => void;
    onToggleLocation: () => void;
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
export default function LocationView({
    model,
    onBack,
    onToggleLocation,
    saving,
}: LocationViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <LocationHeader onBack={onBack} />

            <LocationSystemSection
                model={model}
                onToggleLocation={onToggleLocation}
                saving={saving}
            />

            <LocationControlsSection model={model} />

            <LocationFooter />
        </section>
    );
}