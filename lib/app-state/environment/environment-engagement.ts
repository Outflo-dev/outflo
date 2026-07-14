/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT
   File: lib/app-state/environment/environment-engagement.ts
   Scope: Define canonical Guide-owned Environment engagement state
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentEngagementMode =
    | "system"
    | "precise"
    | "capture";

export type EnvironmentEngagementState = {
    enabled: boolean;
    mode: EnvironmentEngagementMode;
};

/* ------------------------------
   Defaults
-------------------------------- */
export const DEFAULT_ENVIRONMENT_ENGAGEMENT_STATE:
    EnvironmentEngagementState = Object.freeze({
        enabled: false,
        mode: "system",
    });

/* ------------------------------
   Validation
-------------------------------- */
export function isEnvironmentEngagementMode(
    value: unknown,
): value is EnvironmentEngagementMode {
    return (
        value === "system" ||
        value === "precise" ||
        value === "capture"
    );
}

export function isEnvironmentEngagementState(
    value: unknown,
): value is EnvironmentEngagementState {
    if (
        typeof value !== "object" ||
        value === null
    ) {
        return false;
    }

    const candidate =
        value as Partial<EnvironmentEngagementState>;

    return (
        typeof candidate.enabled === "boolean" &&
        isEnvironmentEngagementMode(candidate.mode)
    );
}