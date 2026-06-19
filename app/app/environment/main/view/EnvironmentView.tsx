// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate shell around launch surface
   Last Updated:
   - ms: 1781750277364
   - iso: 2026-06-18T02:37:57.364Z
   - note: move Environment section composition into launch surface seam
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentHeader from "./header/EnvironmentHeader";
import EnvironmentFooter from "./footer/EnvironmentFooter";
import EnvironmentAtmosphere from "./scene/EnvironmentAtmosphere";
import EnvironmentLaunchSurface from "./launch/EnvironmentLaunchSurface";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentViewProps = {
    model: EnvironmentViewModel;
    onBack: () => void;
    onRefresh: () => void;
    refreshing: boolean;
    environmentPreferences: EnvironmentPreferences;
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentView({
    model,
    onBack,
    onRefresh,
    refreshing,
    environmentPreferences,
}: EnvironmentViewProps) {
    const ROOT_STYLE: CSSProperties = {
        position: "relative",
        width: "100%",
        isolation: "isolate",
    };

    const CONTENT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 1,
        display: "grid",
        rowGap: 7,
    };

    return (
        <section style={ROOT_STYLE}>
            <EnvironmentAtmosphere scene={model.scene} />

            <section style={CONTENT_STYLE}>
                <EnvironmentHeader
                    onBack={onBack}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    environmentPreferences={environmentPreferences}
                />

                <EnvironmentLaunchSurface model={model} />

                <EnvironmentFooter hasSnapshot={model.hasSnapshot} />
            </section>
        </section>
    );
}