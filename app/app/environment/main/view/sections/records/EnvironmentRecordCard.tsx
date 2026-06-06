// app/app/environment/main/view/sections/records/EnvironmentRecordCard.tsx
"use client";

/* ==========================================================
   OUTFLO — ENVIRONMENT RECORD CARD
   File: app/app/environment/main/view/sections/records/EnvironmentRecordCard.tsx
   Scope: Own Environment latest snapshot proof overlay
   Last Updated:
   - ms: 1780011540053
   - iso: 2026-05-28T23:39:00.053Z
   - note: soften record card into atmospheric proof overlay
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import Text from "@/components/system/primitives/display/type/Text";
import Chevron from "@/components/system/primitives/navigation/chevron/Chevron";
import type { EnvironmentRecordModel } from "../../../internal/environment.types";

/* ------------------------------
   Types
-------------------------------- */
type EnvironmentRecordCardProps = {
    model: EnvironmentRecordModel;
};

/* ------------------------------
   Icons
-------------------------------- */
function RecordIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M7 3.8h7.2L18 7.6V20a.8.8 0 0 1-.8.8H7A.8.8 0 0 1 6.2 20V4.6A.8.8 0 0 1 7 3.8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M14.2 3.8v4h3.9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M9 12h6M9 15h6M9 18h3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function EnvironmentRecordCard({
    model,
}: EnvironmentRecordCardProps) {
    const CARD_STYLE: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr) auto",
        alignItems: "center",
        gap: 9,
        padding: 9,
        borderRadius: 18,
        border: "1px solid var(--border-soft)",
        background: "var(--surface-soft)",
        boxShadow: "var(--glow-ring)",
        overflow: "hidden",
    };

    const ICON_STYLE: CSSProperties = {
        width: 34,
        height: 34,
        display: "grid",
        placeItems: "center",
        borderRadius: 12,
        color: "var(--text-secondary)",
        background: "var(--surface-muted)",
        boxShadow: "none",
        flexShrink: 0,
    };

    const COPY_STYLE: CSSProperties = {
        minWidth: 0,
        display: "grid",
        rowGap: 1,
    };

    const TEXT_CLAMP_STYLE: CSSProperties = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    const TITLE_STYLE: CSSProperties = {
        ...TEXT_CLAMP_STYLE,
        color: "var(--text-primary)",
    };

    const SUBTITLE_STYLE: CSSProperties = {
        ...TEXT_CLAMP_STYLE,
        color: "var(--text-secondary)",
    };

    const SECONDARY_STYLE: CSSProperties = {
        ...TEXT_CLAMP_STYLE,
        color: "var(--text-tertiary)",
    };

    const CHEVRON_WRAP_STYLE: CSSProperties = {
        opacity: 0.46,
    };

    return (
        <article style={CARD_STYLE}>
            <div style={ICON_STYLE}>
                <RecordIcon />
            </div>

            <div style={COPY_STYLE}>
                <Text as="h3" type="label" style={TITLE_STYLE}>
                    {model.title}
                </Text>

                <Text as="p" type="meta" style={SUBTITLE_STYLE}>
                    {model.subtitle}
                </Text>

                <Text as="p" type="meta" style={SECONDARY_STYLE}>
                    {model.primary}
                </Text>
            </div>

            <span style={CHEVRON_WRAP_STYLE}>
                <Chevron direction="right" />
            </span>
        </article>
    );
}