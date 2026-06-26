// app/app/environment/main/view/header/primitives/EnvironmentHeaderOrb.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER ORB
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderOrb.tsx
   Scope: Consume reusable Orb theme values inside Environment header
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: replace Environment header-private orb tokens with reusable Orb tokens
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
const KELVIN_FONT_FAMILY =
    "var(--font-kelvin), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

const BUTTON_STYLE: CSSProperties = {
    width: "clamp(36px, 9.4vw, 44px)",
    height: "clamp(36px, 9.4vw, 44px)",
    borderRadius: 999,
    border: "1.5px solid transparent",
    background: `
        linear-gradient(
            var(--orb-fill),
            var(--orb-fill)
        ) padding-box,
        linear-gradient(
            135deg,
            var(--orb-ring-1) 10%,
            var(--orb-ring-2) 20%,
            var(--orb-ring-3) 32%,
            var(--orb-ring-4) 62%,
            var(--orb-ring-5) 82%,
            var(--orb-ring-1) 100%
        ) border-box
    `,
    color: "var(--orb-mark)",
    display: "grid",
    placeItems: "center",
    padding: 0,
    boxShadow: `
        0 0 0 1px var(--orb-shadow-1),
        0 0 18px var(--orb-shadow-2),
        0 0 30px var(--orb-shadow-3),
        0 0 18px var(--orb-shadow-4)
    `,
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
};

const LETTER_STYLE: CSSProperties = {
    fontFamily: KELVIN_FONT_FAMILY,
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