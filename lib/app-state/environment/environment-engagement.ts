/* ==========================================================
   OUTFLO — ENVIRONMENT ENGAGEMENT
   File: lib/app-state/environment/environment-engagement.ts
   Scope: Define canonical Guide-owned Environment engagement state
   Last Updated:
   - iso: 2026-07-13
   - note: centralize canonical Engagement state transitions
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */
export type EnvironmentEngagementMode =
    | "system"
    | "precise"
    | "capture";

export type EnvironmentEngagementSelectableMode =
    | "precise"
    | "capture";

export type EnvironmentEngagementState = {
    enabled: boolean;
    mode: EnvironmentEngagementMode;
};

export type EnvironmentEngagementTransition =
    | {
        type: "toggle-enabled";
    }
    | {
        type: "select-mode";
        mode: EnvironmentEngagementSelectableMode;
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

export function isEnvironmentEngagementSelectableMode(
    value: unknown,
): value is EnvironmentEngagementSelectableMode {
    return (
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

/* ------------------------------
   State Resolution
-------------------------------- */
export function resolveEnvironmentEngagementState(
    current: EnvironmentEngagementState,
    transition: EnvironmentEngagementTransition,
): EnvironmentEngagementState {
    if (transition.type === "toggle-enabled") {
        return {
            ...current,
            enabled: !current.enabled,
        };
    }

    if (!current.enabled) {
        return current;
    }

    if (current.mode === transition.mode) {
        return current;
    }

    return {
        enabled: true,
        mode: transition.mode,
    };
}