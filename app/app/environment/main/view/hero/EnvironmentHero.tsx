"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO
   File: app/app/environment/main/view/hero/EnvironmentHero.tsx
   Scope: Compose fresh Environment hero around Kelvin dial proof only
   Last Updated:
   - ms:
   - iso:
   - note: remove duplicate context / PRECISE card from hero
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentKelvinDial from "./primitives/kelvindial/EnvironmentKelvinDial";

/* ------------------------------
   Constants
-------------------------------- */
const HERO_PROOF_STATE = {
    temperatureC: 16.2,
    temperatureF: 61.2,
    temperatureK: 289.35,
    indicatorValue: 100,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHero() {
    const ROOT_STYLE: CSSProperties = {
        position: "relative",
        display: "grid",
        placeItems: "center",
        minHeight: 494,
        padding: "14px 18px 24px",
    };

    return (
        <section style={ROOT_STYLE} aria-label="Environment Kelvin dial proof">
            <EnvironmentKelvinDial
                value={HERO_PROOF_STATE.temperatureC}
                celsius={HERO_PROOF_STATE.temperatureC}
                fahrenheit={HERO_PROOF_STATE.temperatureF}
                kelvin={HERO_PROOF_STATE.temperatureK}
                unitLabel="KELVIN"
                indicatorValue={HERO_PROOF_STATE.indicatorValue}
            />
        </section>
    );
}