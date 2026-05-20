"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT WEATHER HEADER
   File: app/account/profile/(pages)/environment/weather/main/view/header/WeatherHeader.tsx
   Scope: Render weather controls drilldown header
   Last Updated:
   - ms: 1779269374486
   - iso: 2026-05-20T09:29:34.486Z
   - note: add weather control header
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import WeatherBackAction from "./WeatherBackAction";

/* ------------------------------
   Types
-------------------------------- */
type WeatherHeaderProps = {
    onBack: () => void;
};

/* ------------------------------
   Constants
-------------------------------- */
const HEADER_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 18,
};

const NAV_STYLE: CSSProperties = {
    position: "sticky",
    top: -1,
    zIndex: 10,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "var(--bg-primary)",
    paddingTop: 10,
    paddingBottom: 12,
    marginBottom: -6,
};

const INTRO_STYLE: CSSProperties = {
    display: "grid",
    rowGap: 8,
    paddingTop: 4,
};

const TITLE_STYLE: CSSProperties = {
    fontSize: "var(--header-lg)",
    fontWeight: "var(--font-weight-bold)",
    letterSpacing: "-0.045em",
    lineHeight: 1,
    color: "var(--text-primary)",
};

const COPY_STYLE: CSSProperties = {
    maxWidth: 460,
    fontSize: "var(--text-sm)",
    lineHeight: 1.45,
    color: "var(--text-secondary)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function WeatherHeader({ onBack }: WeatherHeaderProps) {
    return (
        <header style={HEADER_STYLE}>
            <div style={NAV_STYLE}>
                <WeatherBackAction onBack={onBack} />
            </div>

            <div style={INTRO_STYLE}>
                <Text as="h1" type="display" style={TITLE_STYLE}>
                    Weather
                </Text>

                <Text as="p" type="meta" style={COPY_STYLE}>
                    Control atmospheric environment signals.
                </Text>
            </div>
        </header>
    );
}