// app/app/environment/main/view/header/primitives/EnvironmentHeaderUtilityAction.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER UTILITY ACTION
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderUtilityAction.tsx
   Scope: Local Environment header utility action primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderUtilityActionProps = {
    onPress?: () => void;
};

/* ------------------------------
   Styles
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    width: "clamp(24px, 6.4vw, 30px)",
    height: "clamp(24px, 6.4vw, 30px)",
    border: "none",
    background: "transparent",
    color: "color-mix(in srgb, var(--text-primary) 82%, transparent)",
    display: "grid",
    placeItems: "center",
    padding: 0,
    boxShadow: "none",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
};

const ICON_STYLE: CSSProperties = {
    width: "clamp(17px, 4.4vw, 21px)",
    height: "clamp(17px, 4.4vw, 21px)",
    display: "block",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderUtilityAction({
    onPress,
}: EnvironmentHeaderUtilityActionProps) {
    return (
        <button
            type="button"
            aria-label="Environment alerts"
            onClick={onPress}
            style={BUTTON_STYLE}
        >
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={ICON_STYLE}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M6.8 10.2C6.8 7 9 4.7 12 4.7s5.2 2.3 5.2 5.5v3.2c0 .8.28 1.55.78 2.15l.72.86c.34.4.05 1.02-.48 1.02H5.78c-.53 0-.82-.62-.48-1.02l.72-.86c.5-.6.78-1.35.78-2.15v-3.2Z" />
                <path d="M9.9 19.1c.38.74 1.12 1.2 2.1 1.2s1.72-.46 2.1-1.2" />
                <path d="M12 3.7v1" />
            </svg>
        </button>
    );
}