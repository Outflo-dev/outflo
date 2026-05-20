"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT SNAPSHOTS VIEW
   File: app/account/profile/(pages)/environment/snapshots/main/view/SnapshotsView.tsx
   Scope: Compose environment snapshots records surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add snapshots records view with header footer packet shape
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { SnapshotsViewModel } from "../internal/snapshots.types";
import SnapshotsHeader from "./header/SnapshotsHeader";
import SnapshotsRecordsSection from "./sections/SnapshotsRecordsSection";
import SnapshotsFooter from "./footer/SnapshotsFooter";

/* ------------------------------
   Types
-------------------------------- */
type SnapshotsViewProps = {
    model: SnapshotsViewModel;
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
export default function SnapshotsView({ model, onBack }: SnapshotsViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <SnapshotsHeader onBack={onBack} />

            <SnapshotsRecordsSection model={model} />

            <SnapshotsFooter />
        </section>
    );
}