"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SUN VIEW
   File: app/account/profile/(pages)/environment/sun/main/view/SunView.tsx
   Scope: Compose sun control surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add sun control view with header footer packet shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { SunViewModel } from "../internal/sun.types";
import SunHeader from "./header/SunHeader";
import SunControlsSection from "./sections/SunControlsSection";
import SunFooter from "./footer/SunFooter";

/* ------------------------------
   Types
-------------------------------- */
type SunViewProps = {
    model: SunViewModel;
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
export default function SunView({ model, onBack }: SunViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <SunHeader onBack={onBack} />

            <SunControlsSection model={model} />

            <SunFooter />
        </section>
    );
}