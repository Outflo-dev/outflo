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
    return <AppFrame>{children}</AppFrame>;
}