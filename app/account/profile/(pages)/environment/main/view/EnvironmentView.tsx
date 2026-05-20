"use client";

/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT VIEW
   File: app/account/profile/(pages)/environment/main/view/EnvironmentView.tsx
   Scope: Compose profile environment setup sections
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add environment view using account-derived section grammar
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentHeader from "../header/EnvironmentHeader";
import EnvironmentParticipationSection from "./sections/EnvironmentParticipationSection";
import EnvironmentRuntimeSection from "./sections/EnvironmentRuntimeSection";
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

            <EnvironmentRuntimeSection model={model} />

            <EnvironmentRecordsSection model={model} />
        </section>
    );
}