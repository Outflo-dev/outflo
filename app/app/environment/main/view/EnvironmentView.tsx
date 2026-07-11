// app/app/environment/main/view/EnvironmentView.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT VIEW
   File: app/app/environment/main/view/EnvironmentView.tsx
   Scope: Compose Environment substrate shell around Kelvin center
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type { EnvironmentPreferences } from "@/lib/app-state/environment/environment-preferences";

import { VISUAL } from "../../../../../components/system/primitives/visuals";

import type { EnvironmentViewModel } from "../internal/environment.types";
import EnvironmentContextCard from "./context/EnvironmentContextCard";
import EnvironmentHeader from "./header/EnvironmentHeader";
import EnvironmentHero from "./hero/EnvironmentHero";
import EnvironmentAtmosphere from "./scene/EnvironmentAtmosphere";
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
   Styles
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
    position: "relative",
    width: "100%",
    isolation: "isolate",
};

const CONTENT_STYLE: CSSProperties = {
    position: "relative",
    zIndex: 1,
    display: "grid",
    rowGap: VISUAL.spacing[2],
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