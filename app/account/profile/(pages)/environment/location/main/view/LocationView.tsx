"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT LOCATION VIEW
   File: app/account/profile/(pages)/environment/location/main/view/LocationView.tsx
   Scope: Compose location control surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add location control view with header footer packet shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { LocationViewModel } from "../internal/location.types";
import LocationHeader from "./header/LocationHeader";
import LocationControlsSection from "./sections/LocationControlsSection";
import LocationFooter from "./footer/LocationFooter";

/* ------------------------------
   Types
-------------------------------- */
type LocationViewProps = {
    model: LocationViewModel;
    onBack: () => void;
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
}: LocationViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <LocationHeader onBack={onBack} />

            <LocationControlsSection model={model} />

            <LocationFooter />
        </section>
    );
}