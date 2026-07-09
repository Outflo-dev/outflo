// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate shell around Kelvin center
   Last Updated:
   - ms:
   - iso:
   - note: compose Context and Kelvin center with intentional overlap
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

import EnvironmentContextCard from "./context/EnvironmentContextCard";
import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentHeader from "./header/EnvironmentHeader";
import EnvironmentAtmosphere from "./scene/EnvironmentAtmosphere";
import EnvironmentHero from "./hero/EnvironmentHero";
import EnvironmentTiles from "./tiles/EnvironmentTiles";

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
        rowGap: 4,
    };

    const CONTEXT_SLOT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 2,
    };

    const HERO_SLOT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 4,
        marginTop: -20,
    };

    const TILES_SLOT_STYLE: CSSProperties = {
        position: "relative",
        zIndex: 3,
        marginTop: -30,
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

                <div style={CONTEXT_SLOT_STYLE}>
                    <EnvironmentContextCard model={model} />
                </div>

                <div style={HERO_SLOT_STYLE}>
                    <EnvironmentHero />
                </div>

                <div style={TILES_SLOT_STYLE}>
                    <EnvironmentTiles model={model.tiles} />
                </div>
            </section>
        </section>
    );
}