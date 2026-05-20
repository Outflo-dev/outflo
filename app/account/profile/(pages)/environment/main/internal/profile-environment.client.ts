/* ==========================================================
   OUTFLO — PROFILE ENVIRONMENT CLIENT
   File: app/account/profile/(pages)/environment/main/internal/profile-environment.client.ts
   Scope: Persist profile-owned environment preferences from client controls
   Last Updated:
   - ms: 1779283695954
   - iso: 2026-05-20T13:28:15.954Z
   - note: expose environment preference write failures with status and response body
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type ProfileEnvironmentPreferences = {
    location_mode: "off" | "device" | "manual_city";
    manual_city: string | null;
    location_precision: "city" | "approximate" | "precise";
    weather_mode: "off" | "on";
    capture_mode: "off" | "moment" | "continuous";
    sun_mode: "off" | "on";
    precipitation_mode: "off" | "on";
    air_quality_mode: "off" | "on";
    receipt_links_mode: "off" | "on";
    snapshots_mode: "off" | "on";
};

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