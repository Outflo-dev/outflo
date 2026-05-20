"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT PRECIPITATION VIEW
   File: app/account/profile/(pages)/environment/precipitation/main/view/PrecipitationView.tsx
   Scope: Compose precipitation control surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add precipitation control view with header footer packet shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { PrecipitationViewModel } from "../internal/precipitation.types";
import PrecipitationHeader from "./header/PrecipitationHeader";
import PrecipitationControlsSection from "./sections/PrecipitationControlsSection";
import PrecipitationFooter from "./footer/PrecipitationFooter";

/* ------------------------------
   Types
-------------------------------- */
type PrecipitationViewProps = {
    model: PrecipitationViewModel;
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
export default function PrecipitationView({
    model,
    onBack,
}: PrecipitationViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <PrecipitationHeader onBack={onBack} />

            <PrecipitationControlsSection model={model} />

            <PrecipitationFooter />
        </section>
    );
}