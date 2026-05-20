"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT AIR QUALITY VIEW
   File: app/account/profile/(pages)/environment/air-quality/main/view/AirQualityView.tsx
   Scope: Compose air quality control surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add air quality control view with header footer packet shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { AirQualityViewModel } from "../internal/air-quality.types";
import AirQualityHeader from "./header/AirQualityHeader";
import AirQualityControlsSection from "./sections/AirQualityControlsSection";
import AirQualityFooter from "./footer/AirQualityFooter";

/* ------------------------------
   Types
-------------------------------- */
type AirQualityViewProps = {
    model: AirQualityViewModel;
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
export default function AirQualityView({
    model,
    onBack,
}: AirQualityViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <AirQualityHeader onBack={onBack} />

            <AirQualityControlsSection model={model} />

            <AirQualityFooter />
        </section>
    );
}