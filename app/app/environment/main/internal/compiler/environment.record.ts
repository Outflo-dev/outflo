/* ==========================================================
   OUTFLO — ENVIRONMENT RECORD COMPILER
   File: app/app/environment/main/internal/compiler/environment.record.ts
   Scope: Own Environment record/proof section model compilation
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: extract record model compilation from environment.sections.ts
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    EnvironmentRecordModel,
    EnvironmentSnapshot,
} from "../environment.types";
import { formatMs } from "./environment.compiler.utils";
import { getEnvironmentSignal, getEnvironmentSource } from "./environment.location";

/* ------------------------------
   Public API
-------------------------------- */
export function compileEnvironmentRecord(
    snapshot: EnvironmentSnapshot
): EnvironmentRecordModel {
    return {
        title: "Latest Record",
        subtitle: "Current snapshot proof.",
        primary: getEnvironmentSource(snapshot),
        secondary: getRecordSecondary(snapshot),
    };
}

/* ------------------------------
   Helpers
-------------------------------- */
function getRecordSecondary(snapshot: EnvironmentSnapshot): string {
    const pulledAt = formatMs(
        snapshot.environment_context_pulled_at_ms ?? snapshot.moment_ms
    );
    const signal = getEnvironmentSignal(snapshot);

    if (pulledAt === "—") {
        return signal;
    }

    return `${signal} · ${pulledAt}`;
}