"use client";

/* ==========================================================
   OUTFLO — LOCATION SOURCE VIEW
   File: app/account/profile/(pages)/environment/location/source/main/view/SourceView.tsx
   Scope: Compose location source control surface
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: pass source selection actions into options section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type {
    SourceOptionKind,
    SourceViewModel,
} from "../internal/source.types";
import SourceHeader from "./header/SourceHeader";
import SourceOptionsSection from "./sections/SourceOptionsSection";
import SourceFooter from "./footer/SourceFooter";

/* ------------------------------
   Types
-------------------------------- */
type SourceViewProps = {
    model: SourceViewModel;
    onBack: () => void;
    onSelectSource: (kind: SourceOptionKind) => void;
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
export default function SourceView({
    model,
    onBack,
    onSelectSource,
    saving,
}: SourceViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <SourceHeader onBack={onBack} />

            <SourceOptionsSection
                model={model}
                onSelectSource={onSelectSource}
                saving={saving}
            />

            <SourceFooter />
        </section>
    );
}