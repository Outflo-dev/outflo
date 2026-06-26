// app/app/environment/main/view/primitives/EnvironmentCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CARD
   File: app/app/environment/main/view/primitives/EnvironmentCard.tsx
   Scope: Own reusable Environment card surface primitive
   Last Updated:
   - ms: 1782467976867
   - iso: 2026-06-26T09:59:36.867Z
   - note: introduce reusable Environment card primitive for new theme contract
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentCardVariant = "soft" | "raised";

type EnvironmentCardProps = {
    children: ReactNode;
    variant?: EnvironmentCardVariant;
    style?: CSSProperties;
    className?: string;
    ariaLabel?: string;
};

/* ------------------------------
   Styles
-------------------------------- */
const BASE_STYLE: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    border: "1px solid var(--theme-border)",
    color: "var(--theme-text-primary)",
    isolation: "isolate",
};

const VARIANT_STYLES: Record<EnvironmentCardVariant, CSSProperties> = {
    soft: {
        background: "var(--theme-surface)",
    },
    raised: {
        background: "var(--theme-surface)",
    },
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentCard({
    children,
    variant = "soft",
    style,
    className,
    ariaLabel,
}: EnvironmentCardProps) {
    return (
        <section
            className={className}
            style={{
                ...BASE_STYLE,
                ...VARIANT_STYLES[variant],
                ...style,
            }}
            aria-label={ariaLabel}
        >
            {children}
        </section>
    );
}