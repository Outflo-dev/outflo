/* ==========================================================
   OUTFLO — ENVIRONMENT SECTIONS
   File: app/app/environment/main/internal/environment.sections.ts
   Scope: Preserve Environment model entrypoint while separating live and recorded snapshots
   Last Updated:
   - iso: 2026-07-14
   - note: forward ephemeral Environment state separately from persisted record proof
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentEngagementState,
} from "@/lib/app-state/environment/environment-engagement";
import type {
    EnvironmentPreferences,
} from "@/lib/app-state/environment/environment-preferences";

import {
    compileEnvironmentModel,
} from "./compiler/environment.compiler";
import type {
    EnvironmentSnapshot,
    EnvironmentViewModel,
} from "./environment.types";

/* ------------------------------
   Public API
-------------------------------- */
export function getEnvironmentModel(
    liveSnapshot: EnvironmentSnapshot | null,
    recordedSnapshot: EnvironmentSnapshot | null,
    environmentEnabled: boolean,
    environmentPreferences: EnvironmentPreferences,
    engagementState: EnvironmentEngagementState,
): EnvironmentViewModel {
    return compileEnvironmentModel(
        liveSnapshot,
        recordedSnapshot,
        environmentEnabled,
        environmentPreferences,
        engagementState,
    );
}