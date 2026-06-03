"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER VIEW
   File: app/account/profile/(pages)/environment/weather/main/view/WeatherView.tsx
   Scope: Compose weather control surface
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: pass weather toggle action to controls section
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import type {
    WeatherControlKey,
    WeatherViewModel,
} from "../internal/weather.types";
import WeatherHeader from "./header/WeatherHeader";
import WeatherControlsSection from "./sections/WeatherControlsSection";
import WeatherFooter from "./footer/WeatherFooter";

/* ------------------------------
   Types
-------------------------------- */
type WeatherViewProps = {
    model: WeatherViewModel;
    onBack: () => void;
    onToggle: (key: WeatherControlKey) => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const SURFACE_STYLE: CSSProperties = {
    width: "100%",
    display: "grid",
    rowGap: 38,
};

/* ------------------------------
   Component
-------------------------------- */
export default function WeatherView({
    model,
    onBack,
    onToggle,
}: WeatherViewProps) {
    return (
        <section style={SURFACE_STYLE}>
            <WeatherHeader onBack={onBack} />

            <WeatherControlsSection model={model} onToggle={onToggle} />

            <WeatherFooter />
        </section>
    );
}