"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CARD
   File: app/app/environment/main/view/primitives/EnvironmentCard.tsx
   Scope: Own reusable Environment card surface primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties, ReactNode } from "react";

import { VISUAL } from "../../../../../../components/system/primitives/visuals";

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
    position: VISUAL.position[1],
    overflow: "hidden",
    isolation: "isolate",

    borderRadius: VISUAL.radius[12],

    borderWidth: VISUAL.border.width[4],
    borderStyle: VISUAL.border.style[1],
    borderColor: VISUAL.border.color[2],

    color: VISUAL.text[20],
};

const VARIANT_STYLES: Record<EnvironmentCardVariant, CSSProperties> = {
    soft: {
        background: VISUAL.fill[0],
    },

    raised: {
        background: VISUAL.fill[4],

        boxShadow: `
            ${VISUAL.shadow.x[0]}
            ${VISUAL.shadow.y[12]}
            ${VISUAL.shadow.blur[16]}
            ${VISUAL.shadow.spread[0]}
            ${VISUAL.shadow.color[4]}
        `,
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