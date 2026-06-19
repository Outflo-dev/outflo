"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER UTILITY ACTION
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderUtilityAction.tsx
   Scope: Local Environment header utility/menu trigger primitive
   ========================================================== */

import type { CSSProperties } from "react";

type EnvironmentHeaderUtilityActionProps = {
    onPress: () => void;
    active?: boolean;
};

const BUTTON_STYLE: CSSProperties = {
    width: "clamp(34px, 8.8vw, 42px)",
    height: "clamp(34px, 8.8vw, 42px)",
    borderRadius: 999,
    border: "1px solid color-mix(in srgb, var(--text-primary) 16%, transparent)",
    background:
        "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 42%, rgba(4,7,18,0.36) 100%)",
    color: "color-mix(in srgb, var(--text-primary) 88%, transparent)",
    display: "grid",
    placeItems: "center",
    padding: 0,
    boxShadow:
        "0 0 0 1px color-mix(in srgb, var(--text-primary) 7%, transparent), 0 0 18px rgba(255,255,255,0.08)",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
};

const ACTIVE_STYLE: CSSProperties = {
    borderColor: "color-mix(in srgb, #67f0a2 38%, var(--text-primary) 18%)",
    boxShadow:
        "0 0 0 1px rgba(103,240,162,0.14), 0 0 18px rgba(103,240,162,0.12)",
};

const SVG_STYLE: CSSProperties = {
    width: "58%",
    height: "58%",
    display: "block",
};

export default function EnvironmentHeaderUtilityAction({
    onPress,
    active = false,
}: EnvironmentHeaderUtilityActionProps) {
    return (
        <button
            type="button"
            aria-label="Open Environment menu"
            aria-pressed={active}
            onClick={onPress}
            style={active ? { ...BUTTON_STYLE, ...ACTIVE_STYLE } : BUTTON_STYLE}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={SVG_STYLE}
            >
                <path
                    d="M7.25 5.75H5.75V7.25"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.75 5.75H18.25V7.25"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.25 18.25H5.75V16.75"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.75 18.25H18.25V16.75"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 9H15"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
                <path
                    d="M8 12H16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
                <path
                    d="M10 15H14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
}