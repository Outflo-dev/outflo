"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL
   File: app/app/environment/main/view/hero/instruments/kelvin/EnvironmentKelvinDial.tsx
   Scope: Compose Kelvin dial instrument
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentKelvinDialFrame from "./frame/EnvironmentKelvinDialFrame";
import type { EnvironmentKelvinDialProps } from "./geometry/kelvin-dial.types";
import EnvironmentKelvinDialReadout from "./readout/EnvironmentKelvinDialReadout";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDial({
    value,
    celsius,
    fahrenheit,
    kelvin,
    unitLabel,
}: EnvironmentKelvinDialProps) {
    const ROOT_STYLE: CSSProperties = {
        position: "relative",
        width: "min(394px, calc(100vw - 36px))",
        aspectRatio: "1",
        marginInline: "auto",
    };

    return (
        <div style={ROOT_STYLE} aria-label="Kelvin Environment dial">
            <EnvironmentKelvinDialFrame />

            <EnvironmentKelvinDialReadout
                value={value}
                celsius={celsius}
                fahrenheit={fahrenheit}
                kelvin={kelvin}
                unitLabel={unitLabel}
            />
        </div>
    );
}