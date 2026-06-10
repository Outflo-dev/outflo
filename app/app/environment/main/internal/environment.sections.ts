/* ==========================================================
   OUTFLO — ENVIRONMENT SECTIONS
   File: app/app/environment/main/internal/environment.sections.ts
   Scope: Preserve Environment model entrypoint while delegating to compiler layer
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: pass persisted Environment preferences through compiler wrapper
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

import { compileEnvironmentModel } from "./compiler/environment.compiler";
import type {
    EnvironmentSnapshot,
    EnvironmentViewModel,
} from "./environment.types";

/* ------------------------------
   Public API
-------------------------------- */
export function getEnvironmentModel(
    snapshot: EnvironmentSnapshot | null,
    environmentEnabled: boolean,
    environmentPreferences: EnvironmentPreferences
): EnvironmentViewModel {
    return compileEnvironmentModel(
        snapshot,
        environmentEnabled,
        environmentPreferences
    );
}