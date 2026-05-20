"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CAPTURE VIEW
   File: app/account/profile/(pages)/environment/capture/main/view/CaptureView.tsx
   Scope: Compose capture control surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add capture control view with header footer packet shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { CaptureViewModel } from "../internal/capture.types";
import CaptureHeader from "./header/CaptureHeader";
import CaptureControlsSection from "./sections/CaptureControlsSection";
import CaptureFooter from "./footer/CaptureFooter";

/* ------------------------------
   Types
-------------------------------- */
type CaptureViewProps = {
    model: CaptureViewModel;
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
export default function CaptureView({ model, onBack }: CaptureViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <CaptureHeader onBack={onBack} />

            <CaptureControlsSection model={model} />

            <CaptureFooter />
        </section>
    );
}