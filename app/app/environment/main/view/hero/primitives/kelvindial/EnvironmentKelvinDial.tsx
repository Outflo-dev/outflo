"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL
   File: app/app/environment/main/view/hero/primitives/kelvindial/EnvironmentKelvinDial.tsx
   Scope: Compose Kelvin dial face and readout
   Last Updated:
   - ms:
   - iso:
   - note: reduce Kelvin dial primitive to dial composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import EnvironmentKelvinDialFace from "./EnvironmentKelvinDialFace";
import EnvironmentKelvinDialReadout from "./EnvironmentKelvinDialReadout";
import type { EnvironmentKelvinDialProps } from "./kelvin-dial.types";

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentKelvinDial({
    value,
    celsius,
    fahrenheit,
    kelvin,
    unitLabel,
    indicatorValue,
    min = 0,
    max = 400,
}: EnvironmentKelvinDialProps) {
    const ROOT_STYLE: CSSProperties = {
        position: "relative",
        width: "min(394px, calc(100vw - 36px))",
        aspectRatio: "1",
        marginInline: "auto",
    };

    return (
        <div style={ROOT_STYLE} aria-label="Kelvin Environment dial">
            <EnvironmentKelvinDialFace
                indicatorValue={indicatorValue}
                min={min}
                max={max}
            />

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