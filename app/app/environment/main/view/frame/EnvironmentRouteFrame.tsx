// app/app/environment/main/view/frame/EnvironmentRouteFrame.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT ROUTE FRAME
   File: app/app/environment/main/view/frame/EnvironmentRouteFrame.tsx
   Scope: Own Environment route surface and AppFrame placement
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: isolate Environment route frame ownership from controller and view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import AppFrame from "@/components/system/shell/app/AppFrame";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRouteFrameProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRouteFrame({
    children,
}: EnvironmentRouteFrameProps) {
    const MAIN_STYLE: CSSProperties = {
        position: "relative",
        minHeight: "100svh",
        padding:
            "calc(env(safe-area-inset-top) + 6px) 0 max(18px, env(safe-area-inset-bottom))",
        color: "var(--text-primary)",
        overflowX: "clip",
        isolation: "isolate",
    };

    return (
        <main style={MAIN_STYLE}>
            <AppFrame>{children}</AppFrame>
        </main>
    );
}