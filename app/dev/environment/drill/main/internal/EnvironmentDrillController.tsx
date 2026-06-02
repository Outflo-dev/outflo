/* ==========================================================
   OUTFLO — ENVIRONMENT DRILL CONTROLLER
   File: app/dev/environment/drill/main/internal/EnvironmentDrillController.tsx
   Scope: Client controller for dev-only Environment pings drill prototype
   Last Updated:
   - ms: 1780412455093
   - iso: 2026-06-02T15:00:55.093Z
   - note: create Environment pings drill prototype controller
   ========================================================== */

"use client";

/* ------------------------------
   Imports
-------------------------------- */
import { useMemo, useState } from "react";

import {
    computeEnvironmentPingsDrill,
    computeEnvironmentPingsProofRows,
} from "./environment-drill.compute";
import type { EnvironmentDrillEmitterRow } from "./environment-drill.types";
import EnvironmentDrillView from "../view/EnvironmentDrillView";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentDrillControllerProps = {
    beginMs: number | null;
    nowMs: number;
    rows: EnvironmentDrillEmitterRow[];
    errorMessage: string | null;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentDrillController({
    beginMs,
    nowMs,
    rows,
    errorMessage,
}: EnvironmentDrillControllerProps) {
    const [windPercent, setWindPercent] = useState(100);

    const drill = useMemo(
        () =>
            computeEnvironmentPingsDrill({
                beginMs,
                nowMs,
                windPercent,
                rows,
            }),
        [beginMs, nowMs, rows, windPercent]
    );

    const proofRows = useMemo(
        () =>
            computeEnvironmentPingsProofRows({
                beginMs,
                windMs: drill.windMs,
                rows,
            }),
        [beginMs, drill.windMs, rows]
    );

    return (
        <EnvironmentDrillView
            drill={drill}
            proofRows={proofRows}
            windPercent={windPercent}
            errorMessage={errorMessage}
            onWindPercentChange={setWindPercent}
        />
    );
}