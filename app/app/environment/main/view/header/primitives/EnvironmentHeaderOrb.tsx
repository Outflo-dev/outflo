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
    linear-gradient(135deg,  #f2d27a 10%, #64c8ff 20%, #5f8dff 32%, #8d78ff 62%, #d09cff 82%, #f2d27a 100%) border-box
`,
    color: "color-mix(in srgb, var(--text-primary) 95%, transparent)",
    display: "grid",
    placeItems: "center",
    padding: 0,
    boxShadow:
        "0 0 0 1px rgba(100, 200, 255, 0.14), 0 0 18px rgba(100, 200, 255, 0.22), 0 0 30px rgba(141, 120, 255, 0.18), 0 0 18px rgba(242, 210, 122, 0.08)", cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
};

const LETTER_STYLE: CSSProperties = {
    fontFamily:
        '"Nunito Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "clamp(15px, 4vw, 18px)",
    fontWeight: 400,
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