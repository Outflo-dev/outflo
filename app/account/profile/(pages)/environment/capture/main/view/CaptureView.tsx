"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT VIEW
   File: app/account/profile/(pages)/environment/capture/main/view/CaptureView.tsx
   Scope: Compose Environment engagement control surface
   Last Updated:
   - iso: 2026-07-13
   - note: connect Engagement, Precise, and Capture controls
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type {
    CaptureControlId,
    CaptureViewModel,
} from "../internal/capture.types";

import CaptureFooter from "./footer/CaptureFooter";
import CaptureHeader from "./header/CaptureHeader";
import CaptureControlsSection from "./sections/CaptureControlsSection";
import CaptureSystemSection from "./sections/CaptureSystemSection";

/* ------------------------------
   Types
-------------------------------- */
type CaptureViewProps = {
    model: CaptureViewModel;
    onBack: () => void;
    onToggle: (controlId: CaptureControlId) => void;
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
export default function CaptureView({
    model,
    onBack,
    onToggle,
}: CaptureViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <CaptureHeader onBack={onBack} />

            <CaptureSystemSection
                model={model}
                onToggle={onToggle}
            />

            <CaptureControlsSection
                model={model}
                onToggle={onToggle}
            />

            <CaptureFooter />
        </section>
    );
}