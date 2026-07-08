"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT KELVIN DIAL READOUT
   File: app/app/environment/main/view/hero/instruments/kelvin/readout/EnvironmentKelvinDialReadout.tsx
   Scope: Render Kelvin dial central value stack
   ========================================================== */

import type { CSSProperties } from "react";
import type { EnvironmentKelvinDialReadoutProps } from "../geometry/kelvin-dial.types";

export default function EnvironmentKelvinDialReadout({
    value,
    celsius,
    fahrenheit,
    kelvin,
    unitLabel,
}: EnvironmentKelvinDialReadoutProps) {
    const ROOT_STYLE: CSSProperties = {
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
    };

    return (
        <div style={ROOT_STYLE}>
            <div style={{ textAlign: "center" }}>
                <div>{value}</div>
                <div>{unitLabel}</div>
                <div>
                    {celsius}°C · {fahrenheit}°F · {kelvin}K
                </div>
            </div>
        </div>
    );
}