"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HERO
   File: app/app/environment/main/view/hero/EnvironmentHero.tsx
   Scope: Compose Environment Kelvin center
   Last Updated:
   - ms:
   - iso:
   - note: fit Kelvin dial center after active UI cleanup
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentKelvinDial from "./instruments/kelvin/EnvironmentKelvinDial";

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
        justifyItems: "center",
        alignItems: "start",
        minHeight: 374,
        padding: "0 0 18px",
    };

    return (
        <section style={ROOT_STYLE} aria-label="Environment Kelvin center">
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