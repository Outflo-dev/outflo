/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT CLIENT
   File: app/account/profile/(pages)/environment/main/internal/profile-environment.client.ts
   Scope: Persist profile-owned environment preferences from client controls
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: add partial environment preference patch client
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

/* ------------------------------
   Types
-------------------------------- */
export type ProfileEnvironmentPreferences = EnvironmentPreferences;

/* ------------------------------
   Client
-------------------------------- */
export async function saveProfileEnvironmentPreferences(
    preferences: ProfileEnvironmentPreferences
) {
    const response = await fetch("/api/profile/environment", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
    });

    const responseText = await response.text();

    let data: unknown = null;

    try {
        data = responseText ? JSON.parse(responseText) : null;
    } catch {
        data = responseText;
    }

    if (!response.ok) {
        console.error("Environment preference save failed", {
            status: response.status,
            data,
            preferences,
        });

        throw new Error(
            `Failed to save environment preferences. Status: ${response.status}`
        );
    }

    return data as { ok: true };
}

export async function patchProfileEnvironmentPreferences(
    preferences: Partial<ProfileEnvironmentPreferences>
) {
    const response = await fetch("/api/profile/environment", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
    });

    const responseText = await response.text();

    let data: unknown = null;

    try {
        data = responseText ? JSON.parse(responseText) : null;
    } catch {
        data = responseText;
    }

    if (!response.ok) {
        console.error("Environment preference patch failed", {
            status: response.status,
            data,
            preferences,
        });

        throw new Error(
            `Failed to patch environment preferences. Status: ${response.status}`
        );
    }

    return data as { ok: true };
}