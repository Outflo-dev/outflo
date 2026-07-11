/* ==========================================================
   OUTFLO — ENVIRONMENT REFRESH RING GEOMETRY
   File: components/system/primitives/marks/environment/refresh-ring/environment-refresh-ring.geometry.ts
   Scope: Own shared Environment refresh ring geometry
   ========================================================== */

export const ENVIRONMENT_REFRESH_RING_GEOMETRY = {
    viewBoxSize: 44,
    center: 22,
    radius: 14,
    pathLength: 100,
} as const;

export const ENVIRONMENT_REFRESH_RING_DIAMETER_PERCENT =
    `${(
        (
            ENVIRONMENT_REFRESH_RING_GEOMETRY.radius * 2
        ) /
        ENVIRONMENT_REFRESH_RING_GEOMETRY.viewBoxSize
    ) *
    100
    }%`;