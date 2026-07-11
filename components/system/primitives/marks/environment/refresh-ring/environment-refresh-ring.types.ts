/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH RING TYPES
   File: components/system/primitives/marks/environment/refresh-ring/environment-refresh-ring.types.ts
   Scope: Define Environment refresh ring state and public contracts
   ========================================================== */

export type EnvironmentRefreshRingState =
    | "idle"
    | "refreshing"
    | "success";

export type EnvironmentRefreshRingProps = {
    state: EnvironmentRefreshRingState;
};