// app/app/environment/main/view/header/primitives/EnvironmentHeaderOrb.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER ORB
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderOrb.tsx
   Scope: Local Environment header Kelvin orb primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderOrbProps = {
    onPress: () => void;
};

/* ------------------------------
   Styles
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    width: "clamp(36px, 9.4vw, 44px)",
    height: "clamp(36px, 9.4vw, 44px)",
    borderRadius: 999,
    border: "1.5px solid transparent",
    background: `
        linear-gradient(rgba(4, 7, 18, 0.92), rgba(4, 7, 18, 0.92)) padding-box,
        linear-gradient(135deg, #69c7ff 0%, #78a9ff 38%, #8d78ff 72%, #c7a2ff 100%) border-box
    `,
    color: "color-mix(in srgb, var(--text-primary) 95%, transparent)",
    display: "grid",
    placeItems: "center",
    padding: 0,
    boxShadow:
        "0 0 0 1px rgba(105, 199, 255, 0.14), 0 0 18px rgba(105, 199, 255, 0.22), 0 0 30px rgba(141, 120, 255, 0.18)",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
};

const LETTER_STYLE: CSSProperties = {
    fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "clamp(15px, 4vw, 18px)",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "0.01em",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderOrb({
    onPress,
}: EnvironmentHeaderOrbProps) {
    return (
        <button
            type="button"
            aria-label="Back"
            onClick={onPress}
            style={BUTTON_STYLE}
        >
            <span style={LETTER_STYLE}>K</span>
        </button>
    );
}