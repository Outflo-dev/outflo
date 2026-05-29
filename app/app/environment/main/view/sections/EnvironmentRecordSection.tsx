// app/app/environment/main/view/sections/EnvironmentRecordSection.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECORD SECTION
   File: app/app/environment/main/view/sections/EnvironmentRecordSection.tsx
   Scope: Compose Environment latest record proof section
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: delegate record internals to local record owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentRecordModel } from "../../internal/environment.types";
import EnvironmentRecordHeader from "./records/EnvironmentRecordHeader";
import EnvironmentRecordCard from "./records/EnvironmentRecordCard";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRecordSectionProps = {
    model: EnvironmentRecordModel;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRecordSection({
    model,
}: EnvironmentRecordSectionProps) {
    const SECTION_STYLE: CSSProperties = {
        display: "grid",
        rowGap: 5,
    };

    return (
        <section style={SECTION_STYLE}>
            <EnvironmentRecordHeader />
            <EnvironmentRecordCard model={model} />
        </section>
    );
}