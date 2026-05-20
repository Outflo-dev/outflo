"use client";

/* ==========================================================
   OUTFLO — FLOWS VIEW
   File: app/account/profile/(pages)/flows/main/view/FlowsView.tsx
   Scope: Compose profile flows surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: normalize flows view ownership with header and footer
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { FlowsViewModel } from "../internal/flows.types";
import FlowsHeader from "./header/FlowsHeader";
import FlowsSystemsSection from "./sections/FlowsSystemsSection";
import FlowsFooter from "./footer/FlowsFooter";

/* ------------------------------
   Types
-------------------------------- */
type FlowsViewProps = {
    model: FlowsViewModel;
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
export default function FlowsView({ model, onBack }: FlowsViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <FlowsHeader onBack={onBack} />

            <FlowsSystemsSection model={model} />

            <FlowsFooter />
        </section>
    );
}