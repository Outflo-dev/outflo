"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT HEADER REFRESH ACTION
   File: app/app/environment/main/view/header/primitives/EnvironmentHeaderRefreshAction.tsx
   Scope: Own Environment refresh interaction and control composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import {
    EnvironmentRefreshMark,
} from "@/components/system/primitives/marks/environment";

import { VISUAL } from "@/components/system/primitives/visuals";

import styles from "./EnvironmentHeaderRefreshAction.module.css";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentHeaderRefreshActionProps = {
    onRefresh: () => void;
    refreshing: boolean;
};

/* ------------------------------
   Styles
-------------------------------- */
const BUTTON_STYLE: CSSProperties = {
    position: VISUAL.position[1],
    display: VISUAL.display[3],
    placeItems: "center",

    width: "clamp(34px, 8.8vw, 40px)",
    height: "clamp(34px, 8.8vw, 40px)",

    margin: 0,
    padding: 0,

    borderWidth: VISUAL.border.width[3],
    borderStyle: VISUAL.border.style[1],
    borderColor: "transparent",
    borderRadius: VISUAL.radius[20],

    background: `
        linear-gradient(
            color-mix(
                in srgb,
                var(--theme-background) 88%,
                var(--theme-surface-raised)
            ),
            color-mix(
                in srgb,
                var(--theme-background) 88%,
                var(--theme-surface-raised)
            )
        ) padding-box,
        linear-gradient(
            135deg,
            var(--theme-accent),
            var(--theme-semantic-proof)
        ) border-box
    `,

    color: "var(--theme-text-primary)",

    boxShadow: `
        0 0 0 1px color-mix(
            in srgb,
            var(--theme-accent) 14%,
            transparent
        ),
        0 0 12px color-mix(
            in srgb,
            var(--theme-accent) 28%,
            transparent
        ),
        0 0 20px color-mix(
            in srgb,
            var(--theme-semantic-proof) 20%,
            transparent
        ),
        inset 0 0 10px color-mix(
            in srgb,
            var(--theme-accent) 8%,
            transparent
        )
    `,

    cursor: "pointer",
    transform: "translateY(-1px)",

    WebkitTapHighlightColor: "transparent",
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentHeaderRefreshAction({
    onRefresh,
    refreshing,
}: EnvironmentHeaderRefreshActionProps) {
    const className = [
        styles.button,
        refreshing ? styles.refreshing : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type="button"
            aria-label={
                refreshing
                    ? "Refreshing Environment"
                    : "Refresh Environment"
            }
            aria-busy={refreshing}
            disabled={refreshing}
            onClick={onRefresh}
            className={className}
            style={BUTTON_STYLE}
        >
            <span
                aria-hidden="true"
                className={styles.mark}
            >
                <EnvironmentRefreshMark
                    size="clamp(14px, 3.8vw, 17px)"
                />
            </span>
        </button>
    );
}