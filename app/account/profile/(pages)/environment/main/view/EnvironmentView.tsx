"use client";

/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT VIEW
   File: app/account/profile/(pages)/environment/main/view/EnvironmentView.tsx
   Scope: Compose profile environment setup sections
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: nest header and footer under environment view ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentHeader from "./header/EnvironmentHeader";
import EnvironmentFooter from "./footer/EnvironmentFooter";
import EnvironmentParticipationSection from "./sections/EnvironmentParticipationSection";
import EnvironmentSignalsSection from "./sections/EnvironmentSignalsSection";
import EnvironmentRecordsSection from "./sections/EnvironmentRecordsSection";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentViewProps = {
    model: EnvironmentViewModel;
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
export default function EnvironmentView({
    model,
    onBack,
}: EnvironmentViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <EnvironmentHeader onBack={onBack} />

            <EnvironmentParticipationSection model={model} />

            <EnvironmentSignalsSection model={model} />

            <EnvironmentRecordsSection model={model} />

            <EnvironmentFooter />
        </section>
    );
}