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
    lastUpdatedAt: number | null;
    environmentPreferences: EnvironmentPreferences;
};

/* ------------------------------
   Styles
-------------------------------- */
const ROOT_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    width: "100%",
    isolation: "isolate",
};

const CONTENT_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    zIndex: VISUAL.zIndex[2],
    display: VISUAL.display[3],
    rowGap: VISUAL.spacing[2],
};

const CONTEXT_SLOT_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    zIndex: VISUAL.zIndex[4],
};

const HERO_SLOT_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    zIndex: VISUAL.zIndex[8],
    marginTop: -20,
};

const TILES_SLOT_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    zIndex: VISUAL.zIndex[6],
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
    lastUpdatedAt,
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
                    lastUpdatedAt={lastUpdatedAt}
                    environmentPreferences={environmentPreferences}
                />

                <div style={CONTEXT_SLOT_STYLE}>
                    <EnvironmentContextCard
                        model={model}
                        pingCount="—"
                        moneyValue="—"
                    />
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