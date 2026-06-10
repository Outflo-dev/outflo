/* ==========================================================
   OUTFLO — ENVIRONMENT PREFERENCES ACTIONS
   File: lib/app-state/environment/environment-preferences.actions.ts
   Scope: Own server actions for persisted Environment preference updates
   Last Updated:
   - ms: 1781108888881
   - iso: 2026-06-10T16:28:08.881Z
   - note: create action wrapper for Environment temperature unit updates
   ========================================================== */

"use server";

/* ------------------------------
   Imports
-------------------------------- */
import { revalidatePath } from "next/cache";

import { updateEnvironmentTemperatureUnit } from "./environment-preferences.server";
import {
    isTemperatureUnit,
    type TemperatureUnit,
} from "./environment-units";

/* ------------------------------
   Public API
-------------------------------- */
export async function updateEnvironmentTemperatureUnitAction(
    temperatureUnit: TemperatureUnit
): Promise<void> {
    if (!isTemperatureUnit(temperatureUnit)) {
        return;
    }

    await updateEnvironmentTemperatureUnit(temperatureUnit);

    revalidatePath("/app/environment");
    revalidatePath("/account/profile/environment");
}