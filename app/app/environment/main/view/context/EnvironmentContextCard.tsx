"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT CONTEXT CARD
   File: app/app/environment/main/view/context/EnvironmentContextCard.tsx
   Scope: Render current Environment context through shared card form
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import { VISUAL } from "../../../../../../components/system/primitives/visuals";

import type { EnvironmentViewModel } from "../../internal/environment.types";
import EnvironmentCard from "../primitives/EnvironmentCard";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentContextCardProps = {
    model: EnvironmentViewModel;
};

/* ------------------------------
   Styles
-------------------------------- */
const CONTEXT_CARD_STYLE: CSSProperties = {
    minHeight: 86,
    padding: `${VISUAL.spacing[10]} ${VISUAL.spacing[12]}`,
};

const CONTENT_STYLE: CSSProperties = {
    display: VISUAL.display[3],
    rowGap: VISUAL.spacing[10],
};

const EYEBROW_STYLE: CSSProperties = {
    margin: 0,
    color: VISUAL.text[10],
    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[2],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: VISUAL.type.line[2],
    letterSpacing: "0.2em",
    textTransform: VISUAL.type.transform[2],
};

const PLACE_STYLE: CSSProperties = {
    margin: 0,
    color: VISUAL.text[20],
    fontFamily: VISUAL.type.family[2],
    fontSize: "clamp(16px, 4.2vw, 20px)",
    fontWeight: VISUAL.type.weight[3],
    lineHeight: 0.98,
    letterSpacing: VISUAL.type.tracking[4],
};

const META_STYLE: CSSProperties = {
    margin: `${VISUAL.spacing[6]} 0 0`,
    display: VISUAL.display[6],
    alignItems: "center",
    width: "fit-content",
    color: "var(--environment-context-state)",
    fontFamily: VISUAL.type.family[2],
    fontSize: VISUAL.type.size[6],
    fontWeight: VISUAL.type.weight[8],
    lineHeight: VISUAL.type.line[2],
    letterSpacing: "0.15em",
    textTransform: VISUAL.type.transform[2],
};

const PRECISION_DOT_STYLE: CSSProperties = {
    width: VISUAL.spacing[6],
    height: VISUAL.spacing[6],
    flex: "0 0 auto",
    marginRight: VISUAL.spacing[8],
    borderRadius: VISUAL.radius[20],
    background: "var(--environment-context-state)",
    boxShadow: `
        ${VISUAL.glow.x[0]}
        ${VISUAL.glow.y[0]}
        ${VISUAL.glow.blur[4]}
        ${VISUAL.glow.spread[0]}
        var(--environment-context-state)
    `,
};

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentContextCard({
    model,
}: EnvironmentContextCardProps) {
    const placeLabel = model.hero.place;
    const precisionLabel = model.hasSnapshot ? "PRECISE" : "WAITING";

    const precisionToken = model.hasSnapshot
        ? VISUAL.state.good[18]
        : VISUAL.state.muted[12];

    return (
        <EnvironmentCard
            variant="raised"
            style={
                {
                    ...CONTEXT_CARD_STYLE,
                    "--environment-context-state": precisionToken,
                } as CSSProperties
            }
            ariaLabel="Current environment context"
        >
            <div style={CONTENT_STYLE}>
                <p style={EYEBROW_STYLE}>Current Context</p>

                <div>
                    <h2 style={PLACE_STYLE}>{placeLabel}</h2>

                    <p style={META_STYLE}>
                        <span style={PRECISION_DOT_STYLE} aria-hidden="true" />
                        {precisionLabel}
                    </p>
                </div>
            </div>
        </EnvironmentCard>
    );
}